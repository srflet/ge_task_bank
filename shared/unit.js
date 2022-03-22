import { magnitudesToEnglish } from "./conversions";
import pluralize from "pluralize";

export function getUnit({ round=null, answer, magnitude, preventPluralize, player, task=null }) {
  if (round) {
    task = round.get("task");
  } else {
    task = task
  }

  let unit = task.question.unit;
  if (!unit) {
    return "";
  }

  if (magnitude && task.question.magnitude) {
    unit = magnitudesToEnglish[task.question.magnitude] + " " + unit;
  }

  const a = parseInt(answer || 0, 10);
  if (!preventPluralize) {
    unit = pluralize(unit, a);
  }
  return unit;
}
