import type { Meta } from '@storybook/react'
import { Breadcrumbs, Item } from '..'

export default {
  component: Breadcrumbs,
  subcomponents: { Item },
  title: 'Components/Navigation/Breadcrumbs',
} as Meta

export { Playground } from './Playground.stories'
export { Selected } from './Selected.stories'
export { To } from './To.stories'
export { OnClick } from './OnClick.stories'
