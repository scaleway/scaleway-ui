import type { UltravioletUITheme } from '@ultraviolet/ui'

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface Theme extends UltravioletUITheme {}
}
