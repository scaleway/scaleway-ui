import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { List } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { columns, data } from './resources'

export const Expandable: StoryFn<typeof List> = props => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Stack gap={1}>
      <Button sentiment="primary" onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Collapse' : 'Expand'} all row
      </Button>
      <List {...props} columns={columns}>
        {data.map(planet => (
          <List.Row
            key={planet.id}
            id={planet.id}
            expandable="Planet description"
            expanded={expanded}
            disabled={planet.id === 'mercury'}
          >
            <List.Cell>
              {planet.name}{' '}
              {planet.id === 'mercury'
                ? ' (A disabled row cannot be expanded)'
                : ''}
            </List.Cell>
            <List.Cell>{planet.perihelion}AU</List.Cell>
            <List.Cell>{planet.aphelion}AU</List.Cell>
          </List.Row>
        ))}
      </List>
    </Stack>
  )
}

Expandable.parameters = {
  docs: {
    description: {
      story:
        'The Row supports the prop `expandable` which expect a ReactNode. This content will be visible if user click on the row.\n\nProviding `disabled` on the row will prevent the expanding on click.',
    },
  },
}
