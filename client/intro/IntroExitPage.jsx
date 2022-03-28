import React, { Component, Fragment } from "react";
import { CustomButton } from "../components/Button";
import IntroLayout from "./IntroLayout";


import { num2stringdecimals, instructionsInfo } from "./instructionsInfo"

export default class IntroExitPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      exitPay
    } = instructionsInfo

    const {
    } = this.props;

      return (
        <IntroLayout title="Instructions" {...this.props}>
          <div>
            <p>
            Thank you for signing up to participate in our research.
            </p>

            <p>
            Unfortunately all of the spaces in our study have filled, and you have not been assigned a group. We will compensate you {exitPay} for your time.
            </p>

            <p>
            Please keep an eye out for future opportunities.
 
            </p>

          </div>
        </IntroLayout >
        );
    }
}