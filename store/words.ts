import type { WordsType } from "@/types/word";
import { create } from "zustand";

interface WordsStore {
	words: WordsType;

	setWords: (words: WordsType) => void;
	removeWord: (id: string) => void;
}

const useWordsStore = create<WordsStore>()((set) => ({
	words: [],

	setWords: (words) => set({ words }),
	removeWord: (id) => set(({ words }) => ({ words: words.filter((w) => w.id !== id) })),
}));

export default useWordsStore;
