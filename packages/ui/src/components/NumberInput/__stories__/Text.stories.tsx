import { Template } from './Template.stories'

export const Text = Template.bind({})

Text.args = {
  text: 'GB',
  placeholder: 'Storage in GB',
}

Text.parameters = {
  docs: {
    storyDescription:
      'You can change text inside NumberInput by using `text` prop. You can pass directly a text or a component.',
  },
}
