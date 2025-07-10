import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { host } from "../api";
import WordItem from "../components/WordItem";
import WordsCreate from "../components/WordsCreate";
import { Dictionary } from "../types/dictionary";

const Words = () => {
	const [dictionary, setDictionary] = useState<Dictionary>();
	const { id } = useParams();
	const query = useQuery({
		queryKey: ["dictionaries"],
		queryFn: async () => (await host.get("/dictionaries/" + id)).data,
	});
	useEffect(() => {
		if (query.data && "dictionary" in query.data) setDictionary(query.data.dictionary);
	}, [query.data]);

	return (
		<div className="words">
			<div className="words__content">
				{dictionary?.words.map((word) => (
					<WordItem word={word} id={dictionary.id} />
				))}
			</div>
			{dictionary && <WordsCreate id={dictionary.id} />}
		</div>
	);
};

export default Words;
