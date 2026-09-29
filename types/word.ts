import * as z from "zod";
import { Language } from "./language";

export const Word = z.object({
	id: z.string(),
	word: z.string(),
	language: Language,
});
export type WordType = z.infer<typeof Word>;

export const Know = z.object({
	id: z.string(),
	words: z.array(Word),
});
export type KnowType = z.infer<typeof Know>;

export const Words = z.array(Know);
export type WordsType = z.infer<typeof Words>;
