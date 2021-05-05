import React from "react";
import NumberFormat from "react-number-format";
// import { applyMagnitude } from "../../shared/conversions";
import Button from "../Button";
import NumberToWords from "./NumberToWords";
import Unit from "./Unit";

export default class ResponseInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer:
        props.player.stage.get("tmpanswer") ??
        props.player.round.get("answer") ??
        "",
      focused: false,
      disableUpdate: false,
    };
  }

  componentDidMount() {
    const {
      stage,
      game: {
        treatment: { interactionMode },
      },
      isAltLayout = false,
    } = this.props;

    if (
      isAltLayout &&
      interactionMode === "continuous" &&
      stage.name === "social"
    ) {
      this.setState({ disableUpdate: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.answer !== this.state.answer) {
      const {
        stage,
        game: {
          treatment: { interactionMode },
        },
        isAltLayout = false,
      } = this.props;
      if (
        isAltLayout &&
        interactionMode === "continuous" &&
        stage.name === "social"
      ) {
        this.setState({ disableUpdate: false });
      }
    }
  }

  handleChangeValue = (change) => {
    const { player } = this.props;
    player.stage.set("tmpanswer", change.value);
    this.setState({ answer: change.value, err: "" });
  };

  handleFocus = (event) => {
    this.setState({ focused: true });
  };

  handleBlur = (event) => {
    this.setState({ focused: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      player,
      stage,
      game: {
        treatment: { interactionMode },
      },
      isAltLayout = false,
    } = this.props;

    if (!(interactionMode === "discreet" && stage.name === "social")) {
      const { answer } = this.state;

      if (answer === "") {
        return;
      }

      // If answered as int, save int, otherwise save float

      const f = parseFloat(answer);
      const i = parseInt(answer, 10);

      let a = f;
      if (f === i) {
        a = i;
      }

      player.stage.set("answer", a);
      player.round.set("answer", a);
    }

    // Will not submit the stage if it's new layout and on social
    if (
      isAltLayout &&
      interactionMode === "continuous" &&
      stage.name === "social"
    ) {
      this.setState({ disableUpdate: true });
      return;
    }

    player.stage.submit();
  };

  getButtonText = () => {

    // Get the props
    const { player, stage, game: {
      treatment: { playerCount, interactionMode },
    } } = this.props

    // If they have submitted
    if (player.stage.submitted) {

      // If it is a discreet social stage
      if (interactionMode === "discreet" && stage.name === "social") {
        return ("Waiting for the other players...")
      }

      // Otherwise say that it is submitted, and waiting for others if there are others
      return (playerCount === 0 ? "Submitted..." : "Submitted... waiting for the other players")

    }

    // If they haven't submitted...

    // If it is a discreet social stage
    if (interactionMode === "discreet" && stage.name === "social") {
      return ("OK")
    }

    // If the player has submitted an answer previously this round
    if (player.round.get("answer")) {
      return ("Update")
    }

    // Otherwise...
    return ("Submit")
  }

  render() {
    const {
      round,
      player,
      stage,
      game: {
        treatment: { interactionMode },
      },
      isAltLayout = false,
    } = this.props;
    const { answer, focused, disableUpdate } = this.state;
    const task = round.get("task");

    const minmax = {};
    if (task.question.min !== undefined) {
      minmax.min = task.question.min;
    }
    if (task.question.max !== undefined) {
      minmax.max = task.question.max;
    }

    const disabledForm =
      player.stage.submitted ||
      (interactionMode !== "continuous" && stage.name === "social");

    if (isAltLayout) {
      return (
        <form action="#" onSubmit={this.handleSubmit} className="">
          <NumberFormat
            thousandSeparator={true}
            isNumericString
            className="alt-input w-full px-0 m-0 py-2 text-sm disabled:text-gray-700 disabled:border-gray-50 text-dark-gray focus:ring-0 focus:outline-none focus:border-b-2 focus:border-gray-500 leading-snug tabular-nums disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Type your answer here..."
            autoFocus
            name="answer"
            value={answer}
            onValueChange={this.handleChangeValue}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            autoComplete="off"
            disabled={disabledForm}
            {...minmax}
          />
          <NumberToWords
            isAltLayout
            answer={answer}
            task={task}
            {...this.props}
          />

          <div className="mt-5">
            <button
              type="submit"
              className="w-full alt-submit-btn text-white rounded text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={
                player.stage.submitted ||
                answer < minmax.min ||
                answer > minmax.max ||
                disableUpdate
              }
            >
              {this.getButtonText()}
            </button>
          </div>
        </form>
      );
    }

    return (
      <form action="#" onSubmit={this.handleSubmit} className="relative w-full">
        <div className="flex relative">
          <NumberFormat
            thousandSeparator={true}
            isNumericString
            className="w-full px-0 m-0 py-2 lg:text-xl xl:text-2xl text-md disabled:text-gray-700 focus:text-gray-900 disabled:border-gray-50 text-gray-700 bg-transparent placeholder-gray-400 border-0 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-b-2 focus:border-gray-500 leading-snug tabular-nums"
            placeholder="Type your answer here..."
            autoFocus
            name="answer"
            // type="number"
            value={answer}
            // onChange={this.handleChange}
            onValueChange={this.handleChangeValue}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            autoComplete="off"
            disabled={disabledForm}
            {...minmax}
          />
          <Unit
            input
            magnitude
            focused={focused}
            answer={answer}
            preventPluralize={task.question.preventPluralize}
            {...this.props}
          />
          <NumberToWords answer={answer} task={task} {...this.props} />
        </div>

        {answer === "" &&
          !(interactionMode === "discreet" && stage.name === "social") ? (
          ""
        ) : (
          <>
            <div className="mt-12">
              <Button
                tick
                text={
                  player.stage.submitted
                    ? interactionMode === "discreet" && stage.name === "social"
                      ? "Waiting for the other players..."
                      : "Submitted"
                    : interactionMode === "discreet" && stage.name === "social"
                      ? "OK"
                      : "Submit"
                }
                done={player.stage.submitted}
                disabled={
                  player.stage.submitted ||
                  answer < minmax.min ||
                  answer > minmax.max
                }
              />
            </div>
          </>
        )}
      </form>
    );
  }
}
