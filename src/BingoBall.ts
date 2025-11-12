import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import type {TBingoLetter} from '../types/Bingo.ts';

import './ShapeSphere.ts';


@customElement('bingo-ball')
export class BingoBall extends LitElement {
	static styles = css`
		:host {
			position: relative;
			width: 100%;
			aspect-ratio: 1;
		}
	
		.circle {
			color: black;
			font-family: serif;
			text-align: center;
			font-weight: bold;
			white-space: nowrap;
			container-type: inline-size;
			overflow: hidden;
			font-size: clamp(8px, 4.5cqw, 22px);;

			opacity: 0.2;
			&.called {
				opacity: 1;
			}

			position: absolute;
			display: flex;
			flex-direction: column;
			place-content: center;
		
			background-color: white;
			border-radius: 50%;
			border: 1px solid #bbb;
			aspect-ratio: 1;
			width: 90%;
			height: 90%;
			padding: 0.5em;
			box-shadow: 5px 5px 10px 1px rgb(0 0 0 / 50%);
			box-sizing: border-box;
			
			cursor: pointer;
			user-select: none;
		}
	`;

	@property({reflect: true, useDefault: true})
	called: boolean = false;

	@property()
	letter: TBingoLetter = 'B';

	@property()
	number: number = 1;

	#toggleHighlight (/* e: Event */): void {
		this.called = !this.called;
	}

	highlightBall () {
		this.called = true;
	}

	render() {
		return html`
		  <div
		    class="circle ${classMap({'called': this.called})}"
		    @click=${this.#toggleHighlight}
		  >
		    ${this.letter} ${this.number.toLocaleString()}
		  </div>
		`;
	}
}
