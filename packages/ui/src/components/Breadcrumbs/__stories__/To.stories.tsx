import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Breadcrumbs } from '..'

export const To: StoryFn<ComponentProps<typeof Breadcrumbs>> = props => (
  <Breadcrumbs {...props}>
    <Breadcrumbs.Item to="/">Step 1</Breadcrumbs.Item>
    <Breadcrumbs.Item to="/">Step 2</Breadcrumbs.Item>
    <Breadcrumbs.Item to="/">Step 3</Breadcrumbs.Item>
  </Breadcrumbs>
)

To.parameters = {
  docs: {
    storyDescription:
      'You can make `Breadcrumbs.Item` content be render as `a` tag with `to` prop. For relative url the `linkComponent` from your theme configuration is used.',
  },
}
