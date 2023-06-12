import type { StoryFn } from '@storybook/react'
import { CheckboxField } from '..'
import type { FormProps } from '../../Form'
import { Form } from '../../Form'

export const BooleanChecked: StoryFn<FormProps> = ({ errors }) => (
  <Form onRawSubmit={() => {}} errors={errors} initialValues={{ foo: true }}>
    <CheckboxField name="foo">Default Checked Boolean Item</CheckboxField>
  </Form>
)
