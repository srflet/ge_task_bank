import React, { Component } from 'react'

// Import the config from the db
import { withTracker } from "meteor/react-meteor-data"

import { Configs } from '../../../shared/api/collectionGroupsManagement';


// Import components
import CountdownTimer from '../wait-timer/components/CountdownTimer';
import { IntroQuestion } from '../meta/IntroQuestion';

import { taskData } from '../../../shared/tasks/default-tasks';


// Handles all the timing stuff
import { TimeSync } from "meteor/mizzao:timesync";
import calcTimeRemaining from '../wait-timer/components/timeHelpers';
import moment from "moment";
import MetaContainer from "./MetaContainer";

export default class NewLayout extends React.Component {
  render() {
    const { onNext, player, game } = this.props;


    return (
      <NewLayoutContentContainer onNext={onNext} player={player} /> 
    )
}
}

class NewLayoutContent extends React.Component {
  constructor(props) {
      super(props)

      const { loading, onNext, player, now, timeToStart, bufferTime } = props

      // calc some vars before setting state		
      var timeoutState = undefined;


      // set timeout state if its ready
      if (!loading) {
          timeoutState = calcTimeRemaining(timeToStart, now, bufferTime) <= 0;
      }

      this.state = {
          timeout: timeoutState,
      }

      const { timeout } = this.state

      // NOW HANDLE SOME RE-ROUTING IF NECESSARY

      // if game is timed out and player is ready, move on
      if (timeout && player.get("answer") !== undefined) {
  
          onNext();
      }

      // if the db is ready there is no timeToStart config, move on
      if (!loading && timeToStart === undefined) {
          onNext();
      }
  }

  static getDerivedStateFromProps(props, current_state) {

      const { now, timeToStart, bufferTime } = props;
      if (timeToStart) {
          const timeoutState = calcTimeRemaining(timeToStart, now, bufferTime) <= 0;

          return ({
              timeout: timeoutState,
          });

      }
      return null
  }

  componentDidUpdate() {
      const { loading, player, onNext, timeToStart, bufferTime } = this.props
      const { timeout } = this.state


      // if the db is ready and there is no timeToStart config, move on
      if (!loading && timeToStart === undefined) {

          onNext();
      }

      // if game is counted down...
      if (timeout && player.get("answer") !== undefined) {

          onNext();
      }

      // save  player buffer time if available
      // if (bufferTime) {
      //     if (!player.get("bufferTime")) {
      //         player.set("bufferTime", bufferTime)
      //     }
      // }
  }

  renderLoading() {
      return (<center>Loading...</center>);
  }


  renderEstimatePage = () => {
      const { now, timeToStart, bufferTime, loginRefresh, prolificCode, player } = this.props
      const { timeout, playerReady } = this.state

      let taskType = "";
      let taskId = 14;
      let tasks = taskData.slice();
      const task = tasks[taskId];

      const no_answer = (timeout && player.get("answer") === undefined)

      //TODO: include after testing
      // if (no_answer) {
      //     player.exit("noAnswer")
      // }

      return (
          <>
              <div className="h-16 grid grid-cols-3 items-center px-6">
                  Time to answer: <CountdownTimer timeToStart={calcTimeRemaining(timeToStart, now, bufferTime)} handleTimeOut={this.handleTimeOut} />
              </div>

              <div className="h-full text-base alt-main-container">
                  <IntroQuestion {...this.props} task={task} />
                  <MetaContainer {...this.props} task={task}/>
              </div>
            </>
      )

  }

  render() {
      const { loading, timeToStart, prolificCode} = this.props;
      const { timeout, playerReady } = this.state


      return (
              <div>
                  {loading ? this.renderLoading() : this.renderEstimatePage()}
              </div>
      );
  }
}


NewLayoutContentContainer = withTracker(rest => {

    // Get the props
    const { player, onNext } = rest
    

    // Suscribe to collection information, and return nothing as long as it is loading
    const loading = !Meteor.subscribe("group-management").ready();
    if (loading) {
        return {
            loading
        }
    }

    // Get the time it is now (only refresh every second)
    const now = moment(TimeSync.serverTime(null, 1000));

    // Get the globalConfigs collection
    const globalConfigs = Configs.find({}).fetch();

    const timeToStart = globalConfigs[0].time.timeToStart;
    
    
    // const timeToStart = "06:45"
    const bufferTime = 65;
    const loginRefresh = globalConfigs.loginRefresh ?? 30;
    const prolificCode = globalConfigs.prolificCode;

    return {
        now,
        loading,
        timeToStart, bufferTime, loginRefresh, prolificCode,
        globalConfigs,
        ...rest
    };

})(NewLayoutContent);

