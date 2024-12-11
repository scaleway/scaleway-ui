import type { Theme } from '@emotion/react'
import { keyframes, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Children, useCallback, useEffect, useRef } from 'react'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Tooltip } from '../Tooltip'
import { Cell } from './Cell'
import { useTableContext } from './TableContext'
import { SELECTABLE_CHECKBOX_SIZE } from './constants'
import type { ColumnProps } from './types'

const ExpandableWrapper = styled.tr`
  width: 100%;
  display: table-row;
  vertical-align: middle;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.border};
  padding: ${({ theme }) => theme.space['1']};
  cursor: auto;
  background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  border-radius: 0 0 ${({ theme }) => theme.radii.default} ${({ theme }) => theme.radii.default};
`

const StyledCheckboxContainer = styled.div`
  display: flex;
  width: ${({ theme }) => theme.sizing[SELECTABLE_CHECKBOX_SIZE]};
`

const StyledCheckbox = styled(Checkbox, {
  shouldForwardProp: prop => !['inRange'].includes(prop),
})<{ inRange: boolean }>`

    rect {
      ${({ theme, inRange }) => (inRange ? `fill: ${theme.colors.neutral.backgroundHover};stroke: ${theme.colors.neutral.borderHover};` : '')}
    }
`

// We start at 5% and finish at 80% to leave the original background color
// as we can't know if the table will be stripped or not
const colorChange = (theme: Theme) => keyframes`
  5% {
    background-color: ${theme.colors.primary.background};
  }
  80% {
    background-color: ${theme.colors.primary.background};
  }
`

const StyledTr = styled('tr', {
  shouldForwardProp: prop => !['highlightAnimation', 'columns'].includes(prop),
})<{ highlightAnimation?: boolean; columns: ColumnProps[] }>`
  animation: ${({ highlightAnimation, theme }) =>
    highlightAnimation ? colorChange(theme) : undefined}
    3s linear;

  ${({ columns }) =>
    columns.map(
      (column, index) => `
    td:nth-of-type(${index + 1}) {
      ${column.width ? `width: ${column.width};` : ''}
      ${column.minWidth ? `min-width: ${column.minWidth};` : ''}
      ${column.maxWidth ? `max-width: ${column.maxWidth};` : ''}
    }
  `,
    )}
`

const NoPaddingCell = styled(Cell, {
  shouldForwardProp: prop => !['maxWidth'].includes(prop),
})<{ maxWidth?: string }>`
  padding: 0;

  &:first-of-type {
    padding-left: ${({ theme }) => theme.space['2']};
  }

  max-width: ${({ maxWidth }) => maxWidth};
`

type RowProps = {
  children: ReactNode
  expandable?: ReactNode
  className?: string
  id: string
  'data-testid'?: string
  /**
   * Row cannot be selected if this prop is provided. boolean true disabled selection, a string disable selection and a tooltip will be displayed on checkbox hover.
   * */
  selectDisabled?: boolean | string
  highlightAnimation?: boolean
  expanded?: boolean
}

export const Row = ({
  children,
  className,
  id,
  selectDisabled,
  highlightAnimation,
  expandable,
  expanded,
  'data-testid': dataTestid,
}: RowProps) => {
  const {
    selectable,
    registerExpandableRow,
    expandedRowIds,
    expandRow,
    collapseRow,
    registerSelectableRow,
    selectedRowIds,
    selectRow,
    unselectRow,
    expandButton,
    ref,
    inRange,
    columns,
  } = useTableContext()
  const rowRef = useRef<HTMLInputElement>(null)

  const hasExpandable = !!expandable
  useEffect(() => {
    if (hasExpandable) {
      const unregisterCallback = registerExpandableRow(id, expanded)

      return unregisterCallback
    }

    return undefined
  }, [id, hasExpandable, registerExpandableRow, expanded, expandRow])

  useEffect(() => {
    if (!selectDisabled) {
      const unregisterCallback = registerSelectableRow(id)

      return unregisterCallback
    }

    return undefined
  }, [id, registerSelectableRow, selectDisabled])

  const toggleRowExpand = useCallback(() => {
    if (expandedRowIds[id]) {
      collapseRow(id)
    } else {
      expandRow(id)
    }
  }, [collapseRow, expandRow, expandedRowIds, id])

  const canClickRowToExpand = hasExpandable && !expandButton

  useEffect(() => {
    const refAtEffectStart = ref.current
    const { current } = rowRef

    if (refAtEffectStart && current && !refAtEffectStart.includes(current)) {
      ref.current.push(current)
    }
  }, [ref])

  const theme = useTheme()

  const childrenLength =
    Children.count(children) + (selectable ? 1 : 0) + (expandButton ? 1 : 0)

  return (
    <>
      <StyledTr
        className={className}
        data-testid={dataTestid}
        highlightAnimation={highlightAnimation}
        role={canClickRowToExpand ? 'button row' : 'row'}
        columns={columns}
      >
        {selectable ? (
          <NoPaddingCell maxWidth={theme.sizing[SELECTABLE_CHECKBOX_SIZE]}>
            <StyledCheckboxContainer>
              <Tooltip
                text={
                  typeof selectDisabled === 'string'
                    ? selectDisabled
                    : undefined
                }
              >
                <StyledCheckbox
                  name="table-select-checkbox"
                  aria-label="select"
                  checked={selectedRowIds[id]}
                  value={id}
                  onChange={() => {
                    if (selectedRowIds[id]) {
                      unselectRow(id)
                    } else {
                      selectRow(id)
                    }
                  }}
                  disabled={selectDisabled !== undefined}
                  ref={rowRef}
                  inRange={inRange.includes(id)}
                />
              </Tooltip>
            </StyledCheckboxContainer>
          </NoPaddingCell>
        ) : null}
        {expandButton ? (
          <NoPaddingCell>
            <Button
              disabled={!expandable}
              icon={expandedRowIds[id] ? 'arrow-up' : 'arrow-down'}
              onClick={toggleRowExpand}
              size="xsmall"
              sentiment="neutral"
              variant="ghost"
              aria-label="expand"
              data-testid="list-expand-button"
            />
          </NoPaddingCell>
        ) : null}
        {children}
      </StyledTr>
      {expandable && expandedRowIds[id] ? (
        <ExpandableWrapper
          data-expandable-content
          onClick={
            canClickRowToExpand
              ? e => {
                  e.stopPropagation()
                }
              : undefined
          }
          onKeyDown={
            canClickRowToExpand
              ? e => {
                  e.stopPropagation()
                }
              : undefined
          }
        >
          <Cell colSpan={childrenLength}>{expandable}</Cell>
        </ExpandableWrapper>
      ) : null}
    </>
  )
}
