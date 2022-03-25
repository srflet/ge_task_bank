import React from "react";
import { IntroQuestion } from "./meta/IntroQuestion";
import PlayerResponse from "./meta/summary/PlayerResponse";
import { taskData } from "../../shared/tasks/default-tasks";
import CountdownTimer from "./wait-timer/components/CountdownTimer";
import calcTimeRemaining from "./wait-timer/components/timeHelpers";
import moment from "moment";
import { TimeSync } from "meteor/mizzao:timesync";
import { PlayerEstimates } from "../../shared/api/PlayerEstimates";

export default class Layout extends React.Component {
  countDownOne = () => {
    const newTime = this.state.remainingTime - 1;


    this.setState({
        remainingTime: newTime,
    });

    this.countdownTimeout = setTimeout(() => {
        this.countDownOne();
    }, 1000);
  }

  componentDidUpdate() {
    const { player , onNext} = this.props
      if (this.state.remainingTime == 0) {
          console.log('timesUp')
          Tracker.autorun(function(){
            Meteor.subscribe("group-management", function(){
              Meteor.call('insertTask', {
                playerId: player.id,
                estimate: player.get("answer")
              });
            });
          });
          onNext()
      }
    }

  componentDidMount() {
    this.countdownTimeout = setTimeout(() => {
        this.countDownOne();
    }, 1000);
  }

  componentWillUnmount() {
      clearTimeout(this.countdownTimeout);
    }

  constructor(props) {
      super(props)

      this.state = {
          remainingTime: 60,
      }
  }
  
  
  
  render() {
    const { player } = this.props; //,
        // game: {
        //   treatment: { taskId },
        // } } = this.props;
    
    let taskType = "";
    let taskId = 14;
    let tasks = taskData.slice();
    const task = tasks[taskId];

    

    return (
      <>
        <div className="game-start-timer">
            Time left: {this.state.remainingTime}
        </div>
        <div className="h-full text-base alt-main-container">
          <IntroQuestion {...this.props} task={task} />
          <PlayerResponse {...this.props} task={task}/>
        </div>
      </>
    );
  }
}
