import type { LanguageType } from "@/types/language";
import { create } from "zustand";

type LanguageStore = {
	languages: LanguageType[];
	selected: LanguageType | null;

	setLanguages: (languages: LanguageType[]) => void;
	setSelected: (id: number) => void;
};

const useLanguage = create<LanguageStore>()((set) => ({
	selected: null,
	languages: [],

	setLanguages: (languages) =>
		set((state) => {
			return { languages, selected: !state.languages || !languages ? state.selected : languages[0] };
		}),
	setSelected: (id) =>
		set((state) => ({
			selected: state.languages ? (state.languages.find((l) => l.id === id) ?? state.languages[0]) : null,
		})),
}));

export default useLanguage;
