import type { Meta } from '@storybook/react'
import { TextInput } from '..'

export default {
  component: TextInput,
  parameters: {
    docs: {
      description: {
        component:
          'TextInput component allows users to input text, with options for customization and validation. It supports various input types and should be appropriately sized with clear labeling.',
      },
    },
  },
  title: 'Components/Data Entry/TextInput',
} as Meta<typeof TextInput>

export { Playground } from './Playground.stories'
export { NoLabel } from './NoLabel.stories'
export { Placeholder } from './Placeholder.stories'
export { Sizes } from './Sizes.stories'
export { Disabled } from './Disabled.stories'
export { Required } from './Required.stories'
export { Valid } from './Valid.stories'
export { ReadOnly } from './ReadOnly.stories'
export { Error } from './Error.stories'
export { Notice } from './Notice.stories'
export { ToggleablePassword } from './ToggleablePassword.stories'
export { Unit } from './Unit.stories'
export { Randomize } from './Randomize.stories'
export { ForceEdit } from './ForceEdit.stories'
export { Multiline } from './Multiline.stories'
export { DisableResize } from './DisableResize.stories'
export { TabIndex } from './TabIndex.stories'
export { ToggleableRequired } from './ToggleableRequired.stories'
export { RandomizeRequired } from './RandomizeRequired.stories'
export { UnitRequired } from './UnitRequired.stories'
export { ValidRequired } from './ValidRequired.stories'
export { MultipleRightComponents } from './MultipleRightComponents.stories'
