import {DateTime} from "luxon";

export function get5MinWindowStart(date: Date): Date {
  const dt = DateTime.fromJSDate(date, { zone: "utc" });
  const flooredMinute = Math.floor(dt.minute / 5) * 5;

  return dt
    .set({ minute: flooredMinute, second: 0, millisecond: 0 })
    .toJSDate();
}
