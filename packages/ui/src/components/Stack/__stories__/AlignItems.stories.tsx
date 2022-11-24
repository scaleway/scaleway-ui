import { Template } from './Template.stories'
import { coloredChildren } from './helper'

export const AlignItems = Template.bind({})

AlignItems.parameters = {
  docs: {
    storyDescription:
      'The prop `alignItems` supports every value of css property `align-items`',
  },
}

AlignItems.args = {
  children: coloredChildren,
  gap: 2,
  alignItems: 'center',
}
