import styled from '@emotion/styled'
import { CSSProperties, ReactNode } from 'react'
import { SCWUITheme } from '../../theme'

type StackProps = {
  gap?: keyof SCWUITheme['space']
  direction?: 'row' | 'column'
  alignItems?: CSSProperties['alignItems']
  justifyContent?: CSSProperties['justifyContent']
  className?: string
  children: ReactNode
}

const Stack = styled('div', {
  shouldForwardProp: prop =>
    !['gap', 'direction', 'alignItems', 'justifyContent'].includes(prop),
})<StackProps>`
  display: flex;

  ${({
    theme,
    gap = 0,
    direction = 'column',
    alignItems = 'normal',
    justifyContent = 'normal',
  }) => `
    gap: ${theme.space[gap]};
    flex-direction: ${direction};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
  `}
`

export default Stack
