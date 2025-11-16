import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {map} from 'lit/directives/map.js';
import {range} from 'lit/directives/range.js';
import {BingoService} from './Bingo.service.ts';
import type {TBingoLetter} from '../types/Bingo.ts';

import './BingoBall.ts';
import './BingoBallOverlay.ts';
import type {BingoBall} from './BingoBall.ts';


@customElement('bingo-call-board')
export class BingoCallBoard extends LitElement {
	static styles = css`
		:host {
		    display: grid;
		    grid-template-columns: repeat(15, 1fr);
		    grid-template-rows: repeat(6, 1fr);
		    
		    place-items: center;
		    aspect-ratio: 16 / 9;
			box-shadow: 1px 1px 3px 0 rgb(0 0 0 / 30%);
		    width: 100vw;
			container-type: size;
		}
		
		.table-header {
			grid-column: 1 / span 15;
			background-color: hsl(44 87 50);
			color: black;
			width: 100%;
			height: 100%;
		}
		
		.table-label {
			padding: 0 0.5em;
			
			font-size: 14pt;
			@container (height > 10px) {
				font-size: max(14pt, 10cqb);
			}
		}
	`;

	@property()
	label: string = 'BINGO';

	// @property()
	// orientation: 'portrait' | 'landscape' = 'landscape';

	// firstUpdated() {
	// 	// pick a few numbers (TODO: REMOVE)
	// 	const b13 = this.renderRoot?.querySelector('bingo-ball[letter="B"][number="13"]');
	// 	console.log('B13', b13);
	//
	// 	// this.renderRoot?.querySelector('bingo-ball[letter="B"][number="13"]')?.setAttribute('called', 'true');
	// 	b13?.setAttribute('called', 'true');
	// }

	#renderRow(letter: TBingoLetter) {
		const startingNumber = BingoService.getStartingNumber(letter);
		const count = range(BingoService.getEndingNumber(letter) - startingNumber + 1);
		return html`${map(count, (i) => html`<bingo-ball letter="${letter}" number="${i + startingNumber}"><bingo-ball>`)}`;
	}

	highlightBall (bingoLetter: TBingoLetter, bingoNumber: number) {
		if (BingoService.isValidCombo(bingoLetter, bingoNumber)) {
			const ballEl = this.renderRoot.querySelector(`bingo-ball[letter="${bingoLetter}"][number="${bingoNumber}"]`);
			if (ballEl) {
				(ballEl as BingoBall).highlightBall();
			}
		}
	}

	render() {
		return html`
		  	<bingo-ball-overlay></bingo-ball-overlay>
		  	<div class="table-header">
		  		<div class="table-label">${this.label}</div>
            </div>
		  	${this.#renderRow('B')}
			${this.#renderRow('I')}
			${this.#renderRow('N')}
			${this.#renderRow('G')}
			${this.#renderRow('O')}
		`;
	}
}
