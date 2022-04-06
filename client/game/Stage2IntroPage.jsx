import React from "react";

export default class Stage2IntroPage extends React.Component{
    render() {
        const { player, onNext } = this.props;
        const queryParams = new URLSearchParams(window.location.search);
        const playerGroupId = queryParams.get("playerGroupId");
        const playerMID = queryParams.get("MID");
        const firstAnswer = parseInt(queryParams.get("playerAnswer"));
        player.set("playerGroupId", [playerGroupId]);
        player.set("MID", playerMID);
        player.set("firstAnswer", firstAnswer);
        onNext();
        return null
    }
}