import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import type {TBingoLetter} from '../types/Bingo.ts';
import './ShapeSphere.ts';

@customElement('bingo-ball')
export class BingoBall extends LitElement {
	static styles = css`
		shape-sphere {
			padding: 4px;
			color: black;
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
