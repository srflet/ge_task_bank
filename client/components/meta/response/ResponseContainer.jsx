import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { getNeighborPlayers, getOtherPlayers } from "../../../../shared/helper";
import { getNeighborNames } from "../../../../shared/helper";

import { Avatar } from "../../../game/Avatar";
import AutoRotate from "./AutoRotate";
import AutoScroll from "./AutoScroll";

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
    const { player, round, game } = this.props;
    const { interactionMode } = game.treatment;

    const task = round.get("task");
    const { unit } = task.question;
    const players = getOtherPlayers(game.players, player)
    const neighbors = players.filter(p => {
      return p.get("playerGroupId")[0] === player.get("playerGroupId")[0]
    })
    console.log(neighbors)
    let answer = player.round.get("answer") ?? "N/A";
    let socialExposure = false

    return (
      <div className="response-container">
        <div className="other-responses">
          <span className="text-dark-gray font-bold text-sm mb-2">
            Other Players Detailed
          </span>

          {neighbors.map((p, i) => {
            return (
            <li className="flex justify-between text-sm" key={i}>
            <Avatar socialExposure={socialExposure} player={p} />
            </li>
          );
         })}
        </div>
      </div>
    );
  }
}

export default ResponseContainer;
