import React from "react";
import { PlayerEstimates } from "../../shared/api/PlayerEstimates";
import { findSet, makeArray } from "./partitioner/partitionHelpers";

export default class RedirectPage extends React.Component {


    countDownOne = () => {


        const newTime = this.state.remainingTime - 1;


        this.setState({
            remainingTime: newTime,
        });

        if(this.state.remainingTime == 0) {
            console.log("ZERO")
            clearTimeout(this.countdownTimeout);
            return;
        }

        this.countdownTimeout = setTimeout(() => {
            this.countDownOne();
        }, 1000);
    }

    componentDidUpdate () {
        const { player } = this.props;
        //console.log(this.state.remainingTime)
        if (this.state.remainingTime == 0) {
            console.log("out of time")
            let estimateObj = "hello"
            const sub = Meteor.subscribe("player-estimates");
            Tracker.autorun(() => {
                if (sub.ready) {
                    console.log("INSIDE THE TRACKER")
                    estimateObj = PlayerEstimates.find({}).fetch()
                    console.log(estimateObj)
                    if (estimateObj.length === 0){
                        let estObjSlice = estimateObj.slice(1).slice(-120)
                        console.log(estObjSlice)
        
                        const groupSize = 20;
                        const starts = makeArray(estObjSlice.length / (2 * groupSize), (i) => {
                        return (i * groupSize)
                        });
                        
                        starts.map(i => findSet(estObjSlice, i))
                        console.log(starts)
        
                        console.log(estObjSlice)
                    }
                }

 

            //     // const playerGroup = estObjSlice.find(est => est.playerId === player.id).groupId 
            //     // console.log(playerGroup)
            //     // const url = new URL(window.location.href);
            //     // console.log(window.location);
            //     // console.log(url)

            //     // const queryParams = new URLSearchParams(window.location.search);
                
                
            //     // const playerIdKey = queryParams.get('playerIdKey');
            //     // const playerAnswer = player.get("answer");
            //     // const playerGroup = 25;
            //     // const baseUrl = location.origin
            //     // console.log(playerIdKey, playerAnswer, playerGroup)

            //     // window.location.replace(baseUrl + '/?playerIdKey=whekgbwhkrgbkhw');

            //     clearTimeout(this.countdownTimeout);
            });

            
        };
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
            remainingTime: 5,
        }
    }


    render() {

        const disabled = this.props.disabled == undefined ? false : this.props.disabled
        return (
            <>
                <p>
                    Time remaining (for internal use only) {this.state.remainingTime}
                </p>
                <div>
                    <p><strong>Please wait while we assign you to a group....</strong></p>
                    <p><i>This will take less than 30 seconds!</i></p>
                </div>
            </>
        )
    }
}