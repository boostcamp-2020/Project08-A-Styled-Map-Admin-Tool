import React from 'react';
import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/core';

function GlobalStyle(): React.ReactElement {
  return (
    <Global
      styles={css`
        ${emotionReset}

        @font-face {
          font-family: 'Noto Sans KR';
          font-weight: 500;
          src: local('Noto Sans'), local('NotoSans'),
            url('/fonts/NotoSans-Medium.woff2') format('woff2'),
            url('/fonts/NotoSans-Medium.woff') format('woff');
        }

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
