import {
  Form,
  SelectInputFieldV2,
  TextInputFieldV2,
  useForm,
} from '@ultraviolet/form'
import { Button, Modal, TextInputV2 } from '@ultraviolet/ui'
import { useState } from 'react'
import { mockErrors } from '../../mocks/mockErrors'

const Render = () => {
  const methods = useForm<{ lastName: ''; color: '' }>()
  const [firstName, setFirstName] = useState<string>()

  return (
    <Modal disclosure={<Button>Open Modal</Button>}>
      <TextInputV2
        label="First name"
        onChangeValue={setFirstName}
        value={firstName}
      />
      <div data-testid="input-value">{firstName}</div>

      <Form errors={mockErrors} onSubmit={() => {}} methods={methods}>
        <TextInputFieldV2
          name="lastName"
          label="Last name"
          control={methods.control}
        />
        <div data-testid="form-content">{methods.watch().lastName}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <SelectInputFieldV2
            name="color"
            label="Color"
            size="medium"
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
          />
        </div>
      </Form>
    </Modal>
  )
}
export default Render
