import type { WordType } from "@/types/word";
import { create } from "zustand";

interface WordsStore {
	words: WordType[];

	setWords: (words: WordType[]) => void;
	removeWord: (id: number) => void;
}

const useWordsStore = create<WordsStore>()((set) => ({
	words: [],

	setWords: (words) => set({ words }),
	removeWord: (id) => set(({ words }) => ({ words: words.filter((w) => w.id !== id) })),
}));

export default useWordsStore;
