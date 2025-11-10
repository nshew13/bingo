import {html, css, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';


@customElement('shape-sphere')
export class ShapeSphere extends LitElement {
	/**
	 * CSS adapted from https://codepen.io/Taluska/pen/Eajpwvm
	 */
	static styles = css`
		*,
		*::before,
		*::after {
		    padding: 0;
		    margin: 0;
		    box-sizing: border-box;
		}
		
		:host {
		    --size: 5;
		    --size-shadow: 1em;
		    --size-border: 1px;
		}
		
		.circle {
		    display: grid;
		    place-content: center;
		    inline-size: calc(var(--size) * 1rem);
		    aspect-ratio: 1;
		    border-radius: 50%;
		    position: relative;
		    background-image:
		        /* light reflection */
		            radial-gradient(
		                    50% 40% at 30% 23%,
		                    white 12%,
		                    rgb(0 0 0 / 0) 25%
		            ),
		            radial-gradient(
		                    80% 80% at center,
		                    rgb(170 170 170 / 20%) 20%,
		                    hsl(110, 55%, 92%, 0.5) 50%,
		                    hsl(188, 63%, 84%) 80%
		            ),
		            linear-gradient(
		                    35deg,
		                    hsl(220, 87%, 75%, 0.9),
		                    rgb(255 255 255 / 53%),
		                    rgb(255 187 238)
		            )
		;
		    background-color: rgb(221 238 255);
		    box-shadow: 0 calc(1.5 * var(--size-shadow)) calc(2 * var(--size-shadow)) calc(-1 * var(--size-border)) rgb(17 34 51 / 40%);
		    border: var(--size-border) solid rgb(255 255 255 / 20%);
		}
		
		/* highlight edge */
		.circle::before {
		    content: "";
		    position: absolute;
		    inset: 1.125em;
		    height: 80%;
		    border-radius: inherit;
		    border: 3px solid rgb(0 0 0 / 0);
		    border-top-color: white;
		    rotate: 17.5deg;
		    filter: blur(4px);
		}
	`;

	render() {
		return html`<div class="circle"><slot></slot></div>`;
	}
}
