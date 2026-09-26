"use client";

import useWordsStore from "@/store/words";
import type { WordType } from "@/types/word";
import { AnimatePresence } from "framer-motion";
import { memo, useEffect } from "react";
import WordItem from "./WordItem";

const Words = ({ words }: { words: WordType[] }) => {
	const { words: storeWords, setWords } = useWordsStore();

	useEffect(() => {
		setWords(words);
	}, [words, setWords]);

	const displayWords = storeWords.length > 0 ? storeWords : words;

	return (
		<div className="flex flex-col gap-2 p-2 pb-0">
			<AnimatePresence mode="popLayout">
				{displayWords.map((word) => (
					<WordItem key={word.id} word={word} />
				))}
			</AnimatePresence>
		</div>
	);
};

export default memo(Words);
