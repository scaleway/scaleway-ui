import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { List } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { columns, data } from './resources'

export const Selectable: StoryFn<typeof List> = args => {
  const [clicked, setClick] = useState(true)

  return (
    <>
      <List {...args} columns={columns} selectable>
        {data.map(planet =>
          planet.id !== 'mars' || clicked ? (
            <List.Row
              key={planet.id}
              id={planet.id}
              expandable="Planet description"
            >
              <List.Cell>{planet.id}</List.Cell>
              <List.Cell>{planet.name}</List.Cell>
              <List.Cell>{planet.perihelion}AU</List.Cell>
              <List.Cell>{planet.aphelion}AU</List.Cell>
            </List.Row>
          ) : null,
        )}

        <List.SelectBar data={data} idKey="id">
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
        </List.SelectBar>
      </List>

      <button type="button" onClick={() => setClick(!clicked)}>
        {clicked ? 'remove' : 'add'} mars as a planet
      </button>
    </>
  )
}

Selectable.parameters = {
  docs: {
    description: {
      story:
        "By adding the prop `selectable` on the `List` a new column will be automatically added to allow user to select a row, each row is identified by its prop `id`.\n\nYou can use the utility `List.SelectBar` to quickly get selectedItems providing the `data` and the data's property key used to provite the `id` of each `List.Row`.\n\nFor other usages about selected items, check our `Context` example.\n\nA disabled Row `disabled` cannot be selected.\n\nProviding the prop `selectDisabled` prevents the row to be selected (it can be a boolean or a string to give user a disable reason shown as a tooltip).",
    },
  },
}
