import React, { useCallback } from 'react'
import I18n from '@scaleway/use-i18n'
import { Story } from '@storybook/react'
import { css, ThemeProvider, Global, Theme } from '@emotion/react'
import { mockRandom } from 'jest-mock-random'
import normalize from '../src/utils/normalize'
import { useDarkMode } from 'storybook-dark-mode'
import { themes } from '@storybook/theming'
import { light, dark } from './scaleway'

import lightTheme from '../src/theme'
import DocsContainer from './components/DocsContainer'

if (process.env.STORYBOOK_ENVIRONMENT === 'visual') mockRandom([0.25, 0.5])

const STORY_SORT = {
  order: ['Home', 'Testing', 'Theme', 'Components'],
}

const darkMode = {
  dark: { ...themes.dark, ...dark },
  light: { ...themes.normal, ...light },
}

const ENV_PARAMETERS = {
  development: {
    darkMode,
    actions: { disable: true, argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      disable: true,
      grid: {
        disable: true,
      },
    },
    viewMode: 'canvas',
    previewTabs: {
      'storybook/docs/panel': { index: 1 },
    },
    viewport: {
      viewports: {},
    },
    options: {
      storySort: STORY_SORT,
    },
    docs: {
      container: DocsContainer,
    },
  },
  production: {
    darkMode,
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      disable: true,
      grid: {
        disable: true,
      },
    },
    viewMode: 'docs',
    previewTabs: { canvas: { hidden: true } },
    options: {
      storySort: STORY_SORT,
    },
    docs: {
      container: DocsContainer,
    },
  },
  visual: {},
}
ENV_PARAMETERS.visual = ENV_PARAMETERS.production

export const parameters =
  ENV_PARAMETERS[
    process.env.STORYBOOK_ENVIRONMENT as keyof typeof ENV_PARAMETERS
  ] || ENV_PARAMETERS.production

const adjustedTheme = (ancestorTheme: Theme, theme: Theme) => ({
  ...ancestorTheme,
  ...Object.keys(theme).reduce(
    (acc, themeItem) => ({
      ...acc,
      [themeItem]: {
        ...((acc[themeItem as keyof typeof theme] as Record<string, unknown>) ??
          {}),
        ...(theme[themeItem as keyof typeof theme] as Record<string, unknown>),
      },
    }),
    ancestorTheme,
  ),
})

export const globalStyles = (theme: Theme) => css`
  ${normalize()}

  body {
    font-family: ${theme.fonts.sansSerif};
  }
`

export const decorators = [
  (StoryComponent: Story) => {
    const mode = useDarkMode() ? 'dark' : 'light'

    const generatedTheme = useCallback(
      ancestorTheme => adjustedTheme(ancestorTheme, lightTheme),
      [mode, adjustedTheme, lightTheme],
    )

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
        <ThemeProvider theme={generatedTheme}>
          <Global styles={[globalStyles]} />
          <StoryComponent />
        </ThemeProvider>
      </I18n>
    )
  },
]
