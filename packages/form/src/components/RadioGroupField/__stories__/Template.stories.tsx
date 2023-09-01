import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useFormState } from 'react-final-form'
import { Form, RadioGroupField } from '../..'
import { mockErrors } from '../../../mocks'

const RadioGroupFieldStory: StoryFn<
  ComponentProps<typeof RadioGroupField>
> = args => {
  const { values } = useFormState()

  return (
    <Stack gap={2}>
      <RadioGroupField {...args}>
        <RadioGroupField.Radio name="radio-1" value="radio-1" label="Radio 1" />
        <RadioGroupField.Radio name="radio-2" value="radio-2" label="Radio 2" />
      </RadioGroupField>
      <span>
        <b>Form content:</b> {JSON.stringify(values)}
      </span>
    </Stack>
  )
}

export const Template: StoryFn<
  ComponentProps<typeof RadioGroupField>
> = args => (
  <Form onRawSubmit={() => {}} errors={mockErrors}>
    <RadioGroupFieldStory {...args} />
  </Form>
)

Template.args = {
  name: 'template',
  legend: 'Legend label',
}
