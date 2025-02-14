import styled from '@emotion/styled'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import React, { forwardRef, useEffect, useState } from 'react'
import { Cell } from './Cell'
import { HeaderCell } from './HeaderCell'
import { HeaderRow } from './HeaderRow'
import { ListProvider, useListContext } from './ListContext'
import { Row } from './Row'
import { SelectBar } from './SelectBar'
import { SkeletonRows } from './SkeletonRows'
import type { ColumnProps } from './types'

const TableContainerStyle = styled.div`
  min-width: 100%;
  width: 100%;
  overflow-x: auto;
`

const StyledTable = styled.table`
  width: 100%;
  box-sizing: content-box;
  gap: ${({ theme }) => theme.space['1']};
  border-collapse: collapsed;
  border-spacing: 0 ${({ theme }) => theme.space['2']};
  position: relative;
`

// TODO: Get type optional type from omit values of ListContext
type ListProps = {
  expandable?: boolean
  selectable?: boolean
  columns: ColumnProps[]
  children: ReactNode
  /**
   * Set it to true if you want to display a placeholder during loading
   * */
  loading?: boolean
  /**
   * Auto collapse is collapsing expandable row when another is expanding
   * */
  autoCollapse?: boolean
  /**
   * Action when selection changes (get the list of selected rows)
   */
  onSelectedChange?: Dispatch<SetStateAction<string[]>>
}

const TableContainer = ({ children }: { children: ReactNode }) => {
  const [childrenMemory, setChildrenMemory] = useState<ReactNode[]>(
    React.Children.toArray(children),
  )

  const { setRefList } = useListContext()

  // Reset ref list when children change
  useEffect(() => {
    if (React.Children.toArray(children) !== childrenMemory) {
      setRefList([])
      setChildrenMemory(React.Children.toArray(children))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, setRefList])

  return <TableContainerStyle>{children}</TableContainerStyle>
}

const BaseList = forwardRef<HTMLTableElement, ListProps>(
  (
    {
      expandable = false,
      selectable = false,
      columns,
      children,
      loading,
      autoCollapse = false,
      onSelectedChange,
    },
    ref,
  ) => (
    <ListProvider
      selectable={selectable}
      expandButton={expandable}
      autoCollapse={autoCollapse}
      onSelectedChange={onSelectedChange}
      columns={columns}
    >
      <TableContainer>
        <StyledTable ref={ref}>
          <HeaderRow hasSelectAllColumn={selectable}>
            {columns.map((column, index) => (
              <HeaderCell
                key={`header-column-${index}`}
                isOrdered={column.isOrdered}
                orderDirection={column.orderDirection}
                onOrder={column.onOrder}
                info={column.info}
                width={column.width}
                minWith={column.minWidth}
                maxWidth={column.maxWidth}
              >
                {column.label}
              </HeaderCell>
            ))}
          </HeaderRow>
          <tbody>
            {loading ? (
              <SkeletonRows
                selectable={selectable}
                rows={5}
                cols={columns.length}
              />
            ) : (
              children
            )}
          </tbody>
        </StyledTable>
      </TableContainer>
    </ListProvider>
  ),
)

/**
 * List is a component that displays a list of items based on the columns you provide and the data you pass.
 */
export const List = Object.assign(BaseList, {
  Row,
  Cell,
  SelectBar,
  useListContext,
})
