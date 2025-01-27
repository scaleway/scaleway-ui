import { ThemeProvider } from '@emotion/react'
import '@ultraviolet/fonts/fonts.css'
import { Text, theme } from '@ultraviolet/ui'
import { lazy } from 'react'
import {
  Link as ReactRouterLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

/**
 * We get all the render.tsx in tests folder and generate individual pages / routes to render the content.
 */
const modules = import.meta.glob('./tests/**/*.tsx')
const pagesToRender = Object.keys(modules)
  .map(path =>
    path.includes('render.tsx')
      ? {
          name: path.replace('.tsx', ''),
          Component: lazy(
            () => import(`./tests/${path?.split('/')[2]}/render.tsx`),
          ),
        }
      : null,
  )
  .filter(Boolean)
/**
 * ----------------------------------------
 */

const WelcomePage = () => (
  <>
    <Text as="p" variant="headingStrong">
      Welcome to the Ultraviolet E2E testing suite!
    </Text>
    <Text as="p" variant="body">
      This page is a placeholder for the available pages to test. Please read
      the README.md file for more information.
    </Text>
    <Text as="p" variant="body">
      Available pages to test:
    </Text>
    <ul>
      {pagesToRender.map(path => (
        <li key={path?.name}>
          <ReactRouterLink
            to={{ pathname: path?.name?.split('/')[2]?.toLowerCase() ?? '' }}
          >
            {path?.name?.split('/')[2]?.toLowerCase()}
          </ReactRouterLink>
        </li>
      ))}
    </ul>
  </>
)

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/test" element={<WelcomePage />} />
        {pagesToRender.map(path => {
          const Element = path?.Component

          if (Element) {
            return (
              <Route
                key={path?.name}
                path={path?.name?.split('/')[2]?.toLowerCase()}
                element={<Element />}
              />
            )
          }

          return null
        })}
      </Routes>
    </Router>
  </ThemeProvider>
)

export default App
