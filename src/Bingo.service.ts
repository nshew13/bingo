import type {TBingoLetter} from '../types/Bingo.ts';

interface IBingoOffset {
	start: number;
	end: number;
}

type TBingoMap = {
	[key in TBingoLetter]: IBingoOffset;
};


const BINGO_MAP: TBingoMap = {
	'B': {
		start: 1,
		end: 15,
	},
	'I': {
		start: 16,
		end: 30,
	},
	'N': {
		start: 31,
		end: 45,
	},
	'G': {
		start: 46,
		end: 60,
	},
	'O': {
		start: 61,
		end: 75,
	},
};


export class BingoService {
	static readonly RE_BINGO_LETTERS = /[BINGO]/i;

	static getStartingNumber (letter: TBingoLetter): number {
		return BINGO_MAP[letter].start;
	}

	static isValidCombo (letter: TBingoLetter, number: number): boolean {
		return number >= BINGO_MAP[letter].start && number <= BINGO_MAP[letter].end;
	}
}
