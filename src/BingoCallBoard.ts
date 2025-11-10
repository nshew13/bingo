import {html, css, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {map} from 'lit/directives/map.js';
import {range} from 'lit/directives/range.js';
import './BingoBall.ts';
import type {TBingoLetter} from '../types/Bingo.ts';
import {BingoService} from './Bingo.service.ts';


@customElement('bingo-call-board')
export class BingoCallBoard extends LitElement {
	static styles = css`
		:host {
		    display: grid;
		    grid-template-columns: repeat(15, 1fr);
		    grid-template-rows: repeat(5, 1fr);
		    
		    place-items: center;
		    aspect-ratio: 16 / 9;
		    border: 2px dashed red;
		    width: 100vw;
		}
	`;

	// @property()
	// orientation: 'portrait' | 'landscape' = 'landscape';

	#renderRow(letter: TBingoLetter) {
		const startingNumber = BingoService.getStartingNumber(letter);
		return html`${map(range(15), (i) => html`<bingo-ball letter="${letter}" number="${i + startingNumber}"><bingo-ball>`)}`;
	}

	render() {
		return html`
		  	${this.#renderRow('B')}
			${this.#renderRow('I')}
			${this.#renderRow('N')}
			${this.#renderRow('G')}
			${this.#renderRow('O')}
		`;
	}
}
