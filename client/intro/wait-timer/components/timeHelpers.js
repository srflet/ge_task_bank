export default function calcTimeRemaining(timeToStart, now, bufferTime) {
    if (!bufferTime) { bufferTime = 0 };
    const hour_minute = timeToStart.split(":");
    const targetHour = hour_minute[0];
    const targetMinute = hour_minute[1];
    const targetSecond = hour_minute[2] == undefined ? 0 : hour_minute[2];

    // this is the subject's local time
    const localTime = now;

    // now we have to convert a difference to chicago time
    const d = new Date();
    const localOffset = d.getTimezoneOffset() * 60000;


    // this could probably be more concise 
    const localDate = new Date(localTime + localOffset);
    const targetDate = new Date(localDate.getYear() + 1900, localDate.getMonth(), localDate.getDate(), targetHour, targetMinute, targetSecond)
    const time_to_start = (targetDate.getTime() - localDate.getTime()) / 1000;

    return (time_to_start + bufferTime);
}