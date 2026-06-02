"use server";

import { Languages } from "@/types/language";
import { cookies } from "next/headers";

export const getMyLanguages = async () => {
	const cookiesStore = await cookies();
	const session = cookiesStore.get("session");
	if (!session) return [];

	const response = await fetch(`${process.env.API_URL}/me/languages`, {
		headers: { Authorization: `Bearer ${session.value}` },
	});
	return response.status === 200 ? Languages.parse(await response.json()) : [];
};
