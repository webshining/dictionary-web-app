import * as z from "zod";


const Translation = z.object({
  translation: z.string(),
  language: z.string()
});

export const Word = z.object({
  id: z.number(),
  translations: z.array(Translation)
});

export const Words = z.array(Word)

export type WordType = z.infer<typeof Word>