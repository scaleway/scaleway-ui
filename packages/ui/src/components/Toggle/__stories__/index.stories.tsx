import type { Meta } from '@storybook/react'
import { Toggle } from '..'

export default {
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component: 'Toggle button used to give an on / off state into a form.',
      },
    },
  },
  title: 'Components/Data Entry/Toggle',
} as Meta<typeof Toggle>

export { Playground } from './Playground.stories'
export { Label } from './Label.stories'
export { ComplexLabel } from './ComplexLabel.stories'
export { LabelPosition } from './LabelPosition.stories'
export { Sizes } from './Sizes.stories'
export { Disabled } from './Disabled.stories'
export { Required } from './Required.stories'
export { Tooltip } from './Tooltip.stories'
export { Helper } from './Helper.stories'
