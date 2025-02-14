import { Badge } from '../../Badge'
import { Template } from './Template'

export const LabelDescription = Template.bind({})

LabelDescription.args = {
  children: 'Label',
  labelDescription: (
    <Badge size="small" sentiment="info">
      badge
    </Badge>
  ),
}
