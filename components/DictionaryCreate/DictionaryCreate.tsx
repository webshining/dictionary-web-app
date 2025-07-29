import { form, input } from "./DictionaryCreate.css";

const DictionaryCreate = () => {
	return (
		<form className={form}>
			<input className={input} type="text" name="name" placeholder="Dictionary Name" />
		</form>
	);
};

export default DictionaryCreate;
