import type { Meta } from '@storybook/react'
import { Notice } from '..'

export default {
  component: Notice,
  parameters: {
    docs: {
      description: {
        component: `Notice can be useful for small info messsages`,
      },
    },
  },
  title: 'Components/Feedback/Notice',
} as Meta<typeof Notice>

export { Playground } from './Playground.stories'
export { ComplexChildren } from './ComplexChildren.stories'
