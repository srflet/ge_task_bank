import React, { Component } from "react";
import PlayerResponse from "./PlayerResponse";

export class SummaryContainer extends Component {
  render() {
    const { player, } = this.props; 
    
    return <PlayerResponse {...this.props} />;
      

  }
}

export default SummaryContainer;
