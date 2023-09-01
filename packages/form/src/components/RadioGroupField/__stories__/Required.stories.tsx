import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import { useFormState } from 'react-final-form'
import { RadioGroupField } from '..'
import { Submit } from '../..'

export const RequiredStory: StoryFn<typeof RadioGroupField> = args => {
  const { values } = useFormState()

  return (
    <Stack gap={1}>
      <RadioGroupField {...args}>
        <RadioGroupField.Radio name="radio-1" value="radio-1" label="Radio 1" />
        <RadioGroupField.Radio name="radio-2" value="radio-2" label="Radio 2" />
      </RadioGroupField>
      <Submit>Submit</Submit>
      <span>
        <b>Form content:</b> {JSON.stringify(values)}
      </span>
    </Stack>
  )
}

export const Required: StoryFn<typeof RadioGroupField> = args => (
  <RequiredStory {...args} />
)

Required.args = {
  name: 'required',
  legend: 'Legend label',
  required: true,
}
