import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { host } from "../api";
import DictionaryForm from "../components/DictionaryForm";
import DictionaryItem from "../components/DictionaryItem";
import Items from "../elements/Items";
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
		<div className="w-full h-full flex flex-col">
			{/* <div className="w-full flex-1 px-[10px]"> */}
			<div className="w-full flex-1 px-[10px]">
				<Items className="p-10px">
					{dictionaries.map((dictionary: Dictionary) => (
						<DictionaryItem key={dictionary.id} dictionary={dictionary} />
					))}
				</Items>
			</div>
			<div className="w-full p-[10px] animate-appearance">
				<DictionaryForm />
			</div>
		</div>
	);
};

export default Dictionaries;
