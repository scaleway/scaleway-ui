import {
  Form,
  SelectInputFieldV2,
  TextInputFieldV2,
  useForm,
} from '@ultraviolet/form'
import { Button, Modal, Stack, Text, TextInputV2 } from '@ultraviolet/ui'
import { useState } from 'react'
import { mockErrors } from '../../mocks/mockErrors'

const Render = () => {
  const methods = useForm<{ lastName: ''; color: '' }>()
  const [firstName, setFirstName] = useState<string>()

  return (
    <Modal disclosure={<Button>Open Modal</Button>}>
      <Stack gap={1}>
        <TextInputV2
          label="First name"
          onChangeValue={setFirstName}
          value={firstName}
        />
        <div data-testid="input-value">{firstName}</div>

        <Form errors={mockErrors} onSubmit={() => {}} methods={methods}>
          <Stack gap={1}>
            <TextInputFieldV2
              name="lastName"
              label="Last name"
              control={methods.control}
            />
            <div data-testid="form-content">{methods.watch().lastName}</div>

            <SelectInputFieldV2
              name="color"
              label="Color"
              control={methods.control}
              options={[
                {
                  label: 'Red',
                  value: 'red',
                },
                {
                  label: 'Green',
                  value: 'green',
                },
                {
                  label: 'Blue',
                  value: 'blue',
                },
              ]}
              footer={
                <Modal disclosure={<Button>Open Nested Modal</Button>}>
                  <Text as="p" variant="body">
                    This is the nested modal
                  </Text>
                </Modal>
              }
            />
          </Stack>
        </Form>
      </Stack>
    </Modal>
  )
}
export default Render
