import { ThemeProvider } from '@emotion/react'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import Link, { LinkProps, linkVariants } from '..'
import theme from '../../../theme'

export default {
  component: Link,
  parameters: {
    docs: {
      description: {
        component:
          'An Expandable is a container that can hide or show its content',
      },
    },
  },
  title: 'Components/Foundation/Link',
} as Meta

const Template: Story<LinkProps> = args => <Link {...args}>Basic Link</Link>

export const Default = Template.bind({})

export const Variants = Template.bind({})
Variants.parameters = {
  docs: {
    storyDescription:
      'Using `variant` prop you can change the look and feel of the component.',
  },
}
Variants.decorators = [
  () => (
    <div style={{ backgroundColor: '#eeeeff' }}>
      {linkVariants.map(variant => (
        <div>
          <Link key={variant} href="localhost:6006" variant={variant}>
            {variant}
          </Link>
        </div>
      ))}
    </div>
  ),
]

export const Target = Template.bind({})
Target.parameters = {
  docs: {
    storyDescription:
      'Using `target` prop you can change specify the target you want for your link.',
  },
}
Target.decorators = [
  () => (
    <Link href="localhost:6006" target="_blank">
      Link opens in a new tab
    </Link>
  ),
]

export const AbsoluteURLs = Template.bind({})
AbsoluteURLs.parameters = {
  docs: {
    storyDescription:
      'Absolute URLs (starting by `http` or `https`) are automatically detected in `to`. If detected, a `a` tag is used instead of the default `linkComponent` specified in the theme.',
  },
}
AbsoluteURLs.decorators = [
  () => <Link href="https://localhost:6006">Absolute URL</Link>,
]

export const LinkComponent = Template.bind({})
LinkComponent.parameters = {
  docs: {
    storyDescription:
      'By default link is a `a`. You can specify a custom component (like React Router Link) by changing the theme entry `linkComponent`.',
  },
}
LinkComponent.decorators = [
  () => (
    <ThemeProvider theme={{ ...theme, linkComponent: 'span' }}>
      <Link href="localhost:6006">Link Component</Link>
    </ThemeProvider>
  ),
]
