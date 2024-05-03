import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import { Submit } from '..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

export const Playground: StoryFn<ComponentProps<typeof Submit>> = ({
  children,
  ...props
}) => {
  const methods = useForm()

  return (
    <Form onSubmit={() => {}} errors={mockErrors} methods={methods}>
      <Submit {...props}>This form is ready to submit</Submit>
    </Form>
  )
}
