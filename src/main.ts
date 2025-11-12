import './style.css'

// import top-level Lit custom element(s)
import './BingoCallBoard.ts';

import {BingoService} from './Bingo.service.ts';
import type {TBingoLetter} from '../types/Bingo.ts';
import type {BingoCallBoard} from './BingoCallBoard.ts';

document.addEventListener('DOMContentLoaded', () => {
	let bingoLetter: TBingoLetter | undefined;
	let bingoDigits: number[] = [];
	const bingoBoard: BingoCallBoard | null = document.querySelector('bingo-call-board');

	if (!bingoBoard) {
		console.error('bingo-call-board not found');
	}

	const handleBingoKeyedInput = (e: KeyboardEvent) => {
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
		 * Alternatively, we could add a debounce or a requirement to
		 * press Enter, but this works for now.
		 */
		let bingoNumber: number = 0;
		if (bingoDigits.length === 2) {
			bingoNumber = bingoDigits[0] * 10 + bingoDigits[1];
		} else if (bingoDigits.length === 1 && bingoDigits[0] !== 1) {
			bingoNumber = bingoDigits[0];
		}

		if (bingoBoard &&
			bingoLetter &&
			bingoNumber &&
			BingoService.isValidCombo(bingoLetter, bingoNumber)
		) {
			bingoBoard.highlightBall(bingoLetter, bingoNumber);
			bingoLetter = undefined;
			bingoDigits = [];
		}
	};

	/*
	 * We can't bind this to BingoCallBoard. It won't work on non-inputs
	 * without contentEditable="true", and we don't want that editable.
	 * It does appear to work when bound to the document.
	 */
	document.addEventListener('keyup', handleBingoKeyedInput);
});
