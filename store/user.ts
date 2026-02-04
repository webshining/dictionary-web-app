import { create } from "zustand";

export interface Language {
	id: number;
	name: string;
}

export interface User {
	id: number;
	name: string;
	username: string;
	lang: string;
}

export interface Word {
	id: number;
	translations: {
		id: number;
		language: number;
		translation: string;
	}[];
}

interface WordsState {
	words: Word[];
}

interface UserState {
	user: User | null;
	languages: Record<number, string>;
}

interface UserActions {
	setUser: (user: User) => void;
	setLanguages: (languages: Language[]) => void;
}
interface WordsActions {
	setWords: (words: Word[]) => void;
}

type UserStore = WordsState & UserState & UserActions & WordsActions;

const useUserStore = create<UserStore>()((set) => ({
	user: null,
	languages: {},
	words: [],

	setUser: (user) => set(() => ({ user })),
	setLanguages: (languages) =>
		set(() => {
			const new_languages: Record<number, string> = {};
			languages.forEach((l) => {
				new_languages[l.id] = l.name;
			});
			return { languages: new_languages };
		}),
	setWords: (words) => set(() => ({ words })),
}));

export default useUserStore;
