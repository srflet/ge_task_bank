import React, { Component } from "react";
import { applyMagnitude } from "../../../../shared/conversions";
import { getMinMaxErrorMessage } from "../../../../shared/helper";
import IntroResponseInput from "./IntroResponseInput";


export class PlayerResponse extends Component {
  renderError() {
    const { player, task } = this.props;
    

    if (task.question.min === undefined && task.question.max === undefined) {
      return null;
    }

    let answer = player.get("tmpanswer");
    if (task.question.magnitude) {
      answer = applyMagnitude(answer, task.question.magnitude);
    }

    const err = getMinMaxErrorMessage(answer, task);
    if (!err) {
      return null;
    }

    return (
      <div className="w-full mt-2 font-semibold text-sm mb-1 text-red-500">
        <div>{err}</div>
      </div>
    );
  }
  render() {
    const { task } = this.props
    return (
      <div className="player-response">
        {this.renderError()}
        <IntroResponseInput {...this.props} isAltLayout task={task}/>
      </div>
    );
  }
}

export default PlayerResponse;
