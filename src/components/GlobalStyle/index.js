import { Global, css } from '@emotion/core'
import { Normalize } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'
import React from 'react'
import { white, blue } from 'theming'
import { cx } from 'utils'

const globalStyles = p => css`
  /* Fallback system fonts */
  @font-face {
    font-family: 'System';
    font-style: normal;
    font-weight: 400;
    src: local('.SFNSText-Regular'),
      local('.HelveticaNeueDeskInterface-Regular'), local('.LucidaGrandeUI'),
      local('Segoe UI'), local('Ubuntu'), local('Roboto-Regular'),
      local('DroidSans'), local('Tahoma');
  }
  @font-face {
    font-family: 'System';
    font-style: normal;
    font-weight: 500;
    src: local('.SFNSText-Medium'),
      local('.HelveticaNeueDeskInterface-MediumP4'), local('.LucidaGrandeUI'),
      local('Segoe UI Semibold'), local('Ubuntu Medium'), local('Roboto-Medium'),
      local('DroidSans-Bold'), local('Tahoma Bold');
  }
  @font-face {
    font-family: 'System';
    font-style: normal;
    font-weight: 700;
    src: local('.SFNSText-Bold'), local('.HelveticaNeueDeskInterface-Bold'),
      local('.LucidaGrandeUI'), local('Segoe UI Bold'), local('Ubuntu Bold'),
      local('Roboto-Bold'), local('DroidSans-Bold'), local('Tahoma Bold');
  }

  html {
    box-sizing: border-box;
    line-height: 1.5;
    font-size: 16px;
    height: 100%;
    -webkit-tap-highlight-color: transparent;
    margin: 0;
  }

  body {
    background-color: ${white(p)};
    /* TODO: Add me in theme; ps: I am hard coded in shire. */
    color: #5c6275;
    /* important is for docz */
    font-family: 'Asap', 'System', sans-serif !important;
    overflow: hidden;
    height: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }

  input,
  textarea,
  select,
  button {
    font-family: 'Asap', 'System', sans-serif !important;
  }

  button,
  html [type='button'],
  [type='reset'],
  [type='submit'] {
    appearance: none;
  }

  img,
  canvas,
  iframe,
  video,
  svg,
  select,
  textarea {
    max-width: 100%;
  }

  a {
    color: ${blue(p)};
    text-decoration: none;
  }

  a:hover,
  a:focus,
  a:active {
    /* TODO: Move me in theme; ps: I am the darkBlue shire color. */
    color: #2f52a1;
    text-decoration: underline;
  }

  p {
    margin: 0;
  }

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    variant: none;
    margin: 0;
  }

  input[type='number'] {
    variant: textfield;
  }
`
const asapFontStyle = p => {
  const { fontsRoot } = p.theme

  if (!fontsRoot) {
    return css`
      /* TODO: Replace me by the Scaleway SDN */
      @import url('https://fonts.googleapis.com/css?family=Asap:400,500,700&display=swap');
    `
  }

  return css`
    @font-face {
      font-family: 'Asap';
      font-style: normal;
      src: url('${fontsRoot}/Asap-Regular.woff2') format('woff2'),
        url('${fontsRoot}/Asap-Regular.woff') format('woff');
      font-weight: 400;
      font-display: swap;
    }
    @font-face {
      font-family: 'Asap';
      font-style: normal;
      src: url('${fontsRoot}/Asap-Medium.woff2') format('woff2'),
        url('${fontsRoot}/Asap-Medium.woff') format('woff');
      font-weight: 500;
      font-display: swap;
    }
    @font-face {
      font-family: 'Asap';
      font-style: normal;
      src: url('${fontsRoot}/Asap-Bold.woff2') format('woff2'),
        url('${fontsRoot}/Asap-Bold.woff') format('woff');
      font-weight: 700;
      font-display: swap;
    }
  `
}

export function GlobalStyle({ additionalStyles = [] }) {
  return (
    <>
      <Normalize />
      <Global styles={cx([globalStyles, ...additionalStyles, asapFontStyle])} />
    </>
  )
}

GlobalStyle.propTypes = {
  additionalStyles: PropTypes.arrayOf(PropTypes.object),
}
