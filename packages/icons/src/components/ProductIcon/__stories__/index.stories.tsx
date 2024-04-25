import type { Meta } from '@storybook/react'
import { ProductIcon } from '..'
import Documentation from './Documentation.md?raw'

export default {
  component: ProductIcon,
  title: 'Icons/ProductIcon',
  parameters: {
    docs: {
      description: {
        component: Documentation as string,
      },
    },
  },
} as Meta

export { Playground } from './Playground.stories'
export { Variants } from './Variants.stories'
export { Disabled } from './Disabled.stories'
export { Sizes } from './Sizes.stories'
export { List } from './List.stories'
