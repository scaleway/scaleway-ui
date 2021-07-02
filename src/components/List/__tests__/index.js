import { act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { useEffect } from 'react'
import List from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'
import { generateData } from '../../../mocks/list'
import { getUUID } from '../../../utils'

describe('List', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshot(
      <List
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))
  test('should render correctly variant table', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))
  test('should render correctly variant explorer', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="explorer"
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))
  test('should render correctly multiselect', () =>
    shouldMatchEmotionSnapshot(
      <List
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
        multiselect
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))
  test('should render correctly multiselect table', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        variant="table"
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))
  test('should render correctly multiselect explorer', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="explorer"
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))
  test('should render correctly multiselect with condition', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        selectable={data => data.filter(({ name }) => name.includes('1'))}
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly multiselect with condition, table variant', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        multiselect
        selectable={data => data.filter(({ name }) => name.includes('1'))}
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly multiselect and with click', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name' },
          { label: 'Description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
            <list.SelectBar>{() => <>Test SelectBar</>}</list.SelectBar>
          </>
        )}
      </List>,
      {
        transform: async node => {
          expect(node.getByTestId('row-0')).toBeInTheDocument()
          const checkboxes = node.getAllByRole('checkbox', {
            hidden: true,
          })
          expect(checkboxes[0].name).toBe('select-rows')
          expect(checkboxes[0].value).toBe('all')
          userEvent.click(checkboxes[0])
          userEvent.click(checkboxes[0])
          expect(checkboxes[1].name).toBe('select-rows')
          expect(checkboxes[1].value).toBe('0')
          userEvent.click(checkboxes[1])
          expect(node.getByText('item selected'))
          userEvent.click(checkboxes[2])
          expect(node.getByText('items selected'))
        },
      },
    ))

  test('should render correctly multiselect and with click and not functional SelectBar children', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name' },
          { label: 'Description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
            <list.SelectBar>Test SelectBar</list.SelectBar>
          </>
        )}
      </List>,
      {
        transform: async node => {
          expect(node.getByTestId('row-0')).toBeInTheDocument()
          const checkboxes = node.getAllByRole('checkbox', {
            hidden: true,
          })
          expect(checkboxes[0].name).toBe('select-rows')
          expect(checkboxes[0].value).toBe('all')
          userEvent.click(checkboxes[0])
          userEvent.click(checkboxes[0])
          expect(checkboxes[1].name).toBe('select-rows')
          expect(checkboxes[1].value).toBe('0')
          userEvent.click(checkboxes[1])
          expect(node.getByText('item selected'))
          userEvent.click(checkboxes[2])
          expect(node.getByText('items selected'))
        },
      },
    ))

  test('should render correctly multiselect and with sort click', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
      {
        transform: async node => {
          const nameHeader = node.getByRole('button', {
            name: 'sort Name',
          })

          const iconContainer = node.getAllByTitle('ascending')[0].parentElement
          expect(iconContainer.getAttribute('aria-sort')).toBe('none')
          userEvent.click(nameHeader)
          expect(iconContainer.getAttribute('aria-sort')).toBe('ascending')
          userEvent.click(nameHeader)
          expect(iconContainer.getAttribute('aria-sort')).toBe('descending')
          userEvent.type(nameHeader, '{enter}')
          userEvent.type(nameHeader, '{enter}')

          const departmentHeader = node.getByRole('button', {
            name: 'sort Department',
          })
          userEvent.click(departmentHeader)

          const referenceHeader = node.getByRole('button', {
            name: 'sort Reference',
          })
          userEvent.click(referenceHeader)

          const lastHeader = node.getByRole('button', {
            name: 'sort 4',
          })
          userEvent.click(lastHeader)
          userEvent.type(lastHeader, '{space}')
        },
      },
    ))

  test('should render correctly multiselect and with custom sort click', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: item => item.name },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
      {
        transform: async node => {
          const nameHeader = node.getByRole('button', {
            name: 'sort Name',
          })
          userEvent.click(nameHeader)
          userEvent.click(nameHeader)
        },
      },
    ))

  test('should render correctly multiselect, table variant and with sort click', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
      {
        transform: async node => {
          const nameHeader = node.getByRole('button', {
            name: 'sort Name',
          })

          const iconContainer = node.getAllByTitle('ascending')[0].parentElement
          expect(iconContainer.getAttribute('aria-sort')).toBe('none')
          userEvent.click(nameHeader)
          expect(iconContainer.getAttribute('aria-sort')).toBe('ascending')
          userEvent.click(nameHeader)
          expect(iconContainer.getAttribute('aria-sort')).toBe('descending')
          userEvent.type(nameHeader, '{enter}')
          userEvent.type(nameHeader, '{enter}')

          const departmentHeader = node.getByRole('button', {
            name: 'sort Department',
          })
          userEvent.click(departmentHeader)

          const referenceHeader = node.getByRole('button', {
            name: 'sort Reference',
          })
          userEvent.click(referenceHeader)

          const lastHeader = node.getByRole('button', {
            name: 'sort 4',
          })
          userEvent.click(lastHeader)
          userEvent.type(lastHeader, '{enter}')
        },
      },
    ))
  test('should render correctly multiselect, table variant and with click', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name' },
          { label: 'Description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
            <list.SelectBar>{() => <>Test SelectBar</>}</list.SelectBar>
          </>
        )}
      </List>,
      {
        transform: async node => {
          expect(node.getByTestId('row-0')).toBeInTheDocument()
          const checkboxes = node.getAllByRole('checkbox', {
            hidden: true,
          })
          expect(checkboxes[0].name).toBe('select-rows')
          expect(checkboxes[0].value).toBe('all')
          userEvent.click(checkboxes[0])
          userEvent.click(checkboxes[0])
          expect(checkboxes[1].name).toBe('select-rows')
          expect(checkboxes[1].value).toBe('0')
          userEvent.click(checkboxes[1])
          expect(node.getByText('item selected'))
          userEvent.click(checkboxes[2])
          expect(node.getByText('items selected'))
        },
      },
    ))

  test('should render correctly multiselect, explorer variant and with click', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="explorer"
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name' },
          { label: 'Description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
            <list.SelectBar>{() => <>Test SelectBar</>}</list.SelectBar>
          </>
        )}
      </List>,
      {
        transform: async node => {
          expect(node.getByTestId('row-0')).toBeInTheDocument()
          const checkboxes = node.getAllByRole('checkbox', {
            hidden: true,
          })
          expect(checkboxes[0].name).toBe('select-rows')
          expect(checkboxes[0].value).toBe('all')
          userEvent.click(checkboxes[0])
          userEvent.click(checkboxes[0])
          expect(checkboxes[1].name).toBe('select-rows')
          expect(checkboxes[1].value).toBe('0')
          userEvent.click(checkboxes[1])
          expect(node.getByText('item selected'))
          userEvent.click(checkboxes[2])
          expect(node.getByText('items selected'))
        },
      },
    ))

  test('should render correctly multiselect, explorer variant and with sort click', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="explorer"
        multiselect
        idKey="id"
        data={[
          ...generateData(5).reverse(),
          {
            department: `Front`,
            description: `Fake message for row 6`,
            id: `6`,
            name: `Scaler 1`,
            reference: 1,
          },
        ]}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
      {
        transform: async node => {
          const nameHeader = node.getByRole('button', {
            name: 'sort Name',
          })

          const iconContainer = node.getAllByTitle('ascending')[0].parentElement
          expect(iconContainer.getAttribute('aria-sort')).toBe('none')
          userEvent.click(nameHeader)
          expect(iconContainer.getAttribute('aria-sort')).toBe('ascending')
          userEvent.click(nameHeader)
          expect(iconContainer.getAttribute('aria-sort')).toBe('descending')
          userEvent.type(nameHeader, '{enter}')
          userEvent.type(nameHeader, '{enter}')

          const departmentHeader = node.getByRole('button', {
            name: 'sort Department',
          })
          userEvent.click(departmentHeader)

          const referenceHeader = node.getByRole('button', {
            name: 'sort Reference',
          })
          userEvent.click(referenceHeader)

          const lastHeader = node.getByRole('button', {
            name: 'sort 4',
          })
          userEvent.click(lastHeader)
          userEvent.type(lastHeader, '{enter}')
        },
      },
    ))

  test('should render correctly with isLoading', () =>
    shouldMatchEmotionSnapshot(
      <List
        isLoading
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with ExpendableContent', () =>
    shouldMatchEmotionSnapshot(
      <List
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                  <list.ExpendableContent>
                    {() => <>ExpendableContent {rowData.id}</>}
                  </list.ExpendableContent>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
      {
        transform: node => {
          const firstRow = node.getByTestId('row-0')
          expect(firstRow.open).toBeFalsy()
          userEvent.click(firstRow.firstChild)
          expect(firstRow.open).toBeTruthy()
          userEvent.click(firstRow.firstChild)
          expect(firstRow.open).toBeFalsy()
        },
      },
    ))

  test('should render correctly with autoClose and ExpendableContent', () =>
    shouldMatchEmotionSnapshot(
      <List
        autoClose
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                  <list.ExpendableContent>
                    ExpendableContent {rowData.id}
                  </list.ExpendableContent>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
      {
        transform: async node => {
          const firstRow = node.getByTestId('row-0')
          const secondRow = node.getByTestId('row-1')
          expect(firstRow.open).toBeFalsy()
          expect(secondRow.open).toBeFalsy()
          act(() => {
            userEvent.click(firstRow.firstChild)
          })
          expect(secondRow.open).toBeFalsy()
          expect(firstRow.open).toBeTruthy()
          act(() => {
            userEvent.click(secondRow.firstChild)
          })
          await waitFor(() => expect(firstRow.open).toBeFalsy())
          expect(secondRow.open).toBeTruthy()
        },
      },
    ))
  test('should render correctly with unusual props', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        idKey="id"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                  <list.ExpendableContent>
                    {() => <>ExpendableContent {rowData.id}</>}
                  </list.ExpendableContent>
                </list.Row>
              )}
            </list.Body>
            <list.SelectBar text="Hello">{() => <>Test</>}</list.SelectBar>
          </>
        )}
      </List>,
      {
        transform: async node => {
          expect(node.getByTestId('row-0')).toBeInTheDocument()
          const checkboxes = node.getAllByRole('checkbox', {
            hidden: true,
          })
          expect(checkboxes[0].name).toBe('select-rows')
          userEvent.click(checkboxes[0])
          userEvent.click(checkboxes[0])
        },
      },
    ))

  test('should render correctly with no data', () =>
    shouldMatchEmotionSnapshot(
      <List
        emptyListComponent="Test"
        multiselect
        idKey="id"
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                  <list.ExpendableContent>
                    {() => <>ExpendableContent {rowData.id}</>}
                  </list.ExpendableContent>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with empty data', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        idKey="id"
        data={[]}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                  <list.ExpendableContent>
                    {() => <>ExpendableContent {rowData.id}</>}
                  </list.ExpendableContent>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with bad idKey', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        idKey="badKey"
        data={generateData(5)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                  <list.ExpendableContent>
                    {() => <>ExpendableContent {rowData.id}</>}
                  </list.ExpendableContent>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with defaultSort', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        data={generateData(5)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                  <list.ExpendableContent>
                    {() => <>ExpendableContent {rowData.id}</>}
                  </list.ExpendableContent>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with alert', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row alert id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                  <list.ExpendableContent>
                    {() => <>ExpendableContent {rowData.id}</>}
                  </list.ExpendableContent>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with animated', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row animated id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                  <list.ExpendableContent>
                    {() => <>ExpendableContent {rowData.id}</>}
                  </list.ExpendableContent>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with animated, table variant', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row animated id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with disabled', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row disabled id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with disabled', () => {
    const ref = React.createRef()

    return shouldMatchEmotionSnapshot(
      <List
        ref={ref}
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row disabled id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    )
  })

  test('should render correctly with isHoverable', () =>
    shouldMatchEmotionSnapshot(
      <List
        data={generateData(3)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row isHoverable id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with highlighted', () =>
    shouldMatchEmotionSnapshot(
      <List
        data={generateData(3)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData, setRowState, rowState }) => {
                useEffect(() => {
                  if (rowData.id.includes('1') && !rowState.highlighted) {
                    setRowState?.(rowData.id, {
                      highlighted: true,
                    })
                  }
                }, [rowData.id, setRowState, rowState])

                return (
                  <list.Row isHoverable id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with highlighted, table variant', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData, setRowState, rowState }) => {
                useEffect(() => {
                  if (rowData.id.includes('1') && !rowState.highlighted) {
                    setRowState?.(rowData.id, {
                      highlighted: true,
                    })
                  }
                }, [rowData.id, setRowState, rowState])

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with highlighted, explorer variant', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="explorer"
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData, setRowState, rowState }) => {
                useEffect(() => {
                  if (rowData.id.includes('1') && !rowState.highlighted) {
                    setRowState?.(rowData.id, {
                      highlighted: true,
                    })
                  }
                }, [rowData.id, setRowState, rowState])

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with highlighted and selected', () =>
    shouldMatchEmotionSnapshot(
      <List
        multiselect
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData, setRowState, rowState }) => {
                useEffect(() => {
                  if (rowData.id.includes('1') && !rowState.highlighted) {
                    setRowState?.(rowData.id, {
                      highlighted: true,
                      selected: true,
                    })
                  }
                }, [rowData.id, setRowState, rowState])

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with highlighted and selected, table variant', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="table"
        multiselect
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData, setRowState, rowState }) => {
                useEffect(() => {
                  if (rowData.id.includes('1') && !rowState.highlighted) {
                    setRowState?.(rowData.id, {
                      highlighted: true,
                      selected: true,
                    })
                  }
                }, [rowData.id, setRowState, rowState])

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with highlighted and selected, explorer variant', () =>
    shouldMatchEmotionSnapshot(
      <List
        variant="explorer"
        data={generateData(2)}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData, setRowState, rowState }) => {
                useEffect(() => {
                  if (rowData.id.includes('1') && !rowState.highlighted) {
                    setRowState?.(rowData.id, {
                      highlighted: true,
                      selected: true,
                    })
                  }
                }, [rowData.id, setRowState, rowState])

                return (
                  <list.Row id={rowData.id}>
                    <list.Cell>{rowData.name}</list.Cell>
                    <list.Cell>{rowData.description}</list.Cell>
                    <list.Cell>{rowData.department}</list.Cell>
                    <list.Cell>{rowData.reference}</list.Cell>
                    <list.Cell>actions</list.Cell>
                  </list.Row>
                )
              }}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with custom loader', () =>
    shouldMatchEmotionSnapshot(
      <List
        data={generateData(2)}
        isLoading
        customLoader={<div>Loading....</div>}
        columns={[
          { defaultSort: 'desc', label: 'Name', sort: 'name' },
          { label: 'Description', sort: 'description', width: '15%' },
          { label: 'Department', width: '64px' },
          { label: 'Reference', sort: 'reference', width: '64px' },
          { justifyContent: 'center', padding: '2px', width: '128px' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                  <list.Cell>{rowData.reference}</list.Cell>
                  <list.Cell>actions</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with pagination', async () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
    await shouldMatchEmotionSnapshot(
      <List
        perPage={5}
        onLoadPage={({ perPage }) =>
          new Promise(resolve => {
            setTimeout(() => {
              const newData = generateData(perPage, getUUID())
              resolve(newData)
            }, 300)
          })
        }
        multiselect
        idKey="id"
        data={generateData(20)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description' },
          { label: 'Department' },
        ]}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    )
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  test('should render correctly with pagination and bad idKey', () =>
    shouldMatchEmotionSnapshot(
      <List
        perPage={5}
        idKey="badKey"
        data={generateData(20)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description' },
          { label: 'Department' },
        ]}
        customLoader={<div>Loading...</div>}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
    ))

  test('should render correctly with pagination and page loading', () =>
    shouldMatchEmotionSnapshot(
      <List
        perPage={5}
        pageCount={10}
        onLoadPage={({ perPage }) =>
          new Promise(resolve => {
            setTimeout(() => {
              const newData = generateData(perPage, getUUID())
              resolve(newData)
            }, 300)
          })
        }
        idKey="id"
        data={generateData(20)}
        columns={[
          { label: 'Name', sort: 'name' },
          { label: 'Description' },
          { label: 'Department' },
        ]}
        customLoader={<div>Loading...</div>}
      >
        {list => (
          <>
            <list.Header />
            <list.Body>
              {({ rowData }) => (
                <list.Row id={rowData.id}>
                  <list.Cell>{rowData.name}</list.Cell>
                  <list.Cell>{rowData.description}</list.Cell>
                  <list.Cell>{rowData.department}</list.Cell>
                </list.Row>
              )}
            </list.Body>
          </>
        )}
      </List>,
      {
        transform: async node => {
          await node.findByRole('button', {
            name: 'sort Name',
          })
          const nameHeader = node.getByRole('button', {
            name: 'sort Name',
          })
          userEvent.click(nameHeader)
          userEvent.click(nameHeader)
        },
      },
    ))
})
