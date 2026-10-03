"use client";
import { searchLyrics } from "@/lib/lyrics";
import type { LyricsLine } from "@/types/lyrics";
import { type PlaybackState, SpotifyApi } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const page = () => {
	const prevPlayer = useRef<PlaybackState | null>(null);
	const [currentPlayer, setCurrentPlayer] = useState<PlaybackState | null>(null);
	const [cover, setCover] = useState<string | undefined>();

	const [lyrics, setLyrics] = useState<LyricsLine[]>([]);
	const startTimestamp = useRef<number>(Date.now());
	const prevLine = useRef<string | undefined>(undefined);
	const [currentLine, setCurrentLine] = useState<LyricsLine | undefined>();

	const spotifySdk = useRef(
		SpotifyApi.withUserAuthorization(
			process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
			process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL!,
			["user-read-playback-state"],
		),
	);

	useEffect(() => {
		let polling: NodeJS.Timeout | undefined;

		const init = async () => {
			await spotifySdk.current.authenticate();
			polling = setInterval(async () => {
				try {
					const state = await spotifySdk.current.player.getPlaybackState();
					setCurrentPlayer(state);
				} catch (error) {
					setCurrentPlayer(null);
					console.error("Failed to get playback state:", error);
				}
			}, 2000);
		};

		init();

		return () => {
			clearInterval(polling);
		};
	}, []);

	useEffect(() => {
		if (!currentPlayer) {
			setLyrics([{ id: "null", text: "Song lyrics not found.", timecode: 1 }]);
			return;
		}
		startTimestamp.current = Date.now() - currentPlayer.progress_ms;

		if (currentPlayer.item.id !== prevPlayer.current?.item.id) {
			if ("artists" in currentPlayer.item) {
				const artistName = currentPlayer.item.artists[0]?.name || "";
				searchLyrics(currentPlayer.item.name, artistName).then((data) => {
					setLyrics(data.length > 0 ? data : [{ id: "null", text: "Song lyrics not found.", timecode: 1 }]);
				});
			} else {
				setLyrics([{ id: "null", text: "Song lyrics not found.", timecode: 1 }]);
			}
		}
		prevPlayer.current = currentPlayer;
	}, [currentPlayer]);

	useEffect(() => {
		if (!currentPlayer || !("album" in currentPlayer.item) || currentPlayer.item.album.images.length === 0) {
			setCover(undefined);
			return;
		}

		const newCoverUrl = currentPlayer.item.album.images[0]?.url;
		if (cover !== newCoverUrl) {
			setCover(newCoverUrl);
		}
	}, [currentPlayer, cover]);

	useEffect(() => {
		if (!lyrics) {
			setCurrentLine(undefined);
			return;
		}

		const ticker = setInterval(() => {
			const position = Date.now() - startTimestamp.current;
			const candidate = lyrics.findLast((l) => l.timecode && l.timecode * 1000 <= position);
			if (prevLine.current === candidate?.id) return;
			setCurrentLine(candidate);
			prevLine.current = candidate?.id;
		}, 50);

		return () => {
			clearInterval(ticker);
		};
	}, [lyrics]);

	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-2 text-center p-4 text-2xl font-bold">
			{cover && (
				<div className="absolute left-0 top-0 w-full h-full -z-1">
					<Image src={cover} alt="" fill unoptimized loading="eager" style={{ objectFit: "cover" }} />
					<div className="absolute w-full h-full left-0 top-o bg-background/75 backdrop-blur-xl" />
				</div>
			)}
			{currentLine && <div>{currentLine.text}</div>}
		</div>
	);
};

export default page;
