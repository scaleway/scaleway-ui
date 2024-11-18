import type { ComponentProps, ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { Checkbox } from '../Checkbox'

type RowState = Record<string, boolean>

type TableContextValue = {
  bordered: boolean
  stripped: boolean
  // ============ Selectable logic ============
  selectedRowIds: RowState
  selectRow: (rowId: string) => void
  unselectRow: (rowId: string) => void
  selectable: boolean
  allRowSelectValue: ComponentProps<typeof Checkbox>['checked']
  selectAll: () => void
  unselectAll: () => void
  /**
   * @returns an unregister function
   * */
  registerSelectableRow: (rowId: string) => () => void
  // ============ Expandable logic ============
  expandedRowIds: RowState
  expandRow: (rowId: string) => void
  collapseRow: (rowId: string) => void
  expandButton: boolean
  registerExpandableRow: (rowId: string, expanded?: boolean) => () => void
}

const TableContext = createContext<TableContextValue | undefined>(undefined)

type TableProviderProps = {
  children: ReactNode
  selectable: boolean
  bordered: boolean
  stripped: boolean
  expandButton: boolean
  autoCollapse: boolean
}

export const TableProvider = ({
  children,
  selectable,
  bordered,
  stripped,
  expandButton,
  autoCollapse,
}: TableProviderProps) => {
  const [selectedRowIds, setSelectedRowIds] = useState<RowState>({})
  const [expandedRowIds, setExpandedRowIds] = useState<RowState>({})

  const registerExpandableRow = useCallback(
    (rowId: string, expanded = false) => {
      setExpandedRowIds(current => ({ ...current, [rowId]: expanded }))

      return () => {
        setExpandedRowIds(current => {
          const { [rowId]: relatedId, ...otherIds } = current

          return otherIds
        })
      }
    },
    [],
  )

  const expandRow = useCallback(
    (rowId: string) => {
      setExpandedRowIds(current => ({
        ...(autoCollapse ? {} : current),
        [rowId]: true,
      }))
    },
    [autoCollapse],
  )

  const collapseRow = useCallback((rowId: string) => {
    setExpandedRowIds(current => ({
      ...current,
      [rowId]: false,
    }))
  }, [])

  const registerSelectableRow = useCallback((rowId: string) => {
    setSelectedRowIds(current => ({ ...current, [rowId]: false }))

    return () => {
      setSelectedRowIds(current => {
        const { [rowId]: relatedId, ...otherIds } = current

        return otherIds
      })
    }
  }, [])

  const allRowSelectValue = useMemo<
    ComponentProps<typeof Checkbox>['checked']
  >(() => {
    const selectableRowCount = Object.keys(selectedRowIds).length
    if (!selectableRowCount) {
      return false
    }

    const selectedRowCount = Object.values(selectedRowIds).reduce<number>(
      (acc, isSelected) => acc + (isSelected ? 1 : 0),
      0,
    )
    if (selectedRowCount === 0) {
      return false
    }
    if (selectableRowCount === selectedRowCount) {
      return true
    }

    return 'indeterminate'
  }, [selectedRowIds])

  const selectAll = useCallback(() => {
    setSelectedRowIds(current =>
      Object.keys(current).reduce<typeof selectedRowIds>(
        (acc, rowId) => ({ ...acc, [rowId]: true }),
        {},
      ),
    )
  }, [])

  const unselectAll = useCallback(() => {
    setSelectedRowIds(current =>
      Object.keys(current).reduce<typeof selectedRowIds>(
        (acc, rowId) => ({ ...acc, [rowId]: false }),
        {},
      ),
    )
  }, [])

  const selectRow = useCallback((rowId: string) => {
    setSelectedRowIds(current => ({
      ...current,
      [rowId]: true,
    }))
  }, [])

  const unselectRow = useCallback((rowId: string) => {
    setSelectedRowIds(current => ({
      ...current,
      [rowId]: false,
    }))
  }, [])

  const [lastCheckedIndex, setLastCheckedIndex] = useState<null | number>(null)

  // Multiselect with shift key
  useEffect(() => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      '[name="table-select-checkbox"]',
    )
    const handlers: (() => void)[] = []

    const handleClick = (
      index: number,
      isShiftPressed: boolean,
      checked: boolean,
    ) => {
      setLastCheckedIndex(index)
      if (isShiftPressed && lastCheckedIndex !== null) {
        const start = Math.min(lastCheckedIndex, index)
        const end = Math.max(lastCheckedIndex, index)

        for (let i = start; i <= end; i += 1) {
          const checkboxId = checkboxes[i].value
          if (!checkboxes[i].disabled) {
            if (checked) {
              unselectRow(checkboxId)
            } else {
              selectRow(checkboxId)
            }
          }
        }
      }
    }

    checkboxes.forEach((checkbox, index) => {
      const clickHandler = (event: MouseEvent) =>
        handleClick(
          index,
          event.shiftKey,
          selectedRowIds[(event.target as HTMLInputElement).value],
        )
      checkbox.addEventListener('click', clickHandler)

      handlers.push(() => checkbox.removeEventListener('click', clickHandler))
    })

    return () => {
      handlers.forEach(cleanup => cleanup())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastCheckedIndex, selectedRowIds])

  const value = useMemo<TableContextValue>(
    () => ({
      registerSelectableRow,
      selectedRowIds,
      selectRow,
      unselectRow,
      selectable,
      selectAll,
      unselectAll,
      allRowSelectValue,
      bordered,
      stripped,
      expandButton,
      expandRow,
      expandedRowIds,
      collapseRow,
      registerExpandableRow,
    }),
    [
      registerSelectableRow,
      selectedRowIds,
      selectRow,
      unselectRow,
      selectable,
      selectAll,
      unselectAll,
      allRowSelectValue,
      bordered,
      stripped,
      expandedRowIds,
      expandRow,
      expandButton,
      collapseRow,
      registerExpandableRow,
    ],
  )

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

export const useTableContext = () => {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTableContext should be used inside a Table component')
  }

  return context
}
