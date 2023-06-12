import type { Meta, StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { EmptyState } from '..'
import { Button } from '../../Button'
import kapsuleLogo from '../illustrations/kapsule.webp'
import errorImg from '../illustrations/product-error.svg'

export default {
  component: EmptyState,
  title: 'Components/Data Display/EmptyState',
  parameters: {
    docs: {
      description: {
        component:
          'Empty states are moments in an app where there is no data to display to the user. They are most commonly seen the first time a user interacts with a product or page, but can be used when data has been deleted or is unavailable.',
      },
    },
  },
} as Meta<typeof EmptyState>

const Template: StoryFn<ComponentProps<typeof EmptyState>> = args => (
  <EmptyState {...args} />
)

export const Playground = Template.bind({})

Playground.args = {
  title: 'Playground',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  image: kapsuleLogo,
  primaryButton: (
    <Button sentiment="success" icon="plus">
      Create
    </Button>
  ),
  secondaryButton: <Button sentiment="neutral">More info</Button>,
  learnMore: {
    link: 'https://scaleway.com',
    text: 'Learn more',
  },
  bordered: true,
}

export const EmptyList = Template.bind({})
EmptyList.args = {
  title: 'Empty List',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  image: kapsuleLogo,
  primaryButton: (
    <Button sentiment="success" icon="plus">
      Create
    </Button>
  ),
  size: 'medium',
  bordered: true,
}

export const InATinySpace = Template.bind({})
InATinySpace.args = {
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  image: kapsuleLogo,
  primaryButton: (
    <Button variant="outlined" sentiment="primary">
      Create a product
    </Button>
  ),
  size: 'small',
  learnMore: {
    link: 'https://scaleway.com',
    text: 'Learn more',
  },
  bordered: true,
}
InATinySpace.decorators = [
  StoryComponent => (
    <div style={{ margin: '0 auto', width: '350px' }}>
      <StoryComponent />
    </div>
  ),
]

export const AnErrorOccurred = Template.bind({})
AnErrorOccurred.args = {
  title: 'Oops! Something went wrong!',
  description:
    'Our team has been notified and will look into it. In the meantime, you can try refreshing the page.',
  image: errorImg,
  primaryButton: (
    <Button variant="outlined" sentiment="primary">
      Go back to dashboard
    </Button>
  ),
  size: 'medium',
}
