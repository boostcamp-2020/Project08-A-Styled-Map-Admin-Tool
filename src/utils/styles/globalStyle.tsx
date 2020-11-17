import React from 'react';
import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/core';

function GlobalStyle() {
  return (
    <Global
      styles={css`
        ${emotionReset}

        html {
          font-size: 62.5%;
        }

        * {
          box-sizing: border-box;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        button,
        button:active {
          outline: none;
          cursor: pointer;
        }

        input:focus {
          outline: none;
        }
      `}
    />
  );
}

export default GlobalStyle;
