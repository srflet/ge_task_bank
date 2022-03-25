import React from "react";
import { IntroQuestion } from "./meta/IntroQuestion";
import PlayerResponse from "./meta/summary/PlayerResponse";
import { taskData } from "../../shared/tasks/default-tasks";
import { withTracker } from "meteor/react-meteor-data";


export default class LayoutWithDB extends Component {
    render() {

        return (
            <div>
                {/* Load the db data which loads the page contents */}
                <LayoutPageContents {...this.props} />
            </div>
        )
    }
}

class LayoutPageContents extends Component {

    render() {
        const { loading, player } = this.props

        if (loading) {
            return (
                <div>Loading...</div>
            )
        }
    
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

WaitingConsentPageContents = withTracker(rest => {

    // Suscribe to collection information, and return nothing as long as it is loading
    const loading = !Meteor.subscribe("group-management").ready()
    if (loading) {
        return {
            loading
        }
    }

    // Get the globalConfigs collection
    const globalConfigs = Configs.find({}).fetch()[0] ?? {}
    const timeToStart = new Date(globalConfigs.timeToStart)

    // Get time now (makes sur the whole process is synced)
    const now = new Date(TimeSync.serverTime(null, 1000))

    return {
        loading,
        timeToStart,
        now,
    };

})(WaitingConsentPage)


export default class LayoutWithDB extends React.Component {
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
