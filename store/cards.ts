import type { WordType } from "@/types/word";
import { create } from "zustand";

interface CardsStore {
	cards: WordType[];
	currentWord: WordType | null;

	setCards: (cards: WordType[]) => void;
	next: () => void;
}

const useCardsStore = create<CardsStore>()((set) => ({
	cards: [],
	currentWord: null,

	setCards: (cards) => set({ cards, currentWord: cards.at(0) }),
	next: () =>
		set(({ cards, currentWord }) => {
			const newCards = currentWord ? cards.filter((c) => c.id !== currentWord.id) : cards;
			return {
				cards: newCards,
				currentWord: newCards.at(0),
			};
		}),
}));

export default useCardsStore;
