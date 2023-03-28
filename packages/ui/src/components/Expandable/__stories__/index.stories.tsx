import type { Meta } from '@storybook/react'
import { Expandable } from '..'

export default {
  component: Expandable,
  parameters: {
    docs: {
      description: {
        component:
          'The Expandable component is a dynamic React component that allows for the expansion of its children content based on its height. The component comes with a sleek and smooth animation, providing a visually pleasing user experience.',
      },
    },
  },
  title: 'Components/Action/Expandable',
} as Meta

export { Playground } from './Playground.stories'
export { Controlled } from './Controlled.stories'
export { MinHeight } from './MinHeight.stories'
export { NestedExpandable } from './NestedExpandable.stories'
