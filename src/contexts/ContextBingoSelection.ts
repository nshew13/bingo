import {createContext} from '@lit/context';
import type {TBingoLetter, TBingoNumber, TBingoSelection} from '../../types/Bingo.ts';
import {BingoService} from '../Bingo.service.ts';


export class BingoSelection {
	static readonly CONTEXT_KEY = Symbol('BingoSelection context key');
	static readonly EVENT_NAME_SELECTION_UPDATED = 'bingo-selection-updated';

	private _bingoLetter!: TBingoLetter;
	private _bingoNumber!: TBingoNumber;

	constructor (letter?: TBingoLetter, number?: TBingoNumber) {
		if (letter && number) {
			this.update(letter, number);
		}
	}

	get letter (): TBingoLetter {
		return this._bingoLetter;
	}

	get number (): TBingoNumber {
		return this._bingoNumber;
	}

	get selection (): TBingoSelection {
		return `${this._bingoLetter} ${this._bingoNumber}`;
	}

	update (letter: TBingoLetter, number: TBingoNumber) {
		// TODO: keep stack in localStorage
		if (BingoService.isValidCombo(letter, number)) {
			this._bingoLetter = letter;
			this._bingoNumber = number;
			window.dispatchEvent(new Event(BingoSelection.EVENT_NAME_SELECTION_UPDATED));
			return true;
		}

		return false;
	}
}

export const ContextBingoSelection = createContext<BingoSelection>(BingoSelection.CONTEXT_KEY);
