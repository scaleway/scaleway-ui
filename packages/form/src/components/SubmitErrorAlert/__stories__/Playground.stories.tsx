import { Stack } from '@scaleway/ui'
import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { FORM_ERROR, Submit, SubmitErrorAlert } from '../../..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

export const Playground: StoryFn<
  ComponentProps<typeof SubmitErrorAlert>
> = () => (
  <Form
    errors={mockErrors}
    onRawSubmit={() => ({ [FORM_ERROR]: 'An error occurred' })}
  >
    <Stack gap={1}>
      <SubmitErrorAlert />
      <Submit>Click Me</Submit>
    </Stack>
  </Form>
)
