import type { StoryFn } from '@storybook/react'
import { SelectInputV2 } from '..'
import { Stack } from '../../Stack'
import {
  OptionalInfo,
  OptionalInfo2,
  OptionalInfo3,
  OptionalInfo4,
} from './resources'

export const AdditionalInfo: StoryFn<typeof SelectInputV2> = args => (
  <Stack gap="2" width="50%">
    <SelectInputV2
      {...args}
      options={OptionalInfo}
      label="Bigger badge - right"
      optionalInfoPlacement="right"
    />
    <SelectInputV2
      {...args}
      options={OptionalInfo2}
      optionalInfoPlacement="right"
      label="Right"
    />
    <SelectInputV2
      {...args}
      options={OptionalInfo3}
      optionalInfoPlacement="left"
      label="Left"
    />
    <SelectInputV2
      {...args}
      options={OptionalInfo4}
      optionalInfoPlacement="right"
      label="Right"
    />
  </Stack>
)

AdditionalInfo.args = {
  name: 'example',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: false,
  disabled: false,
  helper: 'helper',
}

AdditionalInfo.parameters = {
  docs: {
    description: {
      story:
        'It is possible to specify "additional information" to options individually. This additional information if optional  and will no be shown when the option is selected. It is possible to globally choose its position in the dropdown (left or right of the label) with the prop `OptionalInfoPlacemnet`.',
    },
  },
}
