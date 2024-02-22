import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { Conversation } from '..'

export const Template: StoryFn<ComponentProps<typeof Conversation>> = ({
  ...props
}) => <Conversation {...props} />
