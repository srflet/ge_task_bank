import React from "react";
import NewLayout from "./NewLayout";


export default class IntroRound extends React.Component {
  render() {
    return (

    <div className="h-full text-base main-container">
        <>
            <NewLayout {...this.props} />
        </>
        
    </div>

    );
  }
}
