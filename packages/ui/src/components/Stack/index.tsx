import styled from '@emotion/styled'
import type { CSSProperties, ReactNode } from 'react'
import type { SCWUITheme } from '../../theme'

type StackProps = {
  gap?: keyof SCWUITheme['space'] | number
  direction?: 'row' | 'column'
  alignItems?: CSSProperties['alignItems']
  justifyContent?: CSSProperties['justifyContent']
  wrap?: boolean | CSSProperties['flexWrap']
  width?: CSSProperties['width']
  flex?: CSSProperties['flex']
  className?: string
  children: ReactNode
  'data-testid'?: string
}

export const Stack = styled('div', {
  shouldForwardProp: prop =>
    !['gap', 'direction', 'alignItems', 'justifyContent', 'wrap'].includes(
      prop,
    ),
})<StackProps>`
  display: flex;

  ${({
    theme,
    gap = 0,
    direction = 'column',
    alignItems = 'normal',
    justifyContent = 'normal',
    wrap = 'nowrap',
    width,
    flex,
  }) => `
    gap: ${theme.space[gap as keyof SCWUITheme['space']]};
    flex-direction: ${direction};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    flex-wrap: ${typeof wrap === 'boolean' ? 'wrap' : wrap};
    ${flex ? `flex: ${flex};` : ''}
    ${width ? `width: ${width};` : ''}
  `}
`
