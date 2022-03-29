import React from "react";

export default class Stage2IntroPage extends React.Component{
    render() {
        const { player, onNext } = this.props;
        const queryParams = new URLSearchParams(window.location.search);
        const playerGroupId = queryParams.get("playerGroupId");
        player.set("playerGroupId", [playerGroupId])
        onNext();
        return null
    }
}