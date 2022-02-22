import deepmerge from 'deepmerge'
import colorsDeprecated from './deprecated/colors'
import dark from './tokens/dark'
import light from './tokens/light'

/* eslint-disable sort-keys */
const radii = {
  none: '0',
  default: '4px',
  large: '8px',
}

const space = {
  0: '0',
  0.25: '2px',
  0.5: '4px',
  0.75: '6px',
  1: '8px',
  2: '16px',
  2.25: '18px',
  3: '24px',
  4: '32px',
  5: '40px',
  6: '48px',
  7: '56px',
  8: '64px',
  9: '72px',
}
export type Spaces = keyof typeof space

const screens = {
  xsmall: 0,
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
}
export type ScreenSize = keyof typeof screens

const fonts = {
  monospace: "'Lucida Console', Monaco, 'Courier New', Courier, monospace",
  sansSerif: 'Asap, System, sans-serif',
}

const { colors } = light

const theme = {
  colorsDeprecated,
  colors,
  fonts,
  space,
  screens,
  radii,
}
/* eslint-enable sort-keys */

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

/**
 * Will extend theme with new theme properties
 * @param {typeof theme} baseTheme the theme you want to extend from, by default it is set to light theme
 * @param {RecursivePartial<typeof theme>} extendedTheme the properties of a new theme you want to apply from baseTheme
 */
const extendTheme = ({
  baseTheme = theme,
  extendedTheme,
}: {
  baseTheme?: typeof theme
  extendedTheme: RecursivePartial<typeof theme>
}) => deepmerge(baseTheme, extendedTheme)

const darkTheme = extendTheme({
  extendedTheme: { colors: dark.colors },
})

type SCWUITheme = typeof theme & {
  linkComponent?: unknown
}

type Color = keyof typeof theme.colors

export type { SCWUITheme, Color }

export {
  colors,
  colorsDeprecated,
  space,
  radii,
  fonts,
  screens,
  extendTheme,
  darkTheme,
}

export default theme
