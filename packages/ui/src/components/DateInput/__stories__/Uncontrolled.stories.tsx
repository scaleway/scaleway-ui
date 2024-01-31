import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { DateInput } from '..'
import { Template } from './Template'

export const Uncontrolled: StoryFn<
  ComponentProps<typeof DateInput>
> = props => <DateInput {...props} label="Date" />

Uncontrolled.args = Template.args

Uncontrolled.parameters = {
  docs: {
    description: {
      story:
        'DateInput can be used as an [uncontrolled component](https://reactjs.org/docs/uncontrolled-components.html).',
    },
  },
}
