import React, { Component } from "react";
import NumberFormat from "react-number-format";

import { Avatar } from "../../../game/Avatar";

import { getUnit } from '../../../../shared/unit';

export const Answer = ({ answer }) => (
  <NumberFormat
    thousandSeparator={true}
    isNumericString
    className="text-dark-gray break-all"
    placeholder="_"
    autoFocus
    name="answer"
    displayType="text"
    value={answer}
  />
);

export class ResponseContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldScroll: true,
      bottomDirection: true,
    };
  }

  render() {
    const { player, game } = this.props;
    const { interactionMode } = game.treatment;

    const task = player.get("task");
    const { unit } = task.question;
    let answer = player.get("answer") ?? "N/A";

    return (
      <div className="response-container">
        <div className="player-response">
          <span className="text-dark-gray font-bold text-sm">
            Your response
          </span>
          <div className="pt-2 pb-2 flex justify-between text-sm">
            <Avatar iconOnly player={player} />

            <span>
              <Answer answer={answer} /> {getUnit({ answer, unit })}
            </span>
          </div>
          {interactionMode === "continuous" && !player.stage.get("hasUpdatedOnce") && (
            <span className="text-medium-gray text-sm leading-none">
              Update your reponse on the lower right of the page.
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default ResponseContainer;
