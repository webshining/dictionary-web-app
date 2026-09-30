import * as z from "zod";

export const Stats = z.object({
	words_count: z.number(),
	avg_streak: z.number(),
	due_words_count: z.number(),
	difficult_words_count: z.number(),
});
