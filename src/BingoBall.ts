import {html, css, LitElement, nothing} from 'lit';
import {consume} from '@lit/context';
import {customElement, property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {BingoSelection, ContextBingoSelection} from './contexts/ContextBingoSelection.ts';
import type {TBingoLetter, TBingoNumber} from '../types/Bingo.ts';

import './ShapeSphere.ts';


@customElement('bingo-ball')
export class BingoBall extends LitElement {
	static styles = css`
		:host {
			display: flex;
			flex-direction: column;
			place-content: center;
			width: 100%;
			aspect-ratio: 1;
			container-type: size;
		}
	
		.circle {
			margin: auto;
			
			color: black;
			font-family: serif;
			text-align: center;
			font-weight: bold;
			white-space: nowrap;
			overflow: hidden;
			
			font-size: 16pt;
			@container (width > 10px) {
				font-size: max(16pt, 35cqi);
			}
			line-height: 1;

			opacity: 0.2;
			&.called {
				opacity: 1;
			}

			display: flex;
			flex-direction: column;
			place-content: center;
		
			background-color: white;
			border-radius: 50%;
			border: 1px solid #bbb;
			aspect-ratio: 1;
			width: 90%;
			height: 90%;
			box-shadow: 5px 5px 10px 1px rgb(0 0 0 / 50%);
			box-sizing: border-box;
			
			cursor: pointer;
		}
	`;

	@consume({context: ContextBingoSelection})
	@state()
	private _bingoSelection!: BingoSelection;

	@property({reflect: true, type: Boolean, useDefault: true})
	called: boolean = false;

	@property({type: Boolean, useDefault: true})
	inactive: boolean = false;

	@property()
	letter!: TBingoLetter;

	@property()
	number!: TBingoNumber;

	private toggleHighlight () {
		if (!this.inactive) {
			if (!this.called) {
				this._bingoSelection.update(this.letter, this.number);
			}
			this.called = !this.called;
		}
	}

	highlightBall () {
		this.called = true;
	}

	render() {
		return (this.letter && this.number)
			? html`
			  <div
			    class="circle ${classMap({'called': this.called})}"
			    @click=${this.toggleHighlight}
			  >
			    <span>${this.letter}</span>
                <span>${this.number?.toLocaleString()}</span>
			  </div>
			`
			: nothing
		;
	}
}
