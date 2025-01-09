import { ThemeProvider } from '@emotion/react'
import { fireEvent, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import type { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
import { useState } from 'react'
import { describe, expect, test, vi } from 'vitest'
import { Table } from '..'
import defaultTheme from '../../../theme'

type WrapperProps = {
  theme?: typeof defaultTheme
  children: ReactNode
}

type FakeDataType = {
  id: string
  columnA: string
  columnB: string
  columnC: string
  columnD: string
  columnE: string
  columnF: string
}

const data: FakeDataType[] = Array.from(
  { length: 10 },
  (_, index) => index + 1,
).map(rowNum => ({
  id: `${rowNum}`,
  columnA: `Row ${rowNum} Column 1`,
  columnB: `Row ${rowNum} Column 2`,
  columnC: `Row ${rowNum} Column 3`,
  columnD: `Row ${rowNum} Column 4`,
  columnE: `Row ${rowNum} Column 5`,
  columnF: `Row ${rowNum} expandable content`,
}))

const columns: NonNullable<ComponentProps<typeof Table>['columns']> =
  Array.from({ length: 5 }, (_, index) => index + 1).map(columnNumber => ({
    label: `Column ${columnNumber}`,
    id: `${columnNumber}`,
    width: '100px',
    minWidth: '100px',
    maxWidth: '200px',
  }))

const Wrapper = ({ theme = defaultTheme, children }: WrapperProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

describe('Table', () => {
  test.skip('Should throw an error', () => {
    const consoleErrMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    expect(() =>
      renderWithTheme(
        data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
          <Table.Row key={id} id={id}>
            <Table.Cell>{columnA}</Table.Cell>
            <Table.Cell>{columnB}</Table.Cell>
            <Table.Cell>{columnC}</Table.Cell>
            <Table.Cell>{columnD}</Table.Cell>
            <Table.Cell>{columnE}</Table.Cell>
          </Table.Row>
        )),
      ),
    ).toThrow()
    expect(consoleErrMock).toHaveBeenCalled()
    consoleErrMock.mockRestore()
  })

  test('Should render correctly', () =>
    shouldMatchEmotionSnapshot(
      <Table columns={columns}>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} id={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    ))

  test('Should render correctly with loading', () =>
    shouldMatchEmotionSnapshot(
      <Table columns={columns} loading>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} id={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    ))

  test('Should render correctly with selectable then click on first row then uncheck all, then check all', async () => {
    const { asFragment } = renderWithTheme(
      <Table columns={columns} selectable>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} id={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
              <Table.SelectBar data={data} idKey="id">
                {({ selectedItems }) => <div>{selectedItems.length} items</div>}
              </Table.SelectBar>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    )
    const checkboxes = screen.getAllByRole<HTMLInputElement>('checkbox')

    const firstRowCheckbox = checkboxes.find(({ value }) => value === '1')
    const secondRowCheckbox = checkboxes.find(({ value }) => value === '2')
    const allCheckbox = checkboxes.find(({ value }) => value === 'all')
    expect(firstRowCheckbox).toBeInTheDocument()
    expect(allCheckbox).toBeInTheDocument()
    if (!firstRowCheckbox) {
      throw new Error('First checkbox is not defined')
    }
    if (!allCheckbox) {
      throw new Error('Select all checkbox is not defined')
    }
    await userEvent.click(firstRowCheckbox)
    expect(firstRowCheckbox).toBeChecked()
    await userEvent.click(firstRowCheckbox)
    expect(firstRowCheckbox).not.toBeChecked()
    await userEvent.click(firstRowCheckbox)
    //  mixed | indeterminated state
    await userEvent.click(allCheckbox)
    expect(firstRowCheckbox).not.toBeChecked()
    expect(allCheckbox).not.toBeChecked()
    await userEvent.click(allCheckbox)
    expect(firstRowCheckbox).toBeChecked()
    expect(secondRowCheckbox).toBeChecked()
    expect(allCheckbox).toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })

  test('Should render correctly with sort then click', async () => {
    const LocalControlValue = ({
      children,
    }: {
      children: ({
        value,
        setValue,
      }: {
        value: {
          columnIndex?: number
          order?: 'asc' | 'desc'
        }
        setValue: Dispatch<
          SetStateAction<{
            columnIndex?: number
            order?: 'asc' | 'desc'
          }>
        >
      }) => ReactNode
    }) => {
      const [value, setValue] = useState(
        {} as {
          columnIndex?: number
          order?: 'asc' | 'desc'
        },
      )

      return <div>{children({ value, setValue })}</div>
    }

    const { asFragment } = renderWithTheme(
      <LocalControlValue>
        {({ value, setValue }) => (
          <Table
            columns={columns.map((column, index) => ({
              ...column,
              isOrdered: value.columnIndex === index,
              orderDirection: value.order,
              onOrder: newOrder => {
                setValue({
                  columnIndex: index,
                  order: newOrder,
                })
              },
            }))}
          >
            <Table.Body>
              {data.map(
                ({ id, columnA, columnB, columnC, columnD, columnE }) => (
                  <Table.Row key={id} id={id}>
                    <Table.Cell>{columnA}</Table.Cell>
                    <Table.Cell>{columnB}</Table.Cell>
                    <Table.Cell>{columnC}</Table.Cell>
                    <Table.Cell>{columnD}</Table.Cell>
                    <Table.Cell>{columnE}</Table.Cell>
                  </Table.Row>
                ),
              )}
            </Table.Body>
          </Table>
        )}
      </LocalControlValue>,
    )
    const tableHeaderCells = screen.queryAllByRole<HTMLTableCellElement>(
      'button',
      {
        queryFallbacks: true,
      },
    )
    expect(tableHeaderCells).toHaveLength(columns.length)
    if (tableHeaderCells[0] && tableHeaderCells[1]) {
      expect(tableHeaderCells[0]?.getAttribute('aria-sort')).toBe(null)
      await userEvent.click(tableHeaderCells[0])
      expect(tableHeaderCells[0]?.getAttribute('aria-sort')).toBe('ascending')
      if (tableHeaderCells[0]) {
        fireEvent.keyDown(tableHeaderCells[0], { key: 'Enter' })
      }
      expect(tableHeaderCells[0]?.getAttribute('aria-sort')).toBe('descending')
      fireEvent.keyDown(tableHeaderCells[0], { key: 'Space' })
      await userEvent.click(tableHeaderCells[1])
      expect(tableHeaderCells[0]?.getAttribute('aria-sort')).toBe(null)
      expect(tableHeaderCells[1]?.getAttribute('aria-sort')).toBe('ascending')
      expect(asFragment()).toMatchSnapshot()
    }
  })

  test('Should render correctly with bad sort value', () => {
    const { asFragment } = renderWithTheme(
      <Table
        // @ts-expect-error Wrong value used
        columns={columns.map(column => ({
          ...column,
          orderDirection: 'badValue',
        }))}
      >
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} id={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('Should render correctly with isSelectable and selectedIds but then disable/enable them', () => {
    const selectedIds = ['1']
    const { rerender } = render(
      <Table columns={columns} selectable>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} id={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
      {
        wrapper: Wrapper,
      },
    )
    rerender(
      <Table columns={columns} selectable>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row selectDisabled={id === selectedIds[0]} key={id} id={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    )
  })

  test('Should render correctly with selectDisabled as a string', () =>
    shouldMatchEmotionSnapshot(
      <Table columns={columns}>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} selectDisabled="reason" id={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    ))

  test('Should render correctly with stipped', () =>
    shouldMatchEmotionSnapshot(
      <Table columns={columns} stripped bordered>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} id={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    ))

  test('Should render correctly with info', () =>
    shouldMatchEmotionSnapshot(
      <Table
        columns={[
          { label: 'Name', info: 'This column is important' },
          ...columns.slice(1, 3),
        ]}
        stripped
        bordered
      >
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} id={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    ))

  test('Should render correctly with highlight animation on Table.Row', () =>
    shouldMatchEmotionSnapshot(
      <Table
        columns={[
          { label: 'Name', info: 'This column is important' },
          ...columns.slice(1, 3),
        ]}
      >
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} id={id} highlightAnimation>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    ))

  test('Should render correctly with selectable and shift click', async () => {
    const { asFragment } = renderWithTheme(
      <Table columns={columns} selectable>
        <Table.Body>
          {data.map(({ id, columnA, columnB, columnC, columnD, columnE }) => (
            <Table.Row key={id} id={id}>
              <Table.Cell>{columnA}</Table.Cell>
              <Table.Cell>{columnB}</Table.Cell>
              <Table.Cell>{columnC}</Table.Cell>
              <Table.Cell>{columnD}</Table.Cell>
              <Table.Cell>{columnE}</Table.Cell>
              <Table.SelectBar data={data} idKey="id">
                {({ selectedItems }) => <div>{selectedItems.length} items</div>}
              </Table.SelectBar>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>,
    )
    const checkboxes = screen.getAllByRole<HTMLInputElement>('checkbox')

    const firstRowCheckbox = checkboxes.find(({ value }) => value === '1')
    const secondRowCheckbox = checkboxes.find(({ value }) => value === '2')
    const thirdRowCheckbox = checkboxes.find(({ value }) => value === '3')

    expect(firstRowCheckbox).toBeInTheDocument()
    if (!firstRowCheckbox) {
      throw new Error('First checkbox is not defined')
    }
    if (!secondRowCheckbox) {
      throw new Error('Second checkbox is not defined')
    }

    if (!thirdRowCheckbox) {
      throw new Error('Third checkbox is not defined')
    }

    await userEvent.click(firstRowCheckbox)

    fireEvent.click(thirdRowCheckbox, { shiftKey: true })
    expect(thirdRowCheckbox).toBeChecked()

    expect(asFragment()).toMatchSnapshot()
  })
})
