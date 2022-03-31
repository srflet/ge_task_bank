import React, { Component } from "react";
import PlayerResponse from "./PlayerResponse";

export class SummaryContainer extends Component {
  renderAnswer() {
      const { task } = this.props;
        return <PlayerResponse task={task} {...this.props}/>;
  }
  render() {
    return (
      <div className="h-full content-center px-2 py-3 bg-grey w-1/2">
        {this.renderAnswer()}
      </div>
    );
  }
}

export default SummaryContainer;
