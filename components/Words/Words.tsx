"use client";

import { Trash } from "lucide-react";
import { useEffect } from "react";

import { deleteWord as apiDeleteWord, type WordResponse } from "@/lib/api";
import useUserStore from "@/store/user";
import { Content, TranslationItem, WordItem } from "./Words.css";

const Words = ({ words }: { words: WordResponse[] | null }) => {
	const { words: storeWords, setWords, deleteWord } = useUserStore();

	useEffect(() => {
		if (!words) return (window as any).Telegram.WebApp.close();
		setWords(words);
	}, [words, setWords]);

	const deleteHandler = (id: number) => {
		apiDeleteWord(id).then((data) => {
			if (data === null) return (window as any).Telegram.WebApp.close();
			if (data === "ok") deleteWord(id);
		});
	};

	return (
		<Content>
			{storeWords.map((word) => (
				<WordItem key={word.id}>
					<div>
						{word.translations.map((translation) => (
							<TranslationItem key={translation.id}>
								<div className="language">{translation.language}</div>
								<div className="translation">{translation.translation}</div>
							</TranslationItem>
						))}
					</div>
					<button type="button" onClick={() => deleteHandler(word.id)}>
						<Trash size={25} strokeWidth={2} absoluteStrokeWidth />
					</button>
				</WordItem>
			))}
		</Content>
	);
};

export default Words;
