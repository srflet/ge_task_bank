import React, { Component } from "react";
import ChatContainer from "../chat/ChatContainer";
import ResponseContainer from "./response/ResponseContainer";
import SummaryContainer from "./summary/SummaryContainer";

export class MetaContainer extends Component {
  render() {
    const {
      stage,
      game: { treatment },
    } = this.props;
    const { chat = false } = treatment;
    const isResponseStage = stage.name === "response";

    const showChat = chat && stage.name === "social";
    const showSocial = treatment.hideSocialNumeric

    return (
      <div
        className={`meta-container ${showChat ? "with-chat" : "without-chat"} ${isResponseStage ? "response-stage" : ""}`}
      >
        {!isResponseStage && (
          <>
            <ResponseContainer {...this.props} />
            {showChat ? (
              <ChatContainer {...this.props} isAltLayout />
            ) : (
              <div></div>
            )}
          </>
        )}
        {showChat ?
          <div></div>
        : (
          <SummaryContainer {...this.props} isResponseStage={isResponseStage} /> 
        )
        }
      </div>
    );
  }
} 

export default MetaContainer;
