import type { StoryFn } from '@storybook/react'
import type { FormErrors } from '../../../types'
import { CheckboxField } from '..'
import { Form } from '../../Form'

export const BooleanChecked: StoryFn<{ errors: FormErrors }> = ({ errors }) => (
  <Form onRawSubmit={() => {}} errors={errors} initialValues={{ foo: true }}>
    <CheckboxField name="foo">Default Checked Boolean Item</CheckboxField>
  </Form>
)
