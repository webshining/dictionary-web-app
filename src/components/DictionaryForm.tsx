import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { host } from "../api";
import Form from "../elements/Form";
import { Language } from "../types/language";

const DictionaryForm = () => {
	const [name, setName] = useState<string>("");
	const [source, setSource] = useState<string>("ru");
	const [target, setTarget] = useState<string>("en");
	const [languages, setLanguages] = useState<Language[]>([]);

	const query = useQuery({
		queryKey: ["languages"],
		queryFn: async () => (await host.get("/languages")).data,
	});
	useEffect(() => {
		if (query.data && "languages" in query.data) setLanguages(query.data.languages);
	}, [query.data]);

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async (body: { name: string; source_lang: string; target_lang: string }) => {
			await host.post("/dictionaries", body);
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dictionaries"] }),
	});
	const formSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!name.trim()) return;
		if (source === target) return;
		setName("");
		mutation.mutate({ name, source_lang: source, target_lang: target });
	};

	const StyledInput = styled(InputBase)(({ theme }) => ({
		width: "100%",
		fontSize: "100%",
		color: "var(--tg-theme-text-color)",
		"& .MuiInputBase-input": {
			color: "var(--tg-theme-text-color)",
			fontSize: "100%",
		},
	}));
	return (
		<Form className="animate-appearance" onSubmit={formSubmit}>
			<InputBase
				className="w-full"
				type="text"
				placeholder="Name"
				name="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				autoComplete="off"
				autoCorrect="off"
				autoCapitalize="off"
				spellCheck="false"
				sx={{ color: "unset" }}
			/>
		</Form>
	);
};

export default DictionaryForm;
