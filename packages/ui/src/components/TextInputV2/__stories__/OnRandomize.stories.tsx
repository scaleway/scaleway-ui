import type { StoryFn } from '@storybook/react'
import { useState } from 'react'
import { TextInput } from '..'

export const OnRandomize: StoryFn<typeof TextInput> = ({ ...args }) => {
  const [value, setValue] = useState<string | undefined>(args.value)

  return (
    <TextInput
      {...args}
      value={value}
      onChange={setValue}
      onRandomize={() => {
        setValue(`randomValue-${Math.round(Math.random() * 1000)}`)
      }}
    />
  )
}

OnRandomize.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  value: 'Text',
}