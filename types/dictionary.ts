export interface Dictionary {
	id: number;
	name: string;
	source_lang: string;
	target_lang: string;
	words: Word[];
}

export interface Word {
	id: number;
	word: string;
	translation: string;
}

export interface Language {
	code: string;
	name: string;
}
