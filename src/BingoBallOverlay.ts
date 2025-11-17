import {html, css, LitElement, nothing} from 'lit';
import {consume} from '@lit/context';
import {customElement, state} from 'lit/decorators.js';
import {BingoSelection, ContextBingoSelection} from './contexts/ContextBingoSelection.ts';

import './BingoBall.ts';
import './ShapeSphere.ts';


@customElement('bingo-ball-overlay')
export class BingoBallOverlay extends LitElement {
	private static readonly DISPLAY_DURATION_MS = 4_000;

	static styles = css`
		:host, .bingo-overlay-container {
			position: absolute;
			aspect-ratio: inherit;
			width: 100%;
			z-index: 10;
		}
		
		/*
		 * We can't conditionally render the host element ('bingo-ball-overlay'),
		 * so we have to allow pointer events (i.e., click) to pass through to lower
		 * elements.
		 *
		 * In order to allow clicks on the overlay, we have .bingo-overlay-container,
		 * which has the same dimensions as the host, but captures clicks. It is toggled
		 * in the render method based on the _showOverlay prop.
		 *
		 * N.B.: If we stopPropagation on the bingo-ball, we won't hear the click
		 *       event here.
		 */
		:host {
			pointer-events: none;
		}
		.bingo-overlay-container {
			pointer-events: auto;
		}
			
		.bingo-overlay {
			position: absolute;
			inset: 0;
			
			display: flex;
		    place-content: center;
		}
		
		.center-square {
			aspect-ratio: 1;
		}
	`;

	@consume({context: ContextBingoSelection})
	@state()
	private _bingoSelection!: BingoSelection;

	@state()
	private _showOverlay = false;

	private _timeoutID: ReturnType<typeof setTimeout> | undefined;

	constructor() {
		super();

		// listen for changes to BingoSelection
		window.addEventListener(BingoSelection.EVENT_NAME_SELECTION_UPDATED, () => {
			this.hide();
			this.show();
			// this.requestUpdate() is unnecessary here because we modified _showOverlay.

			this._timeoutID = setTimeout(() => {
				this.hide();
			}, BingoBallOverlay.DISPLAY_DURATION_MS);
		});
	}

	hide () {
		this._showOverlay = false;
		if (this._timeoutID) {
			clearTimeout(this._timeoutID);
			this._timeoutID = undefined;
		}
		// TODO: emit event to highlight new selection's ball
	}

	show () {
		this._showOverlay = true;
	}

	render() {
		return this._showOverlay
			? html`
	            <div class="bingo-overlay-container">
	              <div class="bingo-overlay" @click=${this.hide}>
	                <div class="center-square">
	                  <bingo-ball
	                    called
	                    letter="${this._bingoSelection.letter}"
	                    number="${this._bingoSelection.number}"
	                  ></bingo-ball>
	                </div>
	              </div>
	            </div>
			`
			: nothing
		;
	}
}
