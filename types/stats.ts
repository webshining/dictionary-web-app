import * as z from "zod";

const DayStats = z.object({
	date: z.iso
		.datetime()
		.transform((date) => new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(new Date(date))),
	failure: z.number(),
	success: z.number(),
	total: z.number(),
});
export type DayStatsType = z.infer<typeof DayStats>;

export const Stats = z.object({
	words_count: z.number(),
	avg_streak: z.number(),
	due_words_count: z.number(),
	difficult_words_count: z.number(),
	week: z.array(DayStats),
});
