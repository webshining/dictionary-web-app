import { host } from "@/lib/axios";
import { Dictionary } from "@/types/dictionary";
import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";

type DictionariesState = {
	dictionaries: Dictionary[];
};

type DictionariesActions = {
	addDictionary: (name: string, sourceLang: string, targetLang: string) => void;
	removeDictionary: (id: number) => void;
	setDictionaries: () => void;
};

type DictionariesStore = DictionariesState & DictionariesActions;

const defaultInitState: DictionariesState = {
	dictionaries: [],
};

const createDictionariesStore = (initState: DictionariesState = defaultInitState) => {
	return createStore<DictionariesStore>()((set) => ({
		...initState,
		addDictionary: async (name: string, sourceLang: string, targetLang: string) => {
			const { status, data } = await host.post<Dictionary>("/dictionaries/", {
				name,
				source_lang: sourceLang,
				target_lang: targetLang,
			});
			if (status == 201) {
				set((state) => ({ dictionaries: [...state.dictionaries, data] }));
			}
		},
		removeDictionary: async (id: number) => {
			await host.delete(`/dictionaries/${id}/`);
			set((state) => ({ dictionaries: state.dictionaries.filter((d) => d.id != id) }));
		},
		setDictionaries: async () => {
			const { data, status } = await host.get("/dictionaries/");
			if (status == 200) {
				set(() => ({ dictionaries: data }));
			}
		},
	}));
};

export type DictionariesStoreApi = ReturnType<typeof createDictionariesStore>;
const DictionariesStoreContext = createContext<DictionariesStoreApi | null>(null);

const useDictionariesStore = <T>(selector: (store: DictionariesStore) => T): T => {
	const dictionariesStoreContext = useContext(DictionariesStoreContext);

	if (!dictionariesStoreContext) {
		throw new Error(`useDictionariesStore must be used within Provider`);
	}

	return useStore(dictionariesStoreContext, selector);
};

export { createDictionariesStore, DictionariesStoreContext, useDictionariesStore };
