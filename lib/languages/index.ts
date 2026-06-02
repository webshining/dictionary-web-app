"use server";

import { Languages } from "@/types/language";
import { cookies } from "next/headers";

export const getMyLanguages = async () => {
	const cookiesStore = await cookies();

	const response = await fetch(`${process.env.API_URL}/me/languages`, {
		headers: { Authorization: `Bearer ${cookiesStore.get("session")!.value}` },
	});
	return Languages.parse(await response.json());
};
