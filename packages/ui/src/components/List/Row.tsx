import styled from '@emotion/styled'
import type { ForwardedRef, ReactNode } from 'react'
import {
  Children,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
} from 'react'
import type { SENTIMENTS, space } from '../../theme'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Tooltip } from '../Tooltip'
import { Cell } from './Cell'
import { useListContext } from './ListContext'

const ExpandableWrapper = styled.tr`
  width: 100%;
  display: table-row;
  vertical-align: middle;
  cursor: auto;
  background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  border-radius: 0 0 ${({ theme }) => theme.radii.default} ${({ theme }) => theme.radii.default};
  transform: translate3d(0, -${({ theme }) => theme.space['2']}, 0);
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0; /* Adjust based on border width and spacing */
    left: 0;
    right: 0;
    bottom: 0; /* Adjust based on border width and spacing */
    border: 1px solid ${({ theme }) => theme.colors.neutral.border};
    border-top: none;
    border-radius: 0 0 ${({ theme }) => theme.radii.default} ${({ theme }) => theme.radii.default};
    pointer-events: none;
    transition:
      box-shadow 200ms ease,
      border-color 200ms ease;
  }
`

const StyledCheckbox = styled(Checkbox, {
  shouldForwardProp: prop => !['inRange'].includes(prop),
})<{ inRange: boolean }>`

    rect {
      ${({ theme, inRange }) => (inRange ? `fill: ${theme.colors.neutral.backgroundHover};stroke: ${theme.colors.neutral.borderHover};` : '')}
    }
`

export const StyledRow = styled('tr', {
  shouldForwardProp: prop => !['sentiment'].includes(prop),
})<{
  sentiment: (typeof SENTIMENTS)[number]
}>`
  /* List itself also apply style about common templating between HeaderRow and other Rows */

  display: table-row;
  vertical-align: middle;
  position: relative;
  box-shadow: none;
  background-color: ${({ theme }) => theme.colors.neutral.background};
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
  column-gap: ${({ theme }) => theme.space['2']};

  &[role='button row'] {
    cursor: pointer;
  }

  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0; /* Adjust based on border width and spacing */
    left: 0;
    right: 0;
    bottom: 0; /* Adjust based on border width and spacing */
    border: 1px solid ${({ theme }) => theme.colors.neutral.border};
    border-radius: ${({ theme }) => theme.radii.default};
    pointer-events: none;
    transition:
      box-shadow 200ms ease,
      border-color 200ms ease;
  }

  &:hover::before {
    border-color: ${({ theme }) => theme.colors.primary.border};
  }

  &:hover + ${ExpandableWrapper}:before {
    border-color: ${({ theme }) => theme.colors.primary.border};
  }

  &[aria-expanded='true']:before {
    border-radius: ${({ theme }) => theme.radii.default} ${({ theme }) => theme.radii.default} 0 0;
    border-bottom-color: ${({ theme }) => theme.colors.neutral.border};
  }

  ${({ theme, sentiment }) =>
    `
    color: ${theme.colors[sentiment].text};
    border-color: ${theme.colors[sentiment].border};
    background-color: ${theme.colors[sentiment].background};
    & [data-expandable-content] {
      border-color: ${theme.colors[sentiment].border};
    }

    ${
      sentiment === 'neutral'
        ? `&:hover {
          border-color: ${theme.colors.primary.border};
          box-shadow: ${theme.shadows.hoverPrimary};
        }
        `
        : ''
    }
  `}

  &[data-highlight='true'] {
    border-color: ${({ theme }) => theme.colors.primary.border};
    box-shadow: ${({ theme }) => theme.shadows.hoverPrimary};
  }

  &[aria-disabled='true'] {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
    cursor: not-allowed;
  }
`

const StyledCheckboxContainer = styled.div`
  display: flex;
`

const NoPaddingCell = styled(Cell)`
  padding: 0;

  &:first-of-type {
    padding-left: ${({ theme }) => theme.space['2']};
  }
`

const ExpandableCell = styled(Cell, {
  shouldForwardProp: prop => !['padding'].includes(prop),
})<{ padding?: keyof typeof space }>`
  padding: ${({ theme, padding }) => (padding ? theme.space[padding] : theme.space['2'])};
`

type RowProps = {
  children: ReactNode
  id: string
  expandable?: ReactNode
  /**
   * Row cannot be selected if this prop is provided. boolean true disabled selection, a string disable selection and a tooltip will be displayed on checkbox hover.
   * */
  selectDisabled?: boolean | string
  disabled?: boolean
  sentiment?: (typeof SENTIMENTS)[number]
  expanded?: boolean
  className?: string
  /**
   * Define a custom padding for the content in the expandable
   */
  expandablePadding?: keyof typeof space
  'data-testid'?: string
}

export const Row = forwardRef(
  (
    {
      children,
      id,
      expandable,
      disabled,
      selectDisabled,
      sentiment = 'neutral',
      expanded,
      className,
      expandablePadding,
      'data-testid': dataTestid,
    }: RowProps,
    ref: ForwardedRef<HTMLTableRowElement>,
  ) => {
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
      refList,
      inRange,
    } = useListContext()

    const expandedRowId = useId()

    const checkboxRef = useRef<HTMLInputElement>(null)

    const isSelectDisabled =
      disabled || (selectDisabled !== undefined && selectDisabled !== false)

    const hasExpandable = !!expandable
    useEffect(() => {
      if (hasExpandable) {
        const unregisterCallback = registerExpandableRow(id, expanded)

        return unregisterCallback
      }

      return undefined
    }, [id, hasExpandable, registerExpandableRow, expanded, expandRow])

    useEffect(() => {
      if (!isSelectDisabled) {
        const unregisterCallback = registerSelectableRow(id)

        return unregisterCallback
      }

      return undefined
    }, [id, registerSelectableRow, isSelectDisabled])

    const toggleRowExpand = useCallback(() => {
      if (expandedRowIds[id]) {
        collapseRow(id)
      } else {
        expandRow(id)
      }
    }, [collapseRow, expandRow, expandedRowIds, id])

    const canClickRowToExpand = !disabled && !!expandable && !expandButton

    useEffect(() => {
      const refAtEffectStart = refList.current
      const { current } = checkboxRef

      if (refAtEffectStart && current && !refAtEffectStart.includes(current)) {
        refList.current.push(current)
      }
    }, [refList])

    const childrenLength =
      Children.count(children) + (selectable ? 1 : 0) + (expandButton ? 1 : 0)

    return (
      <>
        <StyledRow
          className={className}
          ref={ref}
          role={canClickRowToExpand ? 'button row' : undefined}
          onClick={canClickRowToExpand ? toggleRowExpand : undefined}
          onKeyDown={
            canClickRowToExpand
              ? event => {
                  if (event.key === ' ') {
                    toggleRowExpand()
                    event.preventDefault()
                  }
                }
              : undefined
          }
          tabIndex={canClickRowToExpand ? 0 : -1}
          sentiment={sentiment}
          aria-disabled={disabled}
          aria-expanded={expandable ? expandedRowIds[id] : undefined}
          aria-controls={
            expandable && expandedRowIds[id] ? expandedRowId : undefined
          }
          data-highlight={selectable && !!selectedRowIds[id]}
          data-testid={dataTestid}
        >
          {selectable ? (
            <NoPaddingCell preventClick={canClickRowToExpand}>
              <StyledCheckboxContainer>
                <Tooltip
                  text={
                    typeof selectDisabled === 'string'
                      ? selectDisabled
                      : undefined
                  }
                >
                  <StyledCheckbox
                    name="list-select-checkbox"
                    aria-label="select"
                    checked={selectedRowIds[id]}
                    value={id}
                    ref={checkboxRef}
                    onChange={() => {
                      if (selectedRowIds[id]) {
                        unselectRow(id)
                      } else {
                        selectRow(id)
                      }
                    }}
                    disabled={isSelectDisabled}
                    inRange={inRange.includes(id)}
                  />
                </Tooltip>
              </StyledCheckboxContainer>
            </NoPaddingCell>
          ) : null}
          {expandButton ? (
            <NoPaddingCell>
              <Button
                disabled={disabled || !expandable}
                icon={expandedRowIds[id] ? 'arrow-up' : 'arrow-down'}
                onClick={toggleRowExpand}
                size="small"
                sentiment={sentiment}
                variant="ghost"
                aria-label="expand"
                data-testid="list-expand-button"
              />
            </NoPaddingCell>
          ) : null}
          {children}
        </StyledRow>
        {expandable && expandedRowIds[id] ? (
          <ExpandableWrapper
            id={expandedRowId}
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
            <ExpandableCell
              colSpan={childrenLength}
              padding={expandablePadding}
            >
              {expandable}
            </ExpandableCell>
          </ExpandableWrapper>
        ) : null}
      </>
    )
  },
)
