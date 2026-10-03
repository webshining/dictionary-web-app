"use server";

import { Lyrics } from "@/types/lyrics";
import axios from "axios";

export const searchLyrics = async (title: string, artist: string) => {
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
};
