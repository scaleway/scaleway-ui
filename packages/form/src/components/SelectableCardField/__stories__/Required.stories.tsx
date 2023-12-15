import type { StoryFn } from '@storybook/react'
import { Stack } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { SelectableCardField } from '..'
import { Submit } from '../../Submit'

export const Required: StoryFn<
  ComponentProps<typeof SelectableCardField>
> = args => (
  <Stack gap={1}>
    <SelectableCardField {...args} value="option 1" label="Radio 1" />
    <SelectableCardField {...args} value="option 2" label="Radio 2" />
    <Submit>Submit</Submit>
  </Stack>
)
Required.args = {
  name: 'required',
  showTick: true,
  required: true,
  value: 'required',
}
