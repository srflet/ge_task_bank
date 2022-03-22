import React from "react";
import { IntroQuestion } from "./meta/IntroQuestion";
import PlayerResponse from "./meta/summary/PlayerResponse";
import { taskData } from "../../shared/tasks/default-tasks";

export default class Layout extends React.Component {
  render() {
    const { player } = this.props; //,
        // game: {
        //   treatment: { taskId },
        // } } = this.props;
    
    let taskType = ""
    let taskId = 14
    let tasks = taskData.slice();

    const task = tasks[taskId]

    return (
      <div className="h-full text-base alt-main-container">
        <IntroQuestion {...this.props} task={task} />
        <PlayerResponse {...this.props} task={task}/>
      </div>
    );
  }
}
