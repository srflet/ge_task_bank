import React from "react";
import { getUnit } from "../../../shared/unit";

export default class UnitSimple extends React.Component {
  render() {
    const { magnitude, round, answer, preventPluralize, player, task } = this.props;
    const unit = getUnit({ round, player, answer, magnitude, preventPluralize, task });

    return unit;
  }
}
