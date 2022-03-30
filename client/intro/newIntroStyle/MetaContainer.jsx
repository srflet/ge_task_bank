import React, { Component } from "react";
import SummaryContainer from "./SummaryContainer";

export class MetaContainer extends Component {
  render() {
      const { task } = this.props;
    return (
      <div className="meta-container without-chat response-stage">
        <SummaryContainer task={task} {...this.props} />
      </div>
    );
  }
}

export default MetaContainer;