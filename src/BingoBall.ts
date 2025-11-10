import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import type {TBingoLetter} from '../types/Bingo.ts';
import './ShapeSphere.ts';

@customElement('bingo-ball')
export class BingoBall extends LitElement {
	static styles = css`
		shape-sphere {
		    --size: 4;
		
			color: black;
			font-family: serif;
			text-align: center;
			font-weight: bold;
			font-size: 14pt;
		}
	`;

	@property()
	letter: TBingoLetter = 'B';

	@property()
	number: number = 1;

	render() {
		return html`<shape-sphere>${this.letter} ${this.number.toLocaleString()}</shape-sphere>`;
	}
}
