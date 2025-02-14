import type { StoryFn } from '@storybook/react'
import { Label } from '..'
import { Checkbox } from '../../Checkbox'
import { Row } from '../../Row'
import { SelectInputV2 } from '../../SelectInputV2'
import { Stack } from '../../Stack'

const values = [
  {
    value: 'value1',
    label: 'Value 1',
  },
  {
    value: 'value2',
    label: 'Value 2',
  },
  {
    value: 'value3',
    label: 'Value 3',
  },
]
export const Usage: StoryFn<typeof Label> = () => (
  <Stack gap={3}>
    Using prop label inside the component :
    <Stack gap={2} direction="row" justifyContent="center">
      <SelectInputV2
        options={values}
        label="Input1"
        name="input11"
        size="medium"
      />
      <SelectInputV2
        options={values}
        label="Input2"
        name="input12"
        size="medium"
      />
      <Checkbox>Checkbox</Checkbox>
    </Stack>
    Using component Label, outside of the input component :
    <Stack gap={0.5} direction="column" justifyContent="center">
      <Row gap={2} templateColumns="1fr 1fr 1fr">
        <Label size="medium">Input1</Label>
        <Label size="medium">Input2</Label>
      </Row>
      <Row gap={2} templateColumns="1fr 1fr 1fr">
        <SelectInputV2 options={values} name="input21" size="medium" />
        <SelectInputV2 options={values} name="input22" size="medium" />
        <Checkbox>Checkbox</Checkbox>
      </Row>
    </Stack>
  </Stack>
)

Usage.parameters = {
  docs: {
    description: {
      story:
        'Example of a usage of this component. Here, to center the checkbox with the input and not with the input and the label, use `Label` and `Row`.',
    },
  },
}
