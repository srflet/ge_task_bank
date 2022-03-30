import React from "react";
import NewLayout from "./NewLayout";
import { Provider } from "../../context";


export default class IntroRound extends React.Component {
  render() {
    return (
        <Provider triggerModal={false}>
            <NewLayout {...this.props} />
        </Provider>

    );
  }
}
