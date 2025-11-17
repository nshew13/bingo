import {html, css, LitElement} from 'lit';
import {consume} from '@lit/context';
import {customElement, query, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {BingoSelection, ContextBingoSelection} from './contexts/ContextBingoSelection.ts';

import './BingoBall.ts';
import './ShapeSphere.ts';


@customElement('bingo-ball-overlay')
export class BingoBallOverlay extends LitElement {
	private static readonly DURATION_DISPLAY_MS = 4_000;
	private static readonly DURATION_TRANSITION_MS = 200;

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
			display: none;
			
			&.show {
				display: block;
			}
		}
			
		.bingo-overlay {
		    transition: opacity ${BingoBallOverlay.DURATION_TRANSITION_MS}ms ease-in-out;

			position: absolute;
			inset: 0;
			opacity: 0;
			background-color: var(--theme-color-hsl-gold);
			
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

	@query('.bingo-overlay')
	private _overlayElement!: HTMLDivElement;

	protected readonly calculatedDisplayDuration!: number;
	private _timeoutIDs: Array<ReturnType<typeof setTimeout>> = [];

	constructor () {
		super();

		this.calculatedDisplayDuration = BingoBallOverlay.DURATION_DISPLAY_MS - BingoBallOverlay.DURATION_TRANSITION_MS * 2;

		// listen for changes to BingoSelection
		// this.requestUpdate() is unnecessary here because we modified _showOverlay.
		window.addEventListener(BingoSelection.EVENT_NAME_SELECTION_UPDATED, () => this.handleSelectionChange());
	}

	disconnectedCallback () {
		window.removeEventListener(BingoSelection.EVENT_NAME_SELECTION_UPDATED, () => this.handleSelectionChange());
		this._timeoutIDs.forEach(id => clearTimeout(id));
	}

	firstUpdated () {
		/*
		 * N.B.: The _overlayElement is unavailable to handleTransitionEnd if it is
		 *       used directly, rather than called from the arrow function.
		 */
		this._overlayElement.addEventListener('transitioncancel', (event: TransitionEvent) => this.handleTransitionEnd(event));
		this._overlayElement.addEventListener('transitionend',    (event: TransitionEvent) => this.handleTransitionEnd(event));
	}

	willUpdate (changedProperties: Map<string, unknown>) {
		if (this._overlayElement) {
			// N.B.: changedProperties holds the previous value
			if (changedProperties.get('_showOverlay') === false) {
				setTimeout(() => {
					this._overlayElement.style.setProperty('opacity', '1');
				}, 0);
			}
		}
	}

	private handleClick () {
		this.hide();
	}

	private handleSelectionChange () {
		const currentlyShowing = this._showOverlay || this._overlayElement.style.getPropertyValue('opacity') === '1';
		this.hide();

		if (currentlyShowing) {
			this._timeoutIDs.push(setTimeout(() => {
				this.show();
			}, BingoBallOverlay.DURATION_TRANSITION_MS));
		} else {
			this.show();
		}
	}

	private handleTransitionEnd (event: TransitionEvent) {
		if (event.propertyName === 'opacity') {
			if (this._overlayElement.style.getPropertyValue('opacity') === '1') {
				this._timeoutIDs.push(setTimeout(() => {
					this._overlayElement.style.setProperty('opacity', '0');
				}, this.calculatedDisplayDuration));
			}

			this._timeoutIDs.push(setTimeout(() => {
				this.hide();
			}, BingoBallOverlay.DURATION_DISPLAY_MS));
		}
	}

	hide () {
		this._showOverlay = false;
		this._overlayElement.style.setProperty('opacity', '0');
		if (this._timeoutIDs.length > 0) {
			this._timeoutIDs.forEach(id => clearTimeout(id));
			this._timeoutIDs = [];
		}
	}

	show () {
		this._showOverlay = true;
	}

	render() {
		return html`
          <div class="bingo-overlay-container ${classMap({'show': this._showOverlay})}">
            <div class="bingo-overlay" @click=${this.handleClick}>
              <div class="center-square">
                <bingo-ball
                  called
                  inactive
                  letter="${this._bingoSelection.letter}"
                  number="${this._bingoSelection.number}"
                ></bingo-ball>
              </div>
            </div>
          </div>
		`;
	}
}
