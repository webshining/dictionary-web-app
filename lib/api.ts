import axios from "axios";

export async function init(data: string | null): Promise<"ok" | null> {
	const { status } = await axios.post(
		`${process.env.NEXT_PUBLIC_API_URL}/init`,
		{ init_data: data },
		{ withCredentials: true },
	);

	if (status !== 200) return null;
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

export async function getWords(): Promise<WordResponse[]> {
	const { data } = await axios.get<WordResponse[]>(`${process.env.NEXT_PUBLIC_API_URL}/words`, {
		withCredentials: true,
	});
	return data;
}

export async function deleteWord(id: number) {
	await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/words/${id}`, { withCredentials: true });
}
