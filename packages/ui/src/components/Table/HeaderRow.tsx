import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Checkbox } from '../Checkbox'
import { useTableContext } from './TableContext'
import { EXPANDABLE_COLUMN_SIZE, SELECTABLE_CHECKBOX_SIZE } from './constants'

type HeaderRowProps = {
  children: ReactNode
  hasSelectAllColumn: boolean
}

const SelectableHeaderCell = styled.th`
    padding-left: ${({ theme }) => theme.space['2']};

    width: ${({ theme }) => theme.sizing[SELECTABLE_CHECKBOX_SIZE]};
    min-width: ${({ theme }) => theme.sizing[SELECTABLE_CHECKBOX_SIZE]};
`

const ExpandableHeaderCell = styled('th', {
  shouldForwardProp: prop => !['nextToSelectableRow'].includes(prop),
})<{ nextToSelectableRow: boolean }>`
    padding-left: ${({ theme, nextToSelectableRow }) => theme.space[nextToSelectableRow ? '1' : '2']};

    width: ${({ theme }) => theme.sizing[EXPANDABLE_COLUMN_SIZE]};
    min-width: ${({ theme }) => theme.sizing[EXPANDABLE_COLUMN_SIZE]};
`

export const HeaderRow = ({ children, hasSelectAllColumn }: HeaderRowProps) => {
  const { allRowSelectValue, selectAllHandler, selectedRowIds, expandButton } =
    useTableContext()

  const selectableRowCount = Object.keys(selectedRowIds).length

  return (
    <tr role="row">
      {hasSelectAllColumn ? (
        <SelectableHeaderCell>
          <Checkbox
            name="table-select-all-checkbox"
            value="all"
            aria-label="select all"
            checked={allRowSelectValue}
            onChange={selectAllHandler}
            disabled={selectableRowCount === 0}
          />
        </SelectableHeaderCell>
      ) : null}
      {expandButton ? (
        <ExpandableHeaderCell nextToSelectableRow={hasSelectAllColumn}>
          {null}
        </ExpandableHeaderCell>
      ) : null}
      {children}
    </tr>
  )
}
