import {BingoService} from './Bingo.service.ts';

import './style.css'

// import top-level Lit custom element(s)
import './BingoCallBoard.ts';
import type {TBingoLetter} from '../types/Bingo.ts';

(() => {
	let bingoLetter: TBingoLetter | undefined;
	let bingoDigits: number[] = [];

	document.addEventListener('keypress', (e: KeyboardEvent) => {
		if (BingoService.RE_BINGO_LETTERS.test(e.key)) {
			bingoLetter = e.key.toLocaleUpperCase() as TBingoLetter;
			bingoDigits = [];
		} else {
			const numeric = parseInt(e.key, 10);
			if (!Number.isNaN(numeric)) {
				bingoDigits.push(numeric);
			}
		}

		/*
		 * We have to make sure we don't fire on B1 when inputting B10-15.
		 * That means we'll need to input a leading 0 for B1.
		 */
		let bingoNumber: number = 0;
		if (bingoDigits.length === 2) {
			bingoNumber = bingoDigits[0] * 10 + bingoDigits[1];
		} else if (bingoDigits.length === 1 && bingoDigits[0] !== 1) {
			bingoNumber = bingoDigits[0];
		}

		if (bingoLetter &&
			bingoNumber &&
			BingoService.isValidCombo(bingoLetter, bingoNumber)
		) {
			console.log('heard', `${bingoLetter} ${bingoNumber}`);
			// TODO: set bingo-ball called attr
			bingoLetter = undefined;
			bingoDigits = [];
		}
	});
})()
