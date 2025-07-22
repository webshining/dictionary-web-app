import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useParams } from "react-router";
import { host } from "../api";
import DictionaryUpdateForm from "../components/DictionaryUpdateForm";
import WordForm from "../components/WordForm";
import WordItem from "../components/WordItem";
import Button from "../elements/Button";
import Items from "../elements/Items";
import { useRedirect } from "../services";
import { Dictionary } from "../types/dictionary";

const Words = () => {
	const redirect = useRedirect();
	const [dictionary, setDictionary] = useState<Dictionary | null>(null);
	const { id } = useParams();
	const query = useQuery({
		queryKey: ["words"],
		queryFn: async () => (await host.get(`/dictionaries/${id}`)).data,
	});
	useEffect(() => {
		if (query.data && "dictionary" in query.data) setDictionary(query.data.dictionary);
	}, [query.data]);

	return (
		<div className="w-full h-full flex flex-col gap-[10px]">
			<div className="px-[10px] flex gap-[10px] items-center animate-appearance">
				{dictionary && <DictionaryUpdateForm dictionary={dictionary} />}
				<Button onClick={() => redirect("/dictionaries")}>
					<IoMdArrowRoundBack />
				</Button>
			</div>
			<div className="w-full flex-1 px-[10px] overflow-y-auto">
				<Items className="h-full">
					{dictionary?.words.map((word) => (
						<WordItem key={word.id} word={word} id={word.dictionary} />
					))}
				</Items>
			</div>
			<div className="w-full px-[10px] animate-appearance">
				<WordForm />
			</div>
		</div>
	);
};

export default Words;
