"use client";

import useWordsStore from "@/store/words";
import type { WordType } from "@/types/word";
import { AnimatePresence } from "framer-motion";
import { memo, useEffect, useState } from "react";
import WordItem from "./WordItem";

const Words = ({ words }: { words: WordType[] }) => {
	const [isHydrated, setIsHydrated] = useState(false);
	const { words: storeWords, setWords } = useWordsStore();

	useEffect(() => {
		setWords(words);
		setIsHydrated(true);
	}, [words, setWords]);

	const displayWords = isHydrated ? storeWords : words;

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
