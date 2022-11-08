import { DecoratorFunction } from '@storybook/addons'
import { ComponentProps } from 'react'
import Icon from '..'

const colors: ComponentProps<typeof Icon>['color'][] = [
  'primary',
  'success',
  'warning',
]

export const Color = (args: ComponentProps<typeof Icon>) =>
  colors.map(color => <Icon key={color} name="eye" color={color} {...args} />)

Color.parameters = {
  docs: {
    storyDescription: 'Set size using `size` property.',
  },
}

Color.decorators = [
  Story => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 16 }}>
      <Story />
    </div>
  ),
] as DecoratorFunction<JSX.Element>[]
