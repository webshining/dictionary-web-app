export interface Word {
	id: number;
	word: string;
	translation: string;
	dictionary: number
}

export interface Dictionary {
	id: number;
	name: string;
	words: Word[];
}
