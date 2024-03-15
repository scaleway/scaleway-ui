import { Template } from './Template.stories'
import { dataGrouped } from './resources'

export const Grouped = Template.bind({})

Grouped.args = { ...Template.args, options: dataGrouped, grouped: true }
Grouped.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]