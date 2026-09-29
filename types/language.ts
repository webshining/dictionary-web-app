import * as z from "zod";

export const Language = z.object({
	id: z.string(),
	value: z.string(),
	display: z.string(),
});

export const Languages = z.array(Language);

export type LanguageType = z.infer<typeof Language>;
