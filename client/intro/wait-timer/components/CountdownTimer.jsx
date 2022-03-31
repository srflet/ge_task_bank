import React from "react";

export default class CountdownTimer extends React.Component {

    renderTimerDisplay(time_to_start) {


        // convert to hours, minutes, seconds
        var hours = parseInt((time_to_start / 3600), 10)
        var minutes = parseInt((time_to_start / 60) % 60, 10)
        var seconds = parseInt((time_to_start % 60), 10);

        // add a leading zero for seconds less than 10
        if (seconds < 0) { seconds = 0 }
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (minutes < 0) { minutes = 0 }

        var timeDisplay = minutes + ":" + seconds;
        if (hours > 0) { timeDisplay = hours + ":" + timeDisplay }

        return (timeDisplay);
    }


    render() {
        const { timeToStart } = this.props;
        const classes = ["flex flex-col items-center justify-center"];
        let labelClassName = "text-xs font-bold text-dark-grey";
        let timerClassName = "text-18 font-bold text-dark-grey";
  
        return (
            <div className={classes.join(" ")}>
            <div className={labelClassName}>Timer</div>
            <span className={timerClassName}>
            { this.renderTimerDisplay(timeToStart)}
            </span>
            </div>
        )
    }
}