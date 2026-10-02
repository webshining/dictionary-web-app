import { Lyrics } from "@/types/lyrics";
import axios from "axios";

export const searchLyrics = async (title: string, artist: string) => {
	const url = new URL("https://lrclib.net/api/search");
	url.searchParams.append("track_name", title);
	url.searchParams.append("artist_name", artist);
	const { data } = await axios.get(url.toString());
	return Lyrics.parseAsync(data);
};
