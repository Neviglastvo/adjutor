import { css, FlattenSimpleInterpolation } from "styled-components";

export const sizes = {
	mobileSmall: 480,
	mobile: 768,
	tablet: 1024,
	laptop: 1440,
	desktop: 1920,
};

export const MxTextOverflow = css`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

export type cssPosition = "absolute" | "fixed" | "relative";
export const MxCoverBlock = (
	position: cssPosition = "absolute",
	gap: string | 0 = 0
): FlattenSimpleInterpolation => css`
	position: ${position};
	top: ${gap};
	left: ${gap};
	right: ${gap};
	bottom: ${gap};
`;

export const MxCoverImg = css`
	${MxCoverBlock()};
	object-fit: cover;
	font-family: "object-fit: cover";
	user-select: none;
`;

export const MxHideScrollbar = css`
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* Internet Explorer 10+ */
	&::-webkit-scrollbar {
		/* WebKit */
		width: 0;
		height: 0;
	}
`;

export function MxBlur(radius = 8): FlattenSimpleInterpolation {
	return css`
		-webkit-filter: blur(${radius}px);
		-ms-filter: blur(${radius}px);
		filter: url('data:image/svg+xmlutf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><filter id="blur"><feGaussianBlur stdDeviation="#${radius}px" /></filter></svg>#blur');
		filter: progid:DXImageTransform.Microsoft.Blur(Strength=${radius}px);
		filter: blur(${radius}px);
		transition: filter 300ms ease;
	`;
}

//MxAspectRatio(4, 3)
export function MxAspectRatio(
	width = 4,
	height = 3,
	offset = 0
): FlattenSimpleInterpolation {
	return css`
		position: relative;
		> * {
			${MxCoverBlock("relative", `${offset}px`)};
			margin: auto;
		}

		&:before {
			content: "";
			width: 100%;
			display: flex;
			padding-top: ${(height / width) * 100}%;
			pointer-events: none;
			z-index: -2;
		}
	`;
}

type pseudoSelector = "before" | "after";

export function MxDarkenBackground(
	color = "#000",
	opacity = 0.5,
	pseudoSelector: pseudoSelector = "before"
): FlattenSimpleInterpolation {
	return css`
		${`&:${pseudoSelector}`} {
			content: "";
			${MxCoverBlock()};
			pointer-events: none;
			background-color: ${color};
			opacity: ${opacity};
		}
	`;
}

export function MxCustomScroll(
	width = 10,
	radius = 0,
	colorBg = "#cecece",
	colorThumb = "tomato"
): FlattenSimpleInterpolation {
	return css`
		&::-webkit-scrollbar {
			border-radius: ${radius}px;
			height: 10px;
			width: ${width}px;
			background-color: ${colorBg};
		}

		&::-webkit-scrollbar-thumb {
			background: ${colorThumb};
			border-radius: ${radius}px;
		}

		&::-webkit-scrollbar-track {
			border-radius: ${radius}px;
		}
	`;
}

export type triangleDirection =
	| "t"
	| "r"
	| "b"
	| "l"
	| "tl"
	| "tr"
	| "br"
	| "bl";

export function MxTriangle(
	width = 10,
	height = 20,
	bg = "#000",
	direction: triangleDirection = "r"
): FlattenSimpleInterpolation {
	return css`
		width: 0;
		height: 0;
		border-style: solid;
		${direction === "t" &&
		css`
			border-width: 0 ${width / 2}px ${height}px ${width / 2}px;
			border-color: transparent transparent ${bg} transparent;
		`}
		${direction === "r" &&
		css`
			border-width: ${height / 2}px 0 ${height / 2}px ${width}px;
			border-color: transparent transparent transparent ${bg};
		`}
  ${direction === "b" &&
		css`
			border-width: ${height}px ${width / 2}px 0 ${width / 2}px;
			border-color: ${bg} transparent transparent transparent;
		`}
  ${direction === "l" &&
		css`
			border-width: ${height / 2}px ${width}px ${height / 2}px 0;
			border-color: transparent ${bg} transparent transparent;
		`}
  ${direction === "tl" &&
		css`
			border-width: ${height}px ${width}px 0 0;
			border-color: ${bg} transparent transparent transparent;
		`}
  ${direction === "tr" &&
		css`
			border-width: 0 ${width}px ${height}px 0;
			border-color: transparent ${bg} transparent transparent;
		`}
  ${direction === "br" &&
		css`
			border-width: 0 0 ${height}px ${width}px;
			border-color: transparent transparent ${bg} transparent;
		`}
  ${direction === "bl" &&
		css`
			border-width: ${width}px 0 0 ${height}px;
			border-color: transparent transparent transparent ${bg};
		`}
	`;
}

export function MxVw(resolution: number, target: number): string {
	const vwContext = resolution * 0.01;
	return `${(target / vwContext).toFixed(2)}vw`;
}

export function MxStaggerAnimation(
	index: number,
	animation: string,
	animationSpeed = 300,
	itemAppearDelay = 50
): FlattenSimpleInterpolation {
	return css`
		animation: ${animation} ${animationSpeed}ms ease-in;
		animation-fill-mode: both;
		animation-timing-function: ease-in-out;

		&:nth-child(n + ${index}) {
			animation-delay: ${index * itemAppearDelay}ms;
		}
	`;
}
