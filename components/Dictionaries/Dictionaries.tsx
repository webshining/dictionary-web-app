import { useDictionariesStore } from "@/stores/dictionaries";
import { useEffect } from "react";
import DictionaryItem from "../DictionaryItem/DictionaryItem";
import { items } from "./Dictionaries.css";

const Dictionaries = () => {
	const { dictionaries, setDictionaries } = useDictionariesStore((state) => state);

	useEffect(() => {
		setDictionaries();
	}, []);

	return (
		<div className={items}>
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			<div></div>
		</div>
	);
};

export default Dictionaries;
