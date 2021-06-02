import React from 'react'
import I18n from '@scaleway/use-i18n'
import { css, ThemeProvider } from '@emotion/react'

import theme from '../src/theme'
import { GlobalStyle } from '../src'

const STORY_SORT = {
  order: ['Home', 'Theme', 'Components'],
}

const ENV_PARAMETERS = {
  development: {
    actions: { disable: true, argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      disable: true,
      grid: {
        disable: true,
      },
    },
    controls: {
      disable: true,
    },
    viewMode: 'docs',
    previewTabs: {
      'storybook/docs/panel': { index: -1 },
    },
    viewport: {
      viewports: {},
    },
    options: {
      storySort: STORY_SORT,
    },
  },
  production: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    viewMode: 'docs',
    previewTabs: { canvas: { hidden: true } },
    options: {
      storySort: STORY_SORT,
    },
  },
}
export const parameters =
  ENV_PARAMETERS[process.env.STORYBOOK_ENVIRONMENT] || ENV_PARAMETERS.production

const adjustedTheme = ancestorTheme => ({
  ...ancestorTheme,
  ...Object.keys(theme).reduce(
    (acc, themeItem) => ({
      ...acc,
      [themeItem]: {
        ...(acc[themeItem] ?? {}),
        ...theme[themeItem],
      },
    }),
    ancestorTheme,
  ),
})

export const decorators = [
  Story => (
    <I18n
      defaultLoad={async ({ locale }) => import(`./locales/${locale}.json`)}
      defaultLocale="en"
      defaultTranslations={{}}
      enableDebugKey={false}
      enableDefaultLocale={false}
      loadDateLocale={async locale => import(`date-fns/locale/${locale}/index`)}
      localeItemStorage="localeI18n"
      supportedLocales={['en', 'fr', 'es']}
    >
      <ThemeProvider theme={adjustedTheme}>
        <GlobalStyle
          additionalStyles={[
            css`
              body {
                overflow: initial !important;
              }
            `,
          ]}
        />
        <Story />
      </ThemeProvider>
    </I18n>
  ),
]
