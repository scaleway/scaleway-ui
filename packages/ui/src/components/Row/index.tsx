import styled from '@emotion/styled'
import type { CSSProperties, ReactNode } from 'react'
import type { UltravioletUITheme } from '../../theme'

type StyledRowProps = Pick<
  RowProps,
  'gap' | 'templateColumns' | 'alignItems' | 'justifyContent'
>
export const StyledRow = styled('div', {
  shouldForwardProp: prop =>
    !['templateColumns', 'gap', 'alignItems', 'justifyContent'].includes(prop),
})<StyledRowProps>`
  display: grid;
  ${({
    theme,
    gap,
    alignItems = 'normal',
    templateColumns,
    justifyContent = 'normal',
  }) => `
    grid-template-columns: ${templateColumns};
    ${
      gap
        ? `gap: ${theme.space[gap as keyof UltravioletUITheme['space']]};`
        : ''
    }
    align-items: ${alignItems};
    justify-content: ${justifyContent};
  `}
`

type RowProps = {
  className?: string
  'data-testid'?: string
  children: ReactNode
  templateColumns: string
  gap?: keyof UltravioletUITheme['space'] | number
  alignItems?: CSSProperties['alignItems']
  justifyContent?: CSSProperties['justifyContent']
}

/**
 * Row component is a wrapper for grid layout.
 * @experimental This component is experimental and may be subject to breaking changes in the future.
 */
export const Row = ({
  className,
  'data-testid': dataTestId,
  children,
  templateColumns,
  alignItems,
  justifyContent,
  gap,
}: RowProps) => (
  <StyledRow
    className={className}
    data-testid={dataTestId}
    gap={gap}
    templateColumns={templateColumns}
    alignItems={alignItems}
    justifyContent={justifyContent}
  >
    {children}
  </StyledRow>
)
