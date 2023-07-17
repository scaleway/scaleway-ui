import I18n from '@scaleway/use-i18n'
import { Preview } from '@storybook/react'
import { css, ThemeProvider, Global, Theme } from '@emotion/react'
import { normalize } from '@ultraviolet/ui'
import { useDarkMode } from 'storybook-dark-mode'
import { themes } from '@storybook/theming'
import seedrandom from 'seedrandom'
import { light, dark } from './storybookThemes'
import lightTheme, { darkTheme } from '../packages/ui/src/theme'
import DocsContainer from './components/DocsContainer'
import Page from './components/Page'
import isChromatic from 'chromatic/isChromatic'
import AsapRegularWoff2 from './assets/fonts/asap/Asap-Regular.woff2'
import AsapMediumWoff2 from './assets/fonts/asap/Asap-Medium.woff2'
import AsapBoldWoff2 from './assets/fonts/asap/Asap-Bold.woff2'
import JetBrains from './assets/fonts/jetbrains/JetBrainsMono-Regular.woff2'

if (isChromatic()) seedrandom('manual-seed', { global: true })

const parameters = {
  darkMode: {
    dark: { ...themes.dark, ...dark },
    light: { ...themes.normal, ...light, default: true },
  },
  backgrounds: {
    disable: true,
    grid: {
      disable: true,
    },
  },
  viewMode: 'docs',
  previewTabs: {
    canvas: { hidden: false },
  },
  viewport: {
    viewports: {},
  },
  options: {
    storySort: {
      order: [
        'Get started',
        'Components state',
        'Testing',
        'Changelog',
        'State',
        ['Components state', 'Properties'],
        'Guidelines',
        'Migrations',
        'Customization',
        ['Understand Tokens'],
        ['Dark mode', 'Colors', 'Typography', 'Shadows', 'Spaces and Radii'],
        'Responsive',
        'Components',
        'Icons',
        'Form',
        ['Introduction', 'Changelog', 'Components'],
      ],
    },
  },
  docs: {
    container: DocsContainer,
    page: Page,
    source: { excludeDecorators: true }, // Exclude decorators from source code
  },
}

export const globalStyles = (mode: 'light' | 'dark') => (theme: Theme) =>
  css`
    ${normalize()}
    body {
      color: ${theme.colors.neutral.text};
    }

    :root {
      color-scheme: ${mode};
    }

    @font-face {
      font-family: 'Asap';
      font-style: normal;
      src: url(${AsapRegularWoff2}) format('woff2');
      font-weight: 400;
      font-display: swap;
    }
    @font-face {
      font-family: 'Asap';
      font-style: normal;
      src: url(${AsapMediumWoff2}) format('woff2');
      font-weight: 500;
      font-display: swap;
    }
    @font-face {
      font-family: 'Asap';
      font-style: normal;
      src: url(${AsapBoldWoff2}) format('woff2');
      font-weight: 600;
      font-display: swap;
    }
    @font-face {
      font-family: 'JetBrains';
      font-style: normal;
      src: url(${JetBrains}) format('woff2');
      font-weight: 400;
      font-display: swap;
    }
  `

const decorators: Preview['decorators'] = [
  StoryComponent => {
    const mode = useDarkMode() ? 'dark' : 'light'

    return (
      <I18n
        defaultLoad={async ({ locale }) => import(`./locales/${locale}.json`)}
        defaultLocale="en"
        defaultTranslations={{}}
        enableDebugKey={false}
        enableDefaultLocale={false}
        loadDateLocale={async locale =>
          import(`date-fns/locale/${locale}/index`)
        }
        localeItemStorage="localeI18n"
        supportedLocales={['en', 'fr', 'es']}
      >
        <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
          <Global styles={[globalStyles(mode)]} />
          <StoryComponent />
        </ThemeProvider>
      </I18n>
    )
  },
]

export default {
  parameters,
  decorators,
} satisfies Preview
