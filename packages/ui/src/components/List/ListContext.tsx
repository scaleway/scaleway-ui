import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type {
  ChangeEvent,
  ComponentProps,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
} from 'react'
import type { Checkbox } from '../Checkbox'
import type { ColumnProps } from './types'

type RowState = Record<string | number, boolean>

export type ListContextValue = {
  // ============ Expandable logic ============
  /**
   * @returns an unregister function
   * */
  registerExpandableRow: (rowId: string, expanded?: boolean) => () => void
  expandedRowIds: RowState
  expandRow: (rowId: string) => void
  collapseRow: (rowId: string) => void
  expandButton: boolean // Indicate if list has dedicated column for a CTA which expand row (in addition of expandable behavior)
  // ============ Selectable logic ============
  /**
   * @returns an unregister function
   * */
  registerSelectableRow: (rowId: string) => () => void
  allRowSelectValue: ComponentProps<typeof Checkbox>['checked']
  selectAllHandler: (event: ChangeEvent<HTMLInputElement>) => void
  subscribeHandler: () => void
  columns: ColumnProps[]
  inRange: Set<number | string>
  selectable: boolean
  selectAll: () => void
  selectedRowIds: RowState
  selectRow: (rowId: string) => void
  unselectAll: () => void
  unselectRow: (rowId: string) => void
  refList: RefObject<HTMLInputElement[]>
}

const ListContext = createContext<ListContextValue | undefined>(undefined)

export type ListProviderProps = {
  children: ReactNode
  autoCollapse: boolean
  selectable: boolean
  expandButton: boolean
  onSelectedChange?: Dispatch<SetStateAction<string[]>>
  columns: ColumnProps[]
}

const checkStateOfCheckboxs = (ids: RowState) => {
  const selectableRowCount = Object.keys(ids).length
  const selectableValuesCount = new Set(Object.values(ids))

  if (!selectableRowCount) {
    return false
  }

  // if there is one value it's meant that all checkboxes are only true or false
  if (selectableValuesCount.size === 1) {
    return [...selectableValuesCount][0]
  }

  return 'indeterminate'
}

export const ListProvider = ({
  children,
  autoCollapse,
  selectable,
  expandButton,
  onSelectedChange,
  columns,
}: ListProviderProps) => {
  const [expandedRowIds, setExpandedRowIds] = useState<RowState>({})
  const [selectedRowIds, setSelectedRowIds] = useState<RowState>({})
  const [lastCheckedCheckbox, setLastCheckedCheckbox] = useState<string>()
  const [inRange, setInRange] = useState<Set<number | string>>(new Set([]))
  const refList = useRef<HTMLInputElement[]>([])

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

  const registerSelectableRow = useCallback((rowId: string) => {
    setSelectedRowIds(current => ({ ...current, [rowId]: false }))

    return () => {
      setSelectedRowIds(current => {
        const { [rowId]: relatedId, ...otherIds } = current

        return otherIds
      })
    }
  }, [])

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

  const allRowSelectValue = useMemo<ComponentProps<typeof Checkbox>['checked']>(
    () => checkStateOfCheckboxs(selectedRowIds),
    [selectedRowIds],
  )
  const selectRows = useCallback(
    (rowIds: string[], state: boolean) => {
      const newSelectedRowIds = rowIds.reduce<RowState>(
        (acc, rowId) => ({ ...acc, [rowId]: state }),
        selectedRowIds,
      )
      setSelectedRowIds(newSelectedRowIds)
      if (onSelectedChange) {
        onSelectedChange(
          Object.keys(newSelectedRowIds).filter(row => newSelectedRowIds[row]),
        )
      }
    },
    [onSelectedChange, selectedRowIds],
  )

  const selectAll = useCallback(() => {
    selectRows(Object.keys(selectedRowIds), true)
  }, [selectRows, selectedRowIds])

  const unselectAll = useCallback(() => {
    selectRows(Object.keys(selectedRowIds), false)
  }, [selectRows, selectedRowIds])

  const selectRow = useCallback(
    (rowId: string) => {
      selectRows([rowId], true)
    },
    [selectRows],
  )

  const unselectRow = useCallback(
    (rowId: string) => {
      selectRows([rowId], false)
    },
    [selectRows],
  )

  const selectAllHandler: ListContextValue['selectAllHandler'] =
    useCallback(() => {
      // we choose to unselect all when checkbox is in indeterminate state
      if (
        allRowSelectValue &&
        [true, 'indeterminate'].includes(allRowSelectValue)
      ) {
        unselectAll()
      }
      if (allRowSelectValue === false) {
        selectAll()
      }
    }, [allRowSelectValue, unselectAll, selectAll])

  const subscribeHandler = useCallback(() => {
    const handlers: (() => void)[] = []

    if (refList.current) {
      // Ensure that only existing checkboxes are in refList
      if (refList.current) {
        refList.current = refList.current.filter(checkbox =>
          document.contains(checkbox),
        )
      }
      const handleClickRange = (
        currentCheckbox: HTMLInputElement,
        index: number,
        isShiftPressed: boolean,
      ) => {
        if (isShiftPressed) {
          const checkboxesInRange: string[] = []

          // Get the index of the lastCheckedCheckbox
          const targetCheckbox = refList.current.find(
            checkbox => checkbox.value === lastCheckedCheckbox,
          )
          const lastCheckedIndex = targetCheckbox
            ? refList.current.indexOf(targetCheckbox)
            : undefined

          if (lastCheckedIndex !== undefined) {
            const start = Math.min(lastCheckedIndex, index)
            const end =
              Math.max(lastCheckedIndex, index) +
              (Math.max(lastCheckedIndex, index) === index ? 0 : 1)

            refList.current.forEach((checkbox, key) => {
              if (start < key && key < end) {
                if (!checkbox.disabled) {
                  checkboxesInRange.push(checkbox.value)
                }
              }
            })

            selectRows(checkboxesInRange, currentCheckbox.checked) //  (un)selects the rows in the range
            setLastCheckedCheckbox(currentCheckbox.value)
          }
        } else if (index === 0) setLastCheckedCheckbox(undefined)

        /**
         * Handle the case when there is multiple selected value during a time, and the user click without shift event
         */
        setTimeout(() => {
          // clean up
          setInRange(new Set([]))
          setLastCheckedCheckbox(currentCheckbox.value)
        }, 1)
      }

      const handleOnChange = (checkbox: HTMLInputElement) => {
        const shouldHandleEvent = inRange.size === 0

        if (shouldHandleEvent) {
          selectRows([checkbox.value], !checkbox.checked)
        }
        setLastCheckedCheckbox(checkbox.value)
      }

      refList.current.forEach((checkbox, index) => {
        function clickHandler(this: HTMLInputElement, event: MouseEvent) {
          handleClickRange(this, index, event.shiftKey)
        }

        function changeHandler(this: HTMLInputElement) {
          handleOnChange(this)
        }

        checkbox.addEventListener('change', changeHandler)
        checkbox.addEventListener('click', clickHandler)

        handlers.push(() => {
          checkbox.removeEventListener('change', changeHandler)
          checkbox.removeEventListener('click', clickHandler)
        })
      })
    }

    return () => {
      handlers.forEach(cleanup => cleanup())
    }
  }, [inRange.size, lastCheckedCheckbox, selectRows])

  useEffect(subscribeHandler, [subscribeHandler])

  const value = useMemo<ListContextValue>(
    () => ({
      allRowSelectValue,
      selectAllHandler,
      subscribeHandler,
      collapseRow,
      columns,
      expandButton,
      expandedRowIds,
      expandRow,
      inRange,
      registerExpandableRow,
      registerSelectableRow,
      selectable,
      selectAll,
      selectedRowIds,
      selectRow,
      unselectAll,
      unselectRow,
      refList,
    }),
    [
      allRowSelectValue,
      selectAllHandler,
      subscribeHandler,
      collapseRow,
      columns,
      expandButton,
      expandedRowIds,
      expandRow,
      inRange,
      refList,
      registerExpandableRow,
      registerSelectableRow,
      selectable,
      selectAll,
      selectedRowIds,
      selectRow,
      unselectAll,
      unselectRow,
    ],
  )

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>
}

export const useListContext = () => {
  const context = useContext(ListContext)
  if (!context) {
    throw new Error('useListContext should be used inside a List component')
  }

  return context
}
