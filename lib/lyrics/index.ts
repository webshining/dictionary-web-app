"use server";
import { Lyrics } from "@/types/lyrics";
import axios from "axios";
import { unstable_cache } from "next/cache";

export const searchLyrics = unstable_cache(
	async (title: string, artist: string) => {
		const url = new URL("https://lrclib.net/api/search");
		url.searchParams.append("track_name", title);
		url.searchParams.append("artist_name", artist);
		try {
			const { data } = await axios.get(url.toString(), {
				headers: { "User-Agent": "dictionario/1.0 (webshining@protonmail.com)" },
			});
			return Lyrics.parseAsync(data);
		} catch (_e) {
			return [];
		}
	},
	["lyrics"],
	{
		revalidate: 3600,
	},
);
