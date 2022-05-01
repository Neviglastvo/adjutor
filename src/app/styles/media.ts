/*
 * Media queries utility
 */

import { css } from "styled-components";

import {
	CSSObject,
	DefaultTheme,
	FlattenInterpolation,
	Interpolation,
	InterpolationFunction,
	ThemedStyledProps,
} from "styled-components/macro";

/*
 * Taken from https://github.com/DefinitelyTyped/DefinitelyTyped/issues/32914
 */

// Update your breakpoints if you want
export const sizes = {
	phone: 480,
	phablet: 768,
	tablet: 1024,
	laptop: 1440,
	desktop: 1920,
};

// Iterate through the sizes and create a media template
export const r = (Object.keys(sizes) as Array<keyof typeof sizes>).reduce(
	(acc, label) => {
		acc[label] = (first: any, ...interpolations: any[]) => css`
			@media only screen and (max-width: ${sizes[label]}px) {
				${css(first, ...interpolations)}
			}
		`;

		return acc;
	},
	{} as { [key in keyof typeof sizes]: MediaFunction }
);

export const rmin = (Object.keys(sizes) as Array<keyof typeof sizes>).reduce(
	(acc, label) => {
		acc[label] = (first: any, ...interpolations: any[]) => css`
			@media only screen and (min-width: ${sizes[label]}px) {
				${css(first, ...interpolations)}
			}
		`;

		return acc;
	},
	{} as { [key in keyof typeof sizes]: MediaFunction }
);

/*
 * @types/styled-component is not working properly as explained in the github issue referenced above.
 * We must overcome this with custom typings, however, this might not work in time as the styled-components update.
 * Be carefull and keep an eye on the issue and the possible improvements
 */
type MediaFunction = <P extends object>(
	first:
		| TemplateStringsArray
		| CSSObject
		| InterpolationFunction<ThemedStyledProps<P, DefaultTheme>>,
	...interpolations: Array<Interpolation<ThemedStyledProps<P, DefaultTheme>>>
) => FlattenInterpolation<ThemedStyledProps<P, DefaultTheme>>;

/* Example
const SomeDiv = styled.div`
  display: flex;
  ....
  ${r.medium`
    display: block
  `}
`;
*/
