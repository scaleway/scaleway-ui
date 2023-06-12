import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { RadioField } from '..'

export const Template: StoryFn<ComponentProps<typeof RadioField>> = args => (
  <RadioField {...args}>Radio</RadioField>
)
