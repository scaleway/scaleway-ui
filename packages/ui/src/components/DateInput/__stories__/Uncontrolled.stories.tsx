import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { DateInput } from '..'

export const Uncontrolled: StoryFn<
  ComponentProps<typeof DateInput>
> = props => <DateInput {...props} label="Date" />

Uncontrolled.parameters = {
  docs: {
    storyDescription:
      'DateInput can be used as an [uncontrolled component](https://reactjs.org/docs/uncontrolled-components.html).',
  },
}
