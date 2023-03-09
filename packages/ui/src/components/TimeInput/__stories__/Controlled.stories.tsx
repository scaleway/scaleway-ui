import type { Story } from '@storybook/react'
import { useState } from 'react'
import { TimeInput } from '..'
import type { SelectOption } from '../../SelectInput'

const isSafeValue = (value: unknown): value is SelectOption =>
  value !== null && !Array.isArray(value)

const DEFAULT_VAL = { label: '03:30', value: '03:30' }

export const Controlled: Story = ({ value: defaultValue = DEFAULT_VAL }) => {
  const [value, setValue] = useState<SelectOption>(defaultValue as SelectOption)

  return (
    <TimeInput
      name="timeinput-test-controlled"
      onChange={newValue => {
        if (isSafeValue(newValue)) {
          setValue(newValue)
        }
      }}
      placeholder="Time"
      value={value}
    />
  )
}

Controlled.parameters = {
  docs: {
    storyDescription:
      'Most of the time, you need a [controlled component](https://reactjs.org/docs/forms.html).',
  },
}
