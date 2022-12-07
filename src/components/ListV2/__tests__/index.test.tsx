import { ThemeProvider } from '@emotion/react'
import { userEvent } from '@storybook/testing-library'
import { render } from '@testing-library/react'
import { ComponentProps, ReactNode } from 'react'
import { List } from '..'
import ControlValue from '../../../__stories__/components/ControlValue'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import defaultTheme from '../../../theme'

interface WrapperProps {
  theme?: typeof defaultTheme
  children: ReactNode
}

export const data: ComponentProps<typeof List<Record<string, string>>>['data'] =
  Array.from({ length: 10 }, (_, index) => index + 1).map(rowNum => ({
    id: `${rowNum}`,
    a: `Row ${rowNum} Column 1`,
    b: `Row ${rowNum} Column 2`,
    c: `Row ${rowNum} Column 3`,
    d: `Row ${rowNum} Column 4`,
    e: `Row ${rowNum} Column 5`,
    f: `Row ${rowNum} expandable content`,
  }))

export const columns: NonNullable<ComponentProps<typeof List>['columns']> =
  Array.from({ length: 5 }, (_, index) => index + 1).map(columnNumber => ({
    label: `Column ${columnNumber}`,
    id: `${columnNumber}`,
  }))

const Wrapper = ({ theme = defaultTheme, children }: WrapperProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

describe('ListV2', () => {
  test('Should render correctly', () =>
    shouldMatchEmotionSnapshot(
      <List data={data} columns={columns}>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))

  test('Should render correctly without columns', () =>
    shouldMatchEmotionSnapshot(
      <List data={data}>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))

  test('Should render correctly with JSX columns', () =>
    shouldMatchEmotionSnapshot(
      <List data={data}>
        <List.Headers>
          <List.HeaderRow>
            {columns.map(({ id, label }) => (
              <List.Header key={id}>{label}</List.Header>
            ))}
          </List.HeaderRow>
        </List.Headers>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))

  test('Should render correctly with sort', () =>
    shouldMatchEmotionSnapshot(
      <List
        data={data}
        columns={columns.map(column => ({ ...column, sort: 'none' }))}
      >
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))

  test('Should render correctly with selectable', () =>
    shouldMatchEmotionSnapshot(
      <List data={data} columns={columns} selectable>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))

  test('Should render correctly with isLoading', () =>
    shouldMatchEmotionSnapshot(
      <List data={data} columns={columns} isLoading>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))

  test('Should render correctly with isLoading with JSX columns', () =>
    shouldMatchEmotionSnapshot(
      <List data={data} isLoading>
        <List.Headers>
          <List.HeaderRow>
            {columns.map(({ id, label }) => (
              <List.Header key={id}>{label}</List.Header>
            ))}
          </List.HeaderRow>
        </List.Headers>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))

  test('Should render correctly with isLoading with JSX columns and template', () =>
    shouldMatchEmotionSnapshot(
      <List data={data} template="repeat(5, 1fr)" isLoading>
        <List.Headers>
          <List.HeaderRow>
            {columns.map(({ id, label }) => (
              <List.Header key={id}>{label}</List.Header>
            ))}
          </List.HeaderRow>
        </List.Headers>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))

  test('Should render correctly with disabled rows', () =>
    shouldMatchEmotionSnapshot(
      <List data={data} columns={columns}>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} isDisabled id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))

  test('Should render correctly with highlighted rows', () =>
    shouldMatchEmotionSnapshot(
      <List data={data} columns={columns}>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} isHighlighted id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))

  test('Should render correctly with isExpandable rows', () =>
    shouldMatchEmotionSnapshot(
      <List data={data} columns={columns}>
        <List.Body>
          {data.map(({ id, a, b, c, d, e, f }) => (
            <List.Row key={id} isExpandable id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
              <List.Expandable>{f}</List.Expandable>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))

  test('Should render correctly with expandable rows but hidden arrow', () =>
    shouldMatchEmotionSnapshot(
      <List data={data} columns={columns}>
        <List.Body>
          {data.map(({ id, a, b, c, d, e, f }) => (
            <List.Row key={id} isExpandable hideArrow id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
              <List.Expandable>{f}</List.Expandable>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))

  test('Should render correctly with rows forceOpened', () =>
    shouldMatchEmotionSnapshot(
      <List data={data} columns={columns}>
        <List.Body>
          {data.map(({ id, a, b, c, d, e, f }) => (
            <List.Row key={id} isExpanded id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
              <List.Expandable>{f}</List.Expandable>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))

  test('Should render correctly with expandable rows and forceOpened', () =>
    shouldMatchEmotionSnapshot(
      <List data={data} columns={columns}>
        <List.Body>
          {data.map(({ id, a, b, c, d, e, f }) => (
            <List.Row key={id} isExpandable isExpanded id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
              <List.Expandable>{f}</List.Expandable>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))

  test('Should render correctly with placeholder', async () => {
    await shouldMatchEmotionSnapshot(
      <List data={[]} columns={columns}>
        <List.Body>
          <List.Placeholder cols={columns.length} rows={18} />
        </List.Body>
      </List>,
    )
    await shouldMatchEmotionSnapshot(
      <List data={[]} columns={columns}>
        <List.Body>
          <List.Placeholder rows={18} />
        </List.Body>
      </List>,
    )
    await shouldMatchEmotionSnapshot(
      <List data={[]} columns={columns}>
        <List.Body>
          <List.Placeholder cols={columns.length} />
        </List.Body>
      </List>,
    )
  })

  test('Should render correctly with selectable then click on first row then uncheck all, then check all', () =>
    shouldMatchEmotionSnapshot(
      <List
        onSelectedIdsChange={jest.fn()}
        data={data}
        columns={columns}
        selectable
      >
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
      {
        transform: node => {
          const checkboxes = node.getAllByRole('checkbox') as HTMLInputElement[]

          const firstRowCheckbox = checkboxes.find(({ value }) => value === '1')
          const allCheckbox = checkboxes.find(({ value }) => value === 'all')
          expect(firstRowCheckbox).toBeInTheDocument()
          expect(allCheckbox).toBeInTheDocument()
          if (!firstRowCheckbox) {
            fail('First checkbox is not defined')
          }
          if (!allCheckbox) {
            fail('Select all checkbox is not defined')
          }
          userEvent.click(firstRowCheckbox)
          expect(firstRowCheckbox).toBeChecked()
          userEvent.click(firstRowCheckbox)
          expect(firstRowCheckbox).not.toBeChecked()
          userEvent.click(firstRowCheckbox)
          userEvent.click(allCheckbox)
          expect(firstRowCheckbox).not.toBeChecked()
          userEvent.click(allCheckbox)
          expect(firstRowCheckbox).toBeChecked()
        },
      },
    ))

  test('Should render correctly with sort then click', () =>
    shouldMatchEmotionSnapshot(
      <ControlValue
        value={
          { column: '', order: 'asc' } as {
            column: string
            order: ComponentProps<typeof List.Header>['sort']
          }
        }
      >
        {({ value, onChange }) => (
          <List
            data={data}
            columns={columns.map(column => ({
              ...column,
              sort: value.column === column.id ? value.order : 'none',
              id: column.id,
              onClick: clickedSort => {
                if (clickedSort.column === value.column) {
                  onChange({
                    column: value.column,
                    order: value.order === 'asc' ? 'desc' : 'asc',
                  })
                } else {
                  onChange({
                    column: clickedSort.column,
                    order: 'asc',
                  })
                }
              },
            }))}
          >
            <List.Body>
              {data.map(({ id, a, b, c, d, e }) => (
                <List.Row key={id} id={id}>
                  <List.Cell>{a}</List.Cell>
                  <List.Cell>{b}</List.Cell>
                  <List.Cell>{c}</List.Cell>
                  <List.Cell>{d}</List.Cell>
                  <List.Cell>{e}</List.Cell>
                </List.Row>
              ))}
            </List.Body>
          </List>
        )}
      </ControlValue>,
      {
        transform: node => {
          const listColumns = node.getAllByRole(
            'columnheader',
          ) as HTMLTableCellElement[]
          expect(listColumns).toHaveLength(columns.length)

          expect(listColumns[0].getAttribute('aria-sort')).toBe('none')
          userEvent.click(listColumns[0])
          expect(listColumns[0].getAttribute('aria-sort')).toBe('ascending')
          userEvent.click(listColumns[0])
          expect(listColumns[0].getAttribute('aria-sort')).toBe('descending')
          userEvent.click(listColumns[0])
          userEvent.click(listColumns[1])
          expect(listColumns[0].getAttribute('aria-sort')).toBe('none')
          expect(listColumns[1].getAttribute('aria-sort')).toBe('ascending')
        },
      },
    ))

  test('Should render correctly with selectable and selectedIds', () =>
    shouldMatchEmotionSnapshot(
      <List data={data} columns={columns} selectable selectedIds={['1']}>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))

  test('Should render correctly with selectable and selectedIds but then change theme', () => {
    const selectedIds = ['1']
    const { rerender } = render(
      <List data={data} columns={columns} selectable selectedIds={selectedIds}>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
      {
        wrapper: Wrapper,
      },
    )
    rerender(
      <List data={data} columns={columns} selectable selectedIds={selectedIds}>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    )
    rerender(
      <List data={data} columns={columns} selectable selectedIds={[]}>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    )
    rerender(
      <List data={data} columns={columns} selectable>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    )
  })

  test('Should render correctly with selectable and selectedIds change', () =>
    shouldMatchEmotionSnapshot(
      <List data={data} columns={columns} selectable>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            // @ts-expect-error List.Row should have an id
            <List.Row key={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
      {
        transform: node => {
          const checkboxes = node.getAllByRole('checkbox') as HTMLInputElement[]

          const firstRowCheckbox = checkboxes.find(
            ({ value }) => value !== 'all',
          )
          expect(firstRowCheckbox).toBeInTheDocument()
          if (!firstRowCheckbox) {
            fail('First checkbox is not defined')
          }
          expect(firstRowCheckbox).toBeDisabled()
          userEvent.click(firstRowCheckbox)
          expect(firstRowCheckbox).not.toBeChecked()
          userEvent.click(firstRowCheckbox)
          expect(firstRowCheckbox).not.toBeChecked()
          userEvent.click(firstRowCheckbox)
          expect(firstRowCheckbox).not.toBeChecked()
          userEvent.click(firstRowCheckbox)
          expect(firstRowCheckbox).not.toBeChecked()
          userEvent.click(firstRowCheckbox)
          expect(firstRowCheckbox).not.toBeChecked()
        },
      },
    ))

  test('Should render correctly with isExpandable rows then click', () =>
    shouldMatchEmotionSnapshot(
      <List data={data} columns={columns}>
        <List.Body>
          {data.map(({ id, a, b, c, d, e, f }) => (
            <List.Row key={id} isExpandable id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
              <List.Expandable>{f}</List.Expandable>
            </List.Row>
          ))}
        </List.Body>
      </List>,
      {
        transform: node => {
          userEvent.click(node.getAllByRole('button')[0])
          userEvent.click(node.getAllByRole('button')[0])
        },
      },
    ))

  test('Should render correctly with isClickable column then click but event is prevented', () =>
    shouldMatchEmotionSnapshot(
      <List data={data} columns={columns}>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell
                isClickable
                onClick={event => {
                  event.preventDefault()
                }}
              >
                {e}
              </List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
      {
        transform: node => {
          userEvent.click(node.getByText(data[0].e))
        },
      },
    ))

  test('Should render correctly with isExpandable and autoClose rows then click', () =>
    shouldMatchEmotionSnapshot(
      <List data={data} autoClose columns={columns}>
        <List.Body>
          {data.map(({ id, a, b, c, d, e, f }) => (
            <List.Row key={id} isExpandable id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
              <List.Expandable>{f}</List.Expandable>
            </List.Row>
          ))}
        </List.Body>
      </List>,
      {
        transform: node => {
          userEvent.click(node.getAllByRole('button')[0])
          userEvent.click(node.getAllByRole('button')[0])
          userEvent.click(node.getAllByRole('button')[0])
          userEvent.click(node.getAllByRole('button')[1])
        },
      },
    ))

  test('Should render correctly with JSX columns and colSpan', () =>
    shouldMatchEmotionSnapshot(
      <List data={data}>
        <List.Headers>
          <List.HeaderRow>
            {columns.map(({ id, label }) => (
              <List.Header colSpan={2} key={id}>
                {label}
              </List.Header>
            ))}
          </List.HeaderRow>
        </List.Headers>
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell colSpan={2}>{a}</List.Cell>
              <List.Cell colSpan={2}>{b}</List.Cell>
              <List.Cell colSpan={2}>{c}</List.Cell>
              <List.Cell colSpan={2}>{d}</List.Cell>
              <List.Cell colSpan={2}>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))

  test('Should render correctly with bad sort value', () =>
    shouldMatchEmotionSnapshot(
      <List
        data={data}
        // @ts-expect-error Wrong value used
        columns={columns.map(column => ({ ...column, sort: 'badValue' }))}
      >
        <List.Body>
          {data.map(({ id, a, b, c, d, e }) => (
            <List.Row key={id} id={id}>
              <List.Cell>{a}</List.Cell>
              <List.Cell>{b}</List.Cell>
              <List.Cell>{c}</List.Cell>
              <List.Cell>{d}</List.Cell>
              <List.Cell>{e}</List.Cell>
            </List.Row>
          ))}
        </List.Body>
      </List>,
    ))
})
