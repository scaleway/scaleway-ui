import type { ComponentMeta } from '@storybook/react'
import SelectNumber from '..'

export default {
  component: SelectNumber,
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
  title: 'Components/Data Entry/SelectNumber',
} as ComponentMeta<typeof SelectNumber>

export { Playground } from './Playground.stories'
export { Text } from './Text.stories'
export { DisabledTooltip } from './DisabledTooltip.stories'
export { Steps } from './Steps.stories'
export { Sizes } from './Sizes.stories'
export { Disabled } from './Disabled.stories'
export { Events } from './Events.stories'
