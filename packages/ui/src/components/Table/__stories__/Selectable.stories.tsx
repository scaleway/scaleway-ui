import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Table } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { columns, data } from './resources'

export const Selectable: StoryFn<typeof Table> = args => {
  const [clicked, setClick] = useState(true)

  return (
    <>
      <Table {...args} selectable columns={columns}>
        <Table.Body>
          {data.map(movie =>
            movie.id !== '4' || clicked ? (
              <Table.Row
                key={movie.id}
                id={movie.id}
                selectDisabled={
                  movie.id === '1' ? 'This movie is not selectable' : undefined
                }
              >
                <Table.Cell>{movie.name}</Table.Cell>
                <Table.Cell>{movie.releaseYear}</Table.Cell>
                <Table.Cell>{movie.trilogy}</Table.Cell>
                <Table.Cell>{movie.director}</Table.Cell>
              </Table.Row>
            ) : null,
          )}
        </Table.Body>
        <Table.SelectBar data={data} idKey="id">
          {({ selectedItems, unselectAll }) => (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
            >
              <Text variant="bodyStrong" as="p" sentiment="primary">
                {selectedItems.length} item(s) selected (
                {selectedItems.map(
                  (item, index) => `${index > 0 ? ', ' : ''}${item.name}`,
                )}
                )
              </Text>
              <Button
                sentiment="danger"
                size="small"
                onClick={() => {
                  // oxlint-disable-next-line eslint/no-alert
                  alert('elements could be deleted')
                  unselectAll()
                }}
              >
                Delete
              </Button>
            </Stack>
          )}
        </Table.SelectBar>
      </Table>
      <button type="button" onClick={() => setClick(!clicked)}>
        {clicked ? 'remove ' : 'add '}
        The Empire Strikes Back
      </button>
    </>
  )
}

Selectable.parameters = {
  docs: {
    description: {
      story:
        "By adding the prop `selectable` on the `Table` a new column will be automatically added to allow user to select a row, each row is identified by its prop `id`.\n\nYou can use the utility `Table.SelectBar` to quickly get selectedItems providing the `data` and the data's property key used to provite the `id` of each `Table.Row`.\n\nFor other usages about selected items, check our `Context` example.\n\nProviding the prop `selectDisabled` prevents the row to be selected (it can be a boolean or a string to give user a disable reason shown as a tooltip).",
    },
  },
}
