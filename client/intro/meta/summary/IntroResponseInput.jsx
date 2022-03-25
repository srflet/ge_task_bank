import React from "react";
import NumberFormat from "react-number-format";
// import { applyMagnitude } from "../../shared/conversions";
import NumberToWords from "../../../components/round/NumberToWords";
import { PlayerEstimates } from "../../../../shared/api/PlayerEstimates";
import { Configs } from "../../../../shared/api/collectionGroupsManagement";

import { TimeSync } from "meteor/mizzao:timesync";

export default class IntroResponseInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer:
        props.player.get("tmpanswer") ??
        props.player.get("answer") ??
        "",
      focused: false,
      disableUpdate: props.player.get("answer") !== undefined,
    };
  }

  handleChangeValue = (change) => {
    const { player } = this.props;
    player.set("tmpanswer", change.value);
    this.setState({ answer: change.value, err: "" });
  };

  handleFocus = (event) => {
    this.setState({ focused: true });
  };

  handleBlur = (event) => {
    this.setState({ focused: false });
  };

  formatAnswer = answer => {
    // If answered as int, save int, otherwise save float
    const f = parseFloat(answer);
    const i = parseInt(answer, 10);

    if (f === i) {
      return i;
    }

    return f
  }


  handleSubmit = (event) => {
    event.preventDefault();

    const {
      player,
      isAltLayout = false,
      onNext
    } = this.props;

    const { answer } = this.state;

    if (answer === "") {
      return;
    }
    const a = this.formatAnswer(answer)
    const id = player.get("id")
    player.set("answer", a);

    Tracker.autorun(function(){
      Meteor.subscribe("player-estimates", function(){
        Meteor.call('insertTask', {
          playerId: player.id,
          estimate: player.get("answer")
        });
        console.log(PlayerEstimates.find({}).fetch())
      });
    });

    this.setState({ disableUpdate: true });

    
    return;

  };

  render() {
    const {
      player,
      isAltLayout = false,
      task
    } = this.props;
    const { answer, focused, disableUpdate } = this.state;


    const minmax = {};
    if (task.question.min !== undefined) {
      minmax.min = task.question.min;
    }
    if (task.question.max !== undefined) {
      minmax.max = task.question.max;
    }

 
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
              answer < minmax.min ||
              answer > minmax.max ||
              disableUpdate
            }
          >
            Submit
          </button>
        </div>

        {
        this.state.disableUpdate &&
        <div>
        <p>
          Waiting for other players to submit their answer
        </p>
        </div>
        }
      </form>

      );
    }
}
