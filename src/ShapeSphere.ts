import {html, css, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';


@customElement('shape-sphere')
export class ShapeSphere extends LitElement {
	/**
	 * CSS from https://codepen.io/Taluska/pen/Eajpwvm
	 */
	static styles = css`
		*,
		*::before,
		*::after {
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
		
		body {
			display: grid;
			place-content: center;
			min-block-size: 100vh;
			background: radial-gradient(
				farthest-side at 100% -10%,
				hsl(196, 89%, 43%) 25%,
				hsl(195, 69%, 73%)
			);
		}
		
		.circle {
			display: grid;
			place-content: center;
			inline-size: 10rem;
			scale: 2;
			aspect-ratio: 1;
			border-radius: 50%;
			position: relative;
			background: radial-gradient(50% 40% at 30% 23%, #fff, 12%, #0000 25%),
				radial-gradient(
					80% 80% at center,
					#aaa3 30px,
					hsl(110, 55%, 92%, 0.5) 50%,
					hsl(188, 63%, 84%) 80%
				),
				linear-gradient(35deg, hsl(220, 87%, 75%, 0.9), #fff8, #fbe) #def;
			box-shadow: 0 1.5em 2em -0.125em #1236;
			border: 0.125em solid #fff3;
		}
		
		.circle::before {
			content: "";
			position: absolute;
			inset: 1.125em;
			height: 80%;
			border-radius: inherit;
			border: 3px solid;
			border-color: #fff #0000 #0000 #0000;
			rotate: 17.5deg;
			filter: blur(4px);
		}
	`;

	render() {
		return html`<div class="circle"><slot></slot></div>`;
	}
}
