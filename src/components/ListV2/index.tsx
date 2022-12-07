import styled from '@emotion/styled'
import { ComponentProps, ReactNode } from 'react'
import { ListBody } from './ListBody'
import { ListCell } from './ListCell'
import { ListProvider } from './ListContext'
import { ListExpandable } from './ListExpandable'
import { ListHeader } from './ListHeader'
import { ListHeaderRow } from './ListHeaderRow'
import { ListHeaders } from './ListHeaders'
import { ListLoadingPlaceholder } from './ListLoadingPlaceholder'
import { ListRow } from './ListRow'

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['1']};
`

type ListColumn = Omit<
  ComponentProps<typeof ListHeader>,
  'children' | 'colSpan'
> & {
  label: ReactNode
  width?: string
  id?: string
}

type ListProps<T> = {
  children: ReactNode
  /**
   * Add checkboxes on the list
   * */
  selectable?: boolean
  /**
   * Row ids of the selected checkboxes
   * */
  selectedIds?: string[]
  /**
   * When selectedIds change
   * */
  onSelectedIdsChange?: (selectedIds: string[]) => void
  data: T[]
  /**
   * The idKey of each data entry
   * */
  idKey?: string
  /**
   * Set it to true if you want to display a placeholder during loading
   * */
  isLoading?: boolean
  /**
   * Auto close opened expandable row when another is opening
   * */
  autoClose?: boolean

  columns?: ListColumn[]
  template?: string
}

export const List = <
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  children,
  columns,
  template,
  selectable,
  selectedIds,
  onSelectedIdsChange,
  data,
  idKey,
  isLoading,
  autoClose,
}: ListProps<T>) => {
  if (columns) {
    const computedTemplate = columns
      .map(({ width }) => width ?? '1fr')
      .join(' ')

    return (
      <ListProvider
        autoClose={autoClose}
        template={computedTemplate}
        selectable={selectable}
        data={data}
        idKey={idKey}
        selectedIds={selectedIds}
        onSelectedIdsChange={onSelectedIdsChange}
      >
        <StyledTable role="table">
          <ListHeaders>
            <ListHeaderRow>
              {columns.map(({ label, onClick, sort, className, id }) => (
                <ListHeader
                  onClick={onClick}
                  sort={sort}
                  className={className}
                  key={id}
                  id={id}
                >
                  {label}
                </ListHeader>
              ))}
            </ListHeaderRow>
          </ListHeaders>
          {isLoading ? (
            <ListBody>
              <ListLoadingPlaceholder cols={columns.length} />
            </ListBody>
          ) : (
            children
          )}
        </StyledTable>
      </ListProvider>
    )
  }

  return (
    <ListProvider
      template={template}
      selectable={selectable}
      selectedIds={selectedIds}
      onSelectedIdsChange={onSelectedIdsChange}
      data={data}
    >
      <StyledTable role="table">
        {isLoading ? (
          <ListBody>
            <ListLoadingPlaceholder cols={template ? 1 : 12} />
          </ListBody>
        ) : (
          children
        )}
      </StyledTable>
    </ListProvider>
  )
}

List.Row = ListRow
List.Body = ListBody
List.Cell = ListCell
List.Headers = ListHeaders
List.HeaderRow = ListHeaderRow
List.Header = ListHeader
List.Placeholder = ListLoadingPlaceholder
List.Expandable = ListExpandable
