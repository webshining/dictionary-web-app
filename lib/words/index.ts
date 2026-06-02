"use server";

import { Word, Words } from "@/types/word";
import { cookies } from "next/headers";

export const getMyWords = async () => {
	const cookiesStore = await cookies();

	const response = await fetch(`${process.env.API_URL}/me/words`, {
		headers: { Authorization: `Bearer ${cookiesStore.get("session")!.value}` },
	});
	return Words.parse(await response.json());
};
export const getMyRandomWord = async () => {
	const cookiesStore = await cookies();

	const response = await fetch(`${process.env.API_URL}/me/words/random`, {
		headers: { Authorization: `Bearer ${cookiesStore.get("session")!.value}` },
	});
	return Word.parse(await response.json());
};
