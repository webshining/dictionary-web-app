import { useDictionariesStore } from "@/stores/dictionaries";
import { FormEvent, useState } from "react";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { form, input } from "./DictionaryCreate.css";

const DictionaryCreate = () => {
	const { addDictionary } = useDictionariesStore((store) => store);

	const [name, setName] = useState<string>("");
	const [sourceLang, setSourceLang] = useState<string>("ru");
	const [targetLang, setTargetLang] = useState<string>("en");

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addDictionary(name, sourceLang, targetLang);
		setName("");
	};

	return (
		<form className={form} onSubmit={onSubmit}>
			<input
				className={input}
				type="text"
				name="name"
				placeholder="Dictionary Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<LanguageSelector selected={sourceLang} onSelect={setSourceLang} />
			<LanguageSelector selected={targetLang} onSelect={setTargetLang} />
		</form>
	);
};

export default DictionaryCreate;
