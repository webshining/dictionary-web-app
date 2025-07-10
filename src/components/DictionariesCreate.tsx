import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { host } from "../api";

const DictionaryCreate = () => {
	const [name, setName] = useState<string>("");
	const [source, setSource] = useState<string>("ru");
	const [target, setTarget] = useState<string>("en");

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
	return (
		<form className="dictionaries__create" onSubmit={formSubmit}>
			<input type="text" placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
			<select name="source_lang" value={source} onChange={(e) => setSource(e.target.value)}>
				<option value="en">En</option>
				<option value="ru">Ru</option>
			</select>
			<select name="target_lang" value={target} onChange={(e) => setTarget(e.target.value)}>
				<option value="en">En</option>
				<option value="ru">Ru</option>
			</select>
		</form>
	);
};

export default DictionaryCreate;
