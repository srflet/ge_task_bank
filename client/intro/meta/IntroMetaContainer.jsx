import React, { Component } from "react";

import ResponseContainer from "./response/ResponseContainer";
import SummaryContainer from "./summary/SummaryContainer";

export class IntroMetaContainer extends Component {
  render() {
    const {
      game: { treatment },
    } = this.props;

    return (
      <div
        className="meta-container without-chat"
      >
        <SummaryContainer {...this.props}/>
      </div>
    );
  }
}

export default IntroMetaContainer;
