import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import type {TBingoLetter} from '../types/Bingo.ts';

import './BingoBall.ts';
import './ShapeSphere.ts';


@customElement('bingo-ball-overlay')
export class BingoBallOverlay extends LitElement {
	static styles = css`
		:host {
			position: absolute;
			z-index: 10;
			
			aspect-ratio: inherit;
			width: 100%;
			container-type: size;
			
			display: flex;
		    place-content: center;
		}
		
		.center-square {
			aspect-ratio: 1;
		}
	`;

	@property()
	letter: TBingoLetter = 'B';

	@property()
	number: number = 1;

	// @state()
	// private _animationShown = false;
	//
	// private animateHighlight (/* e: Event */): void {
	// 	if (!this._animationShown) {
	// 		this._animationShown = true;
	// 	}
	// }

	render() {
		return html`
          <div class="center-square">
            <bingo-ball
              called="true"
              fit-height
              letter="${this.letter}"
              number="${this.number}"
            >
              <bingo-ball>
          </div>
		`;
	}
}
