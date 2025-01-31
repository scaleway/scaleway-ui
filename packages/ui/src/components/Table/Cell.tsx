import styled from '@emotion/styled'
import type { ReactNode } from 'react'

type Sentiment = 'success' | 'info' | 'warning' | 'danger' | 'neutral'

type Align = 'left' | 'center' | 'right'

const StyledCell = styled('td', {
  shouldForwardProp: prop => !['sentiment', 'align'].includes(prop),
})<{ sentiment?: Sentiment; align: Align }>`
  display: table-cell;
  vertical-align: middle;
  padding: ${({ theme }) => theme.space['1']};
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
  background-color: ${({ sentiment, theme }) => (sentiment ? theme.colors[sentiment].background : null)};
  text-align: ${({ align }) => align};
`

type CellProps = {
  children?: ReactNode
  className?: string
  colSpan?: number
  rowSpan?: number
  sentiment?: Sentiment
  align?: Align
}

export const Cell = ({
  children,
  className,
  colSpan,
  rowSpan,
  sentiment,
  align = 'left',
}: CellProps) => (
  <StyledCell
    className={className}
    colSpan={colSpan}
    rowSpan={rowSpan}
    sentiment={sentiment}
    align={align}
  >
    {children}
  </StyledCell>
)
