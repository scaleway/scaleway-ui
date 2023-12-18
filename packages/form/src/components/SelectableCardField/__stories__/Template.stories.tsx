import type { StoryFn } from '@storybook/react'
import { Row } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { SelectableCardField } from '..'

export const Template: StoryFn<
  ComponentProps<typeof SelectableCardField>
> = args => (
  <Row templateColumns="repeat(2, 2fr)" gap={1}>
    <SelectableCardField
      {...args}
      name="option"
      value="option1"
      showTick
      label="Option 1"
    />
    <SelectableCardField
      {...args}
      name="option"
      value="option2"
      showTick
      label="Option 2"
    />
  </Row>
)
