import Empirica from "meteor/empirica:core";
import { Configs } from "../shared/api/collectionGroupsManagement.js";
import { PlayerEstimates } from "../shared/api/PlayerEstimates.js";
import { avatarNames } from "../shared/avatars.js";
import { getChatGroups, getNeighbors } from "../shared/helper";
import { instructions, taskData } from "../shared/tasks/default-tasks";
import "./bots.js";
import "./callbacks.js";

Meteor.publish('group-management', function publishTasks() {
  return Configs.find({})
})

Configs.insert({time : { timeToStart: "16:05:19", maxBuffer: 0, loginRefresh: 60, prolificCode: "" }})

console.log(Configs.find({}).fetch())
// Configs.remove("dtQ6MzzmmMC2DNGcZ")


Meteor.publish('player-estimates', function publishTasks() {
  return PlayerEstimates.find({})
})

Meteor.methods({
  'insertTask': function ({ playerId, estimate}) {
    return PlayerEstimates.insert({ playerId, estimate })
  }
})




// Set true while developing to set very large duration on stages.
const isDebugTime = Meteor.isDevelopment && false;

// gameInit is where the structure of a game is defined.
// Just before every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.
// You must then add rounds and stages to the game, depending on the treatment
// and the players. You can also get/set initial values on your game, players,
// rounds and stages (with get/set methods), that will be able to use later in
// the game.
Empirica.gameInit((game) => {
  const {
    treatment: {
      randomizeTask,
      taskType,
      responseDuration = 30,
      feedback,
      feedbackDuration = 30,
      longTermEngagement,
      quitEarly,
      nInteractions = 0,
      socialDuration = 30,
      playerCount,
      networkStructure,
      interactionMode,
      chatGroups,
      chat,
    },
  } = game;

  // Set treatment to the game data to facilitate wrangling
  game.set("treament", game.treatment)

  let nRounds = game.treatment.nRounds;

  check(nRounds <= 0, "nRounds should be > 0");
  check(responseDuration <= 0, "responseDuration should be > 0");
  check(feedback && feedbackDuration <= 0, "feedbackDuration should be > 0");
  check(
    longTermEngagement && game.players.length > 1,
    "longTermEngagement cannot be used with more than 1 player"
  );
  check(
    !longTermEngagement && quitEarly,
    "Cannot have quitEarly without longTermEngagement"
  );

  // Player info

  const avatars = _.shuffle(avatarNames);

  game.players.forEach((player, i) => {
    player.set("avatar", avatars.pop());
    player.set("score", 0);
    player.set("index", i + 1);

    // If there is no username, set the avatar to the username
    if (!player.get("username")) { player.set("username", player.get("avatar")) }
  });

  if (playerCount > 1) {
    check(
      !networkStructure,
      "networkStructure must be set if in multi player!"
    );

    game.players.forEach((p) => {
      p.set("neighbors", getNeighbors(networkStructure, p));

      if (chat) {
        check(!chatGroups, "chatGroups must be set when chat is used!");
        p.set("chatGroups", p.get("playerGroupId"));
      }
    });
  }

  // Task selection

  let tasks = taskData.slice();

  // if (taskType) {
  //   const t = Object.fromEntries(taskType.split(",").map((i) => [i, true]));
  //   tasks = tasks.filter((task) => t[task.task]);
  // }

  // check(
  //   tasks.length === 0,
  //   `Task list is empty! Is the taskList correct?
  // It should be a comma-separated list of task types, like so: 
  
  //   daily_life_facts,population_of_large_cities,geopolitics`
  // );

  // if (tasks.length < nRounds) {
  //   nRounds = tasks.length;
  //   game.treatment.nRounds = tasks.length;
  //   console.log("Fewer tasks than nRounds. Setting nRounds to tasks.length.");
  // }

  // if (randomizeTask) {
  //   tasks = _.shuffle(tasks);
  // }

  const round = game.addRound();
  const task = tasks[14];
  task.instructions = instructions[task.task];
  round.set("task", task);
  round.set("index", 1);

  round.addStage({
    name: "social",
    displayName: "Social",
    durationInSeconds: isDebugTime ? 31540000 : 60,
  });

  round.addStage({
    name: "response",
    displayName: "Response",
    durationInSeconds: isDebugTime ? 31540000 : 60000000,
  });



  // _.times(nRounds, (i) => {


  //   // If we have more interactions than 0, more than 1 player, and discreet interactions...
  //   if (
  //     nInteractions > 0 &&
  //     playerCount > 1 &&
  //     interactionMode === "discreet"
  //   ) {
  //     // ...create a response and social stage for every interaction
  //     for (let i = 0; i < nInteractions; i++) {
  //       round.addStage({
  //         name: "response",
  //         displayName: "Response",
  //         durationInSeconds: isDebugTime ? 31540000 : responseDuration,
  //       });

  //       round.addStage({
  //         name: "social",
  //         displayName: "Social",
  //         durationInSeconds: isDebugTime ? 31540000 : socialDuration,
  //       });
  //     }

  //     // And add a final response stage for after the last social interaction
  //     round.addStage({
  //       name: "response",
  //       displayName: "Response",
  //       durationInSeconds: Time ? 31540000 : responseDuration,
  //     });
  //   } else {
  //     //...otherwise, just create one response stage...
  //     round.addStage({
  //       name: "response",
  //       displayName: "Response",
  //       durationInSeconds: isDebugTime ? 31540000 : responseDuration,
  //     });

  //     //...and create one social stage if this is a continuous interaction mode
  //     if (interactionMode === "continuous" && playerCount > 1) {  //interactionMode === "continuous" && playerCount > 1 && type === "social"
  //       round.addStage({
  //         name: "social",
  //         displayName: "Social",
  //         durationInSeconds: isDebugTime ? 31540000 : socialDuration,
  //       });
  //     }
  //   }

  //   if (feedback) {
  //     round.addStage({
  //       name: "feedback",
  //       displayName: "Feedback",
  //       durationInSeconds: isDebugTime ? 31540000 : feedbackDuration,
  //     });
  //   }

  //   if (longTermEngagement && i + 1 < nRounds) {
  //     round.addStage({
  //       name: "wait",
  //       displayName: "Wait",
  //       durationInSeconds: 31540000, // 1 year
  //     });
  //   }
  // });
});

function check(condition, message, shouldThrow = true) {
  if (condition) {
    console.error(`
    
    ${message}

`);
    if (shouldThrow) {
      throw `Failed to init Game (see reason above)`;
    }
  }
}
