"use server";

import { cookies } from "next/headers";

const generateHeaders = async (): Promise<Record<string, string>> => {
	const cookiesStore = await cookies();
	const headers: Record<string, string> = { "Content-Type": "application/json" };
	const session_id = cookiesStore.get("session_id");
	if (session_id) headers["Cookie"] = `session_id=${session_id.value}`;
	return headers;
};

export async function init(data: string | null) {
	const cookiesStore = await cookies();
	if (!data && cookiesStore.get("session_id")) return "ok";

	const body = JSON.stringify({ init_data: data });
	const headers = await generateHeaders();
	const res = await fetch(`${process.env.API_URL}/init`, { method: "POST", body, headers });

	if (res.status !== 200) return null;

	let session_id = res.headers.get("set-cookie");
	if (session_id) {
		session_id = session_id.split(";")[0].split("=")[1];
		cookiesStore.set({
			name: "session_id",
			value: session_id,
			httpOnly: true,
			sameSite: "none",
			secure: true,
			domain: process.env.DOMAIN,
		});
	}
	return "ok";
}

export interface WordResponse {
	id: number;
	translations: {
		id: number;
		language: number;
		translation: string;
	}[];
}

export async function getWords(): Promise<WordResponse[] | null> {
	const headers = await generateHeaders();
	const res = await fetch(`${process.env.API_URL}/words`, { headers });

	if (res.status !== 200) return null;

	return (await res.json()) as WordResponse[];
}

export async function deleteWord(id: number): Promise<"ok" | "failed" | null> {
	const headers = await generateHeaders();
	const res = await fetch(`${process.env.API_URL}/words/${id}`, { method: "DELETE", headers });

	if (res.status === 401) return null;
	if (res.status !== 200) return "failed";

	return "ok";
}
