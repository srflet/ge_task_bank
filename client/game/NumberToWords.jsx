import numberToWords from "number-to-words";
import React from "react";
import Unit from "./Unit";

export default class NumberToWords extends React.Component {
  render() {
    const { answer, task } = this.props;

    if (!answer || parseInt(answer, 10) < 1000) {
      return "";
    }

    let val = parseInt(answer, 10);
    if (task.question.magnitude) {
      val = applyMagnitude(val, task.question.magnitude);
    }

    let res;
    try {
      res = numberToWords.toWords(val);
    } catch (err) {
      console.error(err);
    }

    if (!res) {
      return null;
    }

    res = res.charAt(0).toUpperCase() + res.slice(1);

    return (
      <div className="absolute bottom-0">
        <div className="absolute">
          <div className="mt-1 flex whitespace-nowrap w-full py-2 text-gray-400 leading-none tabular-nums">
            <div className="">{res}</div>
            <div className="ml-1">
              <Unit answer={answer} {...this.props} />
            </div>
            {/* <div className="ml-1">total</div> */}
          </div>
        </div>
      </div>
    );
  }
}
