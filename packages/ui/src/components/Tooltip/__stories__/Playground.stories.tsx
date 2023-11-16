import type { Decorator } from '@storybook/react'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.decorators = [
  Story => (
    <div>
      <div style={{ display: 'inline-flex' }}>
        <Story />
      </div>
    </div>
  ),
] as Decorator[]

Playground.args = {
  text: 'Hello there',
}
