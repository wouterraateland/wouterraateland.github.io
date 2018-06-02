import React from 'react'
import { ThemeProvider, injectGlobal } from 'styled-components'

const theme = {
  fonts: {
    main: 'roboto, sans-serif',
    titles: `'Passion One', cursive`,
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#52006b',
    accent: '#e87511',
    success: '#4caf50',
    warning: '#ffc107',
    error: '#f44336',
  },
  opacity: {
    titles: 0.2,
    text: 0.55,
  },
  border: {
    width: '.125em',
    radius: '.25em',
  },
  columns: {
    count: 12,
    gap: '.5em',
  },
  lineHeight: 1.5,
}

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Passion+One:400,700');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  body {
    padding: 0;
    margin: 0;

    font-family: ${theme.fonts.main};
  }

  input, textarea, select, button {
    font: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.titles}
  }
`

const Theme = (props) => (
  <ThemeProvider theme={theme} {...props} />
)

export default Theme
