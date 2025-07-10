import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { host } from "../api";

const WordsCreate = ({ id }: { id: number }) => {
	const [word, setWord] = useState<string>("");

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async (body: { word: string }) => {
			await host.post(`/dictionaries/${id}`, body);
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dictionaries"] }),
	});
	const formSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!word.trim()) return;
		setWord("");
		mutation.mutate({ word });
	};
	return (
		<form className="words__create" onSubmit={formSubmit}>
			<input type="text" placeholder="Word" name="word" value={word} onChange={(e) => setWord(e.target.value)} />
		</form>
	);
};

export default WordsCreate;
