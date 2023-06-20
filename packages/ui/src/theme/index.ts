import { consoleDarkTheme, consoleLightTheme } from '@ultraviolet/themes'
import deepmerge from 'deepmerge'

export type ScreenSize = keyof typeof consoleLightTheme.screens

type SCWUITheme = typeof consoleLightTheme

const { colors, shadows, typography, space, radii, screens } = consoleLightTheme

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

/**
 * Will extend theme with new theme properties
 * @param {SCWUITheme} baseTheme the theme you want to extend from, by default it is set to light theme
 * @param {RecursivePartial<SCWUITheme>} extendedTheme the properties of a new theme you want to apply from baseTheme
 */
const extendTheme = (extendedTheme: RecursivePartial<SCWUITheme>) =>
  deepmerge(consoleLightTheme, extendedTheme) as SCWUITheme

// This type exclude overlay and secondary color
type Color = Extract<
  keyof typeof consoleLightTheme.colors,
  'primary' | 'neutral' | 'success' | 'danger' | 'warning' | 'info'
>

const SENTIMENTS = [
  'primary',
  'neutral',
  'success',
  'danger',
  'warning',
  'info',
] as const

const SENTIMENTS_WITHOUT_NEUTRAL = SENTIMENTS.filter(
  sentiment => sentiment !== 'neutral',
)

export type { SCWUITheme, Color }

export {
  colors,
  shadows,
  space,
  radii,
  screens,
  consoleDarkTheme as darkTheme,
  extendTheme,
  SENTIMENTS,
  SENTIMENTS_WITHOUT_NEUTRAL,
  typography,
}

export default consoleLightTheme
