import React, { Component } from "react";
import PlayerResponse from "./PlayerResponse";

export class SummaryContainer extends Component {
  renderAnswer() {
      const { task } = this.props;
        return <PlayerResponse task={task} {...this.props}/>;
  }
  render() {
    return (
      <div className="summary-container">
        {this.renderAnswer()}
      </div>
    );
  }
}

export default SummaryContainer;
