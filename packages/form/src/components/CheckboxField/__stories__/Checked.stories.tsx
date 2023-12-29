import type { StoryFn } from '@storybook/react'
import { CheckboxField } from '..'
import type { FormErrors } from '../../../types'
import { Form } from '../../Form'

export const Checked: StoryFn<{ errors: FormErrors }> = ({ errors }) => (
  <Form onRawSubmit={() => {}} errors={errors} initialValues={{ foo: ['bar'] }}>
    <CheckboxField name="foo" value="bar">
      Checked Item
    </CheckboxField>
    <CheckboxField name="foo" value="nope">
      Not Checked Item
    </CheckboxField>
  </Form>
)
