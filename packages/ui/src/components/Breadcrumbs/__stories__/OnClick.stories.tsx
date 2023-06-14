import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { Breadcrumbs } from '..'

export const OnClick: StoryFn<ComponentProps<typeof Breadcrumbs>> = props => {
  const [value, setValue] = useState(1)

  return (
    <Breadcrumbs selected={value} {...props}>
      <Breadcrumbs.Item onClick={(_, step) => setValue(step)}>
        Step 1
      </Breadcrumbs.Item>
      <Breadcrumbs.Item onClick={(_, step) => setValue(step)}>
        Step 2
      </Breadcrumbs.Item>
      <Breadcrumbs.Item disabled onClick={(_, step) => setValue(step)}>
        Step 3
      </Breadcrumbs.Item>
    </Breadcrumbs>
  )
}

OnClick.parameters = {
  docs: {
    storyDescription:
      'You can make `Breadcrumbs.Item` clickable with `onClick` handler which pass `(event, stepClicked)` params. You can also disabled the onClick handler by using `disabled` prop',
  },
}
