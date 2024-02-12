import { ThemeProvider, Global, css } from '@emotion/react'
import { Button } from '@ultraviolet/ui'
import { darkTheme, theme, normalize } from '@ultraviolet/ui'
import type { AppProps } from 'next/app'
import { useState } from 'react'

const globalStyles = (mode: 'light' | 'dark') => () => css`
  ${normalize()}

  :root {
    color-scheme: ${mode};
  }
  body {
    padding: 1em;
  }
  p {
    margin: 0 !important;
  }
`

const App = ({ Component, pageProps }: AppProps) => {
  const [isDark, setIsDark] = useState(false)
  const mode = isDark ? 'dark' : 'light'

  return (
    <ThemeProvider theme={isDark ? darkTheme : theme}>
      <Global styles={[globalStyles(mode)]} />
      <Button
        variant="outlined"
        size="small"
        icon={isDark ? 'sun' : 'moon'}
        onClick={() => setIsDark(!isDark)}
      />
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...pageProps}
      />
    </ThemeProvider>
  )
}

export default App
