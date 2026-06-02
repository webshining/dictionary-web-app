import * as z from "zod";

import { Language } from "./language";

const Translation = z.object({
	translation: z.string(),
	language: Language,
});

export const Word = z.object({
	id: z.number(),
	translations: z.array(Translation),
});

export const Words = z.array(Word);

export type WordType = z.infer<typeof Word>;
