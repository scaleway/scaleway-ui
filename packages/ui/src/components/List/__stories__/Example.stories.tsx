import type { StoryFn } from '@storybook/react'
import { useMemo, useState } from 'react'
import { List } from '..'
import { data as sourceData } from './resources'

export const Example: StoryFn = () => {
  const [currentOrder, setCurrentOrder] = useState<{
    columnId: 'name' | 'perihelion'
    order: 'asc' | 'desc'
  }>({ columnId: 'perihelion', order: 'asc' })

  const sortedData = useMemo(() => {
    const orderMultiplicator = currentOrder.order === 'asc' ? 1 : -1

    return [...sourceData].sort((a, b) => {
      if (a[currentOrder.columnId] < b[currentOrder.columnId]) {
        return -1 * orderMultiplicator
      }
      if (a[currentOrder.columnId] > b[currentOrder.columnId]) {
        return 1 * orderMultiplicator
      }

      return 0
    })
  }, [currentOrder])

  return (
    <List
      selectable
      columns={[
        {
          label: 'Solar system Planet',
          isOrdered: currentOrder.columnId === 'name',
          orderDirection: currentOrder.order,
          onOrder: newOrder =>
            setCurrentOrder({ columnId: 'name', order: newOrder }),
        },
        {
          label: 'Perihelion',
          width: '200px',
          isOrdered: currentOrder.columnId === 'perihelion',
          orderDirection: currentOrder.order,
          onOrder: newOrder =>
            setCurrentOrder({ columnId: 'perihelion', order: newOrder }),
        },
        {
          label: 'Aphelion',
          width: '200px',
        },
      ]}
    >
      {sortedData.map(planet => (
        <List.Row
          key={planet.id}
          id={planet.id}
          expandable="Planet description...."
          sentiment={planet.id === 'home-sweet-home' ? 'info' : undefined}
        >
          <List.Cell>{planet.name}</List.Cell>
          <List.Cell>{planet.perihelion}AU</List.Cell>
          <List.Cell>{planet.aphelion}AU</List.Cell>
        </List.Row>
      ))}
    </List>
  )
}

Example.parameters = {
  docs: {
    storyDescription:
      'This example is a demo of the List with the following features : `selectable rows`, `expandable row`, `sortable data`',
  },
}
