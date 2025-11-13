import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
		font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
		line-height: 1.5;
		font-weight: 400;                                
  }
`;

export const CustomButton = styled.button`
	display: inline-block;
	text-decoration: none;
	background-color: #eaeaea;
	color: #006089;
	border: 3px solid #006089;
	border-radius: 5px;
	font-size: 13px;
	padding: 15px 50px;
	cursor: pointer;

	box-shadow: 0 3px 0 #006089, 0 6px 16px rgba(0, 0, 0, 0.08);
	transition: transform 0.08s ease, box-shadow 0.08s ease, filter 0.08s ease, background-color 0.08s ease,
		color 0.08s ease, border-color 0.08s ease;

	&:hover {
		background-color: #006089;
		color: #ffeded;
		border-color: #006089;
		filter: brightness(1.02);
	}

	&:active {
		transform: translateY(2px);
		box-shadow: 0 1px 0 #004a68, 0 2px 8px rgba(0, 0, 0, 0.1) inset;
		filter: brightness(0.95);
	}

	&:focus-visible {
		outline: 3px solid rgba(0, 96, 137, 0.35);
		outline-offset: 2px;
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		box-shadow: none;
		transform: none;
	}

	user-select: none;
	-webkit-tap-highlight-color: transparent;
`;
