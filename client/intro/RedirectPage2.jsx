import React, { Component } from 'react'

// Import the config from the db
import { withTracker } from "meteor/react-meteor-data"
import { Configs } from '../../shared/api/collectionGroupsManagement'
import { PlayerEstimates } from '../../shared/api/PlayerEstimates';
import { findSet, makeArray } from './partitioner/partitionHelpers';
import { cyrb53 } from '../../shared/helperFunctions/hashing';


// Import components
import IntroLayout from './IntroLayout';
import CountdownTimer from './wait-timer/components/CountdownTimer';
import { IntroQuestion } from './meta/IntroQuestion';
import PlayerResponse from './meta/summary/PlayerResponse';

import { taskData } from '../../shared/tasks/default-tasks';

// Handles all the timing stuff
import { TimeSync } from "meteor/mizzao:timesync";
import calcTimeRemaining from './wait-timer/components/timeHelpers';
import moment from "moment";


// Prepare the Estimate page
export default class RedirectPage2 extends Component {
    render() {
        const { onNext, player, game } = this.props;


        return (
            <IntroLayout title="" {...this.props}>
                {/* Load the db data which loads the page contents */}
                <RedirectPageContentContainer onNext={onNext} player={player} />
            </IntroLayout>
        )
    }
}

class RedirectPageContents extends React.Component {
    constructor(props) {
        super(props);

        this.state = { time: {}, seconds: 2 };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
      }
    
      secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
      }
    
      componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        this.startTimer();
      }
    
      startTimer() {
          this.timer = setInterval(this.countDown, 1000);
      }
    
      countDown(){
          const { estimates, player, onNext } = this.props
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
        });
        
        // Check if we're at zero.
        if (seconds === 0) { 
            clearInterval(this.timer);
            console.log(estimates.length)

            const groupSize = 20; // TODO: make group size flexible - generation of big/small arrays in partitionHelper.js need to handle 1:3 ratio. 

            let estObjSlice = estimates.slice(0)
            console.log(estObjSlice)
            const totalN = estObjSlice.length
            const extraN = estObjSlice.length % (2 * groupSize)
            console.log(totalN - extraN)
            console.log(estObjSlice.slice(0, totalN - extraN))

            const est = estObjSlice.slice(0).sort((a, b) => a.estimate > b.estimate ? 1 : -1)
            const useEst = est.slice(0, totalN - extraN)
            const rejectEst = est.slice(1).slice(-extraN)
            
            console.log(rejectEst)
            console.log(player.id)
            console.log(rejectEst.filter(est => est.playerId === player.id))

            if (rejectEst.filter(est => est.playerId === player.id).length > 0) {
                console.log("you have been rejected")
                // player.exit("rejectEstimate")
                return
            }

            
            const starts = makeArray(useEst.length / (2 * groupSize), (i) => {
            return (i * groupSize)
            });

            starts.map(i => findSet(useEst, i))


            console.log(useEst)

  
            const playerGroupId = useEst.filter(est => est.playerId === player.id)[0].groupId
            console.log("My group id: " + playerGroupId)

            const queryParams = new URLSearchParams(window.location.search);
            const playerIdKey = queryParams.get('playerIdKey');
            const MID =  queryParams.get('MID');
            const username =  player.get("username")
            const serverId = playerGroupId.slice(1).slice(-2)
            console.log(serverId)
            const startUrl = "https://chatroom_server";
            const endUrl = ".meteorapp.com";
            const newUrl = `${startUrl}${serverId}${endUrl}/?playerIdKey=${playerIdKey}&MID=${MID}&playerId=${username}&playerGroupId=${cyrb53(playerGroupId)}`
            console.log(newUrl)
            
            window.location.replace(newUrl)
        }


      }

    renderLoading() {
        return (<center>Loading...</center>);
    }


    renderRedirectPage = () => {
        return (
          <div>
              <p>
                  Please wait while we assign you a group. This may take up to 30 seconds....
              </p>

              <div className="loader"></div>
          </div>

        )

    }
    
    render() {
        const { loading } = this.props
        return (
            <div className="bp3-non-ideal-state">
                <div className="bp3-non-ideal-state-description">
                    {loading ? this.renderLoading() : this.renderRedirectPage()}
                    {/* {loading ? this.renderEstimatePage() : this.renderLoading()} */}
                </div>

            </div>

        );
    }
};




RedirectPageContentContainer = withTracker(rest => {

    // Get the props
    const { player, onNext } = rest
    

    // Suscribe to collection information, and return nothing as long as it is loading
    const loading = !Meteor.subscribe("player-estimates").ready();
    if (loading) {
        return {
            loading
        }
    }

    // Get the globalConfigs collection
    const estimates = PlayerEstimates.find({}).fetch();
    
    
    // const timeToStart = "06:45"
    // const bufferTime = 65;
    // const loginRefresh = globalConfigs.loginRefresh ?? 30;
    // const prolificCode = globalConfigs.prolificCode;

    return {
        loading,
        estimates,
        ...rest
    };

})(RedirectPageContents);

