"use server";

import { Word, Words } from "@/types/word";
import { cookies } from "next/headers";

export const getMyWords = async () => {
	const cookiesStore = await cookies();
	const session = cookiesStore.get("session");
	if (!session) return [];

	const response = await fetch(`${process.env.API_URL}/me/words`, {
		headers: { Authorization: `Bearer ${session.value}` },
	});
	return response.status === 200 ? Words.parse(await response.json()) : [];
};
export const removeWord = async (id: number) => {
	const cookiesStore = await cookies();
	const session = cookiesStore.get("session");
	if (!session) return;

	await fetch(`${process.env.API_URL}/me/words/${id}`, {
		method: "DELETE",
		headers: { Authorization: `Bearer ${session.value}` },
	});
};
export const getMyRandomWord = async () => {
	const cookiesStore = await cookies();
	const session = cookiesStore.get("session");
	if (!session) return null;

	const response = await fetch(`${process.env.API_URL}/me/words/random`, {
		headers: { Authorization: `Bearer ${session.value}` },
	});
	return response.status === 200 ? Word.parse(await response.json()) : null;
};
