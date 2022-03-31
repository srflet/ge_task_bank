import Empirica from "meteor/empirica:core";
import React, { Component } from 'react'
import { render } from "react-dom";
import Waiting from "./components/Waiting";
import ExitSurvey from "./exit/ExitSurvey";
import Sorry from "./exit/Sorry";
import Thanks from "./exit/Thanks";
import Round from "./game/Round";
import Consent from "./intro/Consent";
import DemoStage from "./intro/DemoStage";
import Instructions from "./intro/Instructions";
import NewPlayerForm from "./intro/NewPlayerForm";
import Quiz from "./intro/Quiz";
import Username from "./intro/Username"
import AttentionCheck from "./intro/AttentionCheck"
import WaitingPage from "./intro/wait-timer/WaitingPage";
import EstimatePage from "./intro/EstimatePage";
import EstimatePageBackup from "./intro/estimate_backup";
import Layout from "./intro/Layout";
import RedirectPage from "./intro/RedirectPage";
import RedirectPage2 from "./intro/RedirectPage2";
import IntroExitPage from "./intro/IntroExitPage";
import Stage2IntroPage from "./game/Stage2IntroPage";
import IntroLayout from "./intro/IntroLayout";
import IntroRound from "./intro/newIntroStyle/IntroRound";

import WaitingConsent from "./intro/wait-timer/WaitingConsent";
import WaitingThankYou from "./exit/WaitingThankYou";

const isDev = false

if (!isDev) {

  // Set the Consent Component you want to present players (optional).
  //Empirica.consent(WaitingConsent);

  // Introduction pages to show before they play the game (optional).
  // At this point they have been assigned a treatment. You can return
  // different instruction steps depending on the assigned treatment.
  Empirica.introSteps((game, treatment) => {
    if (treatment.stage === "first") {
      const introSteps = [Username]
    // if (treatment.playerCount > 1) {
    //   introSteps.push(Username)
    // }
    //introSteps.push(WaitingPage)
    introSteps.push(IntroRound)
    introSteps.push(RedirectPage2)
    // introSteps.push(RedirectPage2)
    // introSteps.push(IntroExitPage)
    

    return introSteps
    }

    return [Stage2IntroPage]

  })

}

const Lobby = ({ player, gameLobby }) => (

        <div>
          <IntroLayout title="">
          <p>
              Please wait while we assign you a group. This may take up to 30 seconds....
          </p>

          <div className="loader"></div>
          </IntroLayout>
        </div>

);
Empirica.lobby(Lobby);

// Set the About Component you want to use for the About dialog (optional).
// Empirica.about(About);

Empirica.newPlayer(NewPlayerForm);
Empirica.waiting(Waiting);

// Remove header
Empirica.header(() => null);
// Remove breadcrumb
Empirica.breadcrumb(() => null);

// The Round component containing the game UI logic.
// This is where you will be doing the most development.
// See client/game/Round.jsx to learn more.
Empirica.round(Round);

// End of Game pages. These may vary depending on player or game information.
// For example we can show the score of the user, or we can show them a
// different message if they actually could not participate the game (timed
// out), etc.
// The last step will be the last page shown to user and will be shown to the
// user if they come back to the website.
// If you don't return anything, or do not define this function, a default
// exit screen will be shown.
Empirica.exitSteps((game, player) => {
  if (
    !game ||
    (player.exitStatus &&
      player.exitStatus !== "finished" &&
      player.exitReason !== "playerQuit")
  ) {
    return [Sorry];
  }
  return [ExitSurvey, Thanks];
});

// Start the app render tree.
// NB: This must be called after any other Empirica calls (Empirica.round(),
// Empirica.introSteps(), ...).
// It is required and usually does not need changing.
Meteor.startup(() => {
  render(Empirica.routes(), document.getElementById("app"));
});
