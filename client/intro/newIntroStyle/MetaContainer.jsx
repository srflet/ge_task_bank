import React, { Component } from "react";
import SummaryContainer from "./SummaryContainer";

export class MetaContainer extends Component {
  render() {
      const { task } = this.props;
    return (
      <div className="h-full bg-grey flex flex-col justify-center items-center">
        <SummaryContainer task={task} {...this.props} />
      </div>
    );
  }
}

export default MetaContainer;