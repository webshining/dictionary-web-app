export interface Word {
	id: number;
	word: string;
	translation: string;
}

export interface Dictionary {
	id: number;
	name: string;
	words: Word[];
}
