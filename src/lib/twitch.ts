export type TwitchScheduleEntry = {
  title: string;
  startTime: string;
  category?: string;
};

export const parseSchedule = (data: TwitchScheduleEntry[] = []) =>
  data.map((item) => ({
    title: item.title,
    startTime: new Date(item.startTime),
    category: item.category ?? "variety"
  }));

export default parseSchedule;
