import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { fonts } from "./constants";

export const GlobalStyles = createGlobalStyle`
  ${reset}

  *, *:focus, *:hover {
    outline:none;
  }

  html, body {
    height: 100%;
    width: 100%;

  }

  body {
    font-family: ${fonts.openSans};
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p, label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  svg{
    > * {
      pointer-events: none;
    }
  }
`;
