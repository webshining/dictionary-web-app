import { ulid } from "ulid";
import * as z from "zod";

export const LyricsLine = z.object({
	id: z.ulid().default(() => ulid()),
	timecode: z.number().nullable(),
	text: z.string(),
	hash: z.string(),
});

export const Lyrics = z
	.array(
		z.object({
			plainLyrics: z.string().nullable(),
			syncedLyrics: z.string().nullable(),
		}),
	)
	.transform((lyrics) => {
		return lyrics.find((l) => l.syncedLyrics)?.syncedLyrics || lyrics.find((l) => l.plainLyrics)?.plainLyrics || "";
	})
	.transform(async (lyrics) => {
		if (!lyrics) return [];
		return Promise.all(
			lyrics.split("\n").map(async (line) => {
				const match = line.match(/^\[(\d+):(\d+(?:\.\d+)?)\]\s*(.*)$/);
				if (!match) return { timecode: null, text: line, hash: "" };

				const [, minutes, seconds, text] = match;

				return {
					timecode: Number(minutes) * 60 + Number(seconds),
					text,
					hash: await hashString(text),
				};
			}),
		);
	})
	.pipe(z.array(LyricsLine));

export type LyricsLine = z.infer<typeof LyricsLine>;

const hashString = async (str: string) => {
	const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
	return Array.from(new Uint8Array(buffer))
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
};
