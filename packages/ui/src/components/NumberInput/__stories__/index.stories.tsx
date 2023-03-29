import type { ComponentMeta } from '@storybook/react'
import { NumberInput } from '..'

export default {
  component: NumberInput,
  decorators: [
    StoryComponent => (
      <div
        style={{
          width: 'fit-content',
          minWidth: '200px',
        }}
      >
        <StoryComponent />
      </div>
    ),
  ],
  title: 'Components/Data Entry/NumberInput',
} as ComponentMeta<typeof NumberInput>

export { Playground } from './Playground.stories'
export { Text } from './Text.stories'
export { DisabledTooltip } from './DisabledTooltip.stories'
export { Steps } from './Steps.stories'
export { Sizes } from './Sizes.stories'
export { Disabled } from './Disabled.stories'
export { Events } from './Events.stories'
export { Controlled } from './Controlled.stories'
export { DefaultValue } from './DefaultValue.stories'
