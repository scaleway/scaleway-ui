import { Template } from './Template.stories'

export const Error = Template.bind({})

Error.args = {
  error: 'Please select at least one of the options.',
}

Error.parameters = {
  docs: {
    description: { story: 'Use the `error` prop to set an error content.' },
  },
}
