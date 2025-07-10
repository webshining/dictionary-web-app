import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { host } from "../api";
import DictionaryCreate from "../components/DictionariesCreate";
import DictionaryItem from "../components/DictionaryItem";
import { Dictionary } from "../types/dictionary";

const Dictionaries = () => {
	const [dictionaries, setDictionaries] = useState<Dictionary[]>([]);
	const query = useQuery({
		queryKey: ["dictionaries"],
		queryFn: async () => (await host.get("/dictionaries")).data,
	});
	useEffect(() => {
		if (query.data && "dictionaries" in query.data) setDictionaries(query.data.dictionaries);
	}, [query.data]);
	return (
		<div className="dictionaries">
			<div className="dictionaries__content">
				{dictionaries.map((dictionary: Dictionary) => (
					<DictionaryItem key={dictionary.id} {...dictionary} />
				))}
			</div>
			<DictionaryCreate />
		</div>
	);
};

export default Dictionaries;
