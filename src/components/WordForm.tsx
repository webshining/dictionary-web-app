import InputBase from "@mui/material/InputBase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useParams } from "react-router";
import { host } from "../api";
import Form from "../elements/Form";

const WordForm = () => {
	const { id } = useParams();
	const [word, setWord] = useState<string>("");

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async (body: { word: string }) => {
			await host.post(`/dictionaries/${id}/words`, body);
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["words"] }),
	});
	const formSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!word.trim()) return;
		setWord("");
		mutation.mutate({ word });
	};
	return (
		<Form onSubmit={formSubmit}>
			<InputBase
				className="w-full"
				type="text"
				placeholder="Word"
				name="word"
				value={word}
				onChange={(e) => setWord(e.target.value)}
				autoComplete="off"
				autoCorrect="off"
				autoCapitalize="off"
				spellCheck="false"
				sx={{ color: "unset" }}
			/>
		</Form>
	);
};

export default WordForm;
