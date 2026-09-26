"use server";

import { Words } from "@/types/word";
import { cookies } from "next/headers";

export const generateMyCards = async () => {
	const cookiesStore = await cookies();
	const session = cookiesStore.get("session");
	if (!session) return [];

	const response = await fetch(`${process.env.API_URL}/me/words/cards`, {
		headers: { Authorization: `Bearer ${session.value}` },
	});
	return response.status === 200 ? Words.parse(await response.json()) : [];
};

export const reviewWord = async (wordId: number, correct: boolean) => {
	
}