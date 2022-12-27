import type { Story } from '@storybook/react'
import { List } from '..'
import { ListBody } from '../ListBody'
import { ListCell } from '../ListCell'
import { ListExpandable } from '../ListExpandable'
import { ListRow } from '../ListRow'
import { columns, data } from './resources'

export const RowExpandable: Story = args => (
  <List
    {...args}
    idKey="id"
    isSelectable
    data={data}
    columns={columns.map(({ label }) => ({
      label,
    }))}
  >
    <ListBody>
      {data.map(({ a, b, c, d, e, id }) => (
        <ListRow
          isHoverable
          isExpandable
          hideArrow={id === '2'}
          isDisabled={id === '3'}
          tooltip={id === '3' ? 'This row is disabled' : undefined}
          id={id}
          key={id}
        >
          <ListCell>{a}</ListCell>
          <ListCell>{b}</ListCell>
          <ListCell>{c}</ListCell>
          <ListCell>{d}</ListCell>
          <ListCell>{e}</ListCell>
          <ListExpandable>Expandable content of row {id}</ListExpandable>
        </ListRow>
      ))}
    </ListBody>
  </List>
)
