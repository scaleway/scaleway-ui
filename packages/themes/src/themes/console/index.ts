import deepmerge from 'deepmerge'
import { darkTheme } from './dark'
import { darkerTheme } from './darker'
import { deprecatedDarkTokens } from './deprecated/dark'
import { deprecatedDarkerTokens } from './deprecated/darker'
import { deprecatedLightTokens } from './deprecated/light'
import { lightTheme } from './light'

const screens = {
  xsmall: 0,
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
}

export const consoleLightTheme = {
  screens,
  ...(deepmerge(lightTheme, deprecatedLightTokens) as typeof lightTheme &
    typeof deprecatedLightTokens),
}

export const consoleDarkTheme = {
  screens,
  ...(deepmerge(darkTheme, deprecatedDarkTokens) as typeof darkTheme &
    typeof deprecatedDarkTokens),
}

export const consoleDarkerTheme = {
  screens,
  ...(deepmerge(darkerTheme, deprecatedDarkerTokens) as typeof darkerTheme &
    typeof deprecatedDarkerTokens),
}
