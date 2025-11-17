import type {TBingoLetter, TBingoNumber} from '../types/Bingo.ts';

interface IBingoOffset {
	start: TBingoNumber;
	end: TBingoNumber;
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

	static getEndingNumber (letter: TBingoLetter): TBingoNumber {
		return BINGO_MAP[letter].end;
	}

	static getStartingNumber (letter: TBingoLetter): TBingoNumber {
		return BINGO_MAP[letter].start;
	}

	static isValidCombo (letter: TBingoLetter, number: TBingoNumber): boolean {
		return number >= BINGO_MAP[letter].start && number <= BINGO_MAP[letter].end;
	}
}
