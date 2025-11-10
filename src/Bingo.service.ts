import type {TBingoLetter} from '../types/Bingo.ts';

export class BingoService {
	static getStartingNumber (letter: TBingoLetter): number {
		switch (letter) {
			case 'B':
				return 1;
			case 'I':
				return 16;
			case 'N':
				return 31;
			case 'G':
				return 46;
			case 'O':
				return 61;
		}
	}
}
