import { ulid } from "ulid";
import * as z from "zod";

export const LyricsLine = z.object({
	id: z.ulid().default(() => ulid()),
	timecode: z.number().nullable(),
	text: z.string(),
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
	.transform((lyrics) => {
		return lyrics.split("\n").map((line) => {
			const match = line.match(/^\[(\d+):(\d+(?:\.\d+)?)\]\s*(.*)$/);
			if (!match) return { timecode: null, text: line };

			const [, minutes, seconds, text] = match;

			return {
				timecode: Number(minutes) * 60 + Number(seconds),
				text,
			};
		});
	})
	.pipe(z.array(LyricsLine));

export type LyricsLine = z.infer<typeof LyricsLine>;

type d = z.infer<typeof Lyrics>;
