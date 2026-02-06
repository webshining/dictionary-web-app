import { create } from "zustand";

import type { WordResponse } from "@/lib/api";

interface WordsState {
	words: WordResponse[];
}

interface WordsActions {
	setWords: (words: WordResponse[]) => void;
	deleteWord: (id: number) => void;
}

type UserStore = WordsState & WordsActions;

const useUserStore = create<UserStore>()((set) => ({
	words: [],

	setWords: (words) => set(() => ({ words })),
	deleteWord: (id) => set((state) => ({ words: state.words.filter((w) => w.id !== id) })),
}));

export default useUserStore;
