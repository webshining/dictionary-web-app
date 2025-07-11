import { FormEvent, useState } from "react";
import Form from "../elements/Form";
import { Dictionary } from "../types/dictionary";

const DictionaryUpdateForm = ({ dictionary }: { dictionary: Dictionary }) => {
	const [name, setName] = useState<string>(dictionary.name);
	const formSubmit = (e: FormEvent) => {
		e.preventDefault();
	};
	return (
		<Form onSubmit={formSubmit}>
			<input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
		</Form>
	);
};

export default DictionaryUpdateForm;
