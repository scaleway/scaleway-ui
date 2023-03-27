import { act, fireEvent, screen } from '@testing-library/react'
import { SelectInputField } from '..'
import {
  mockRandom,
  restoreRandom,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'

describe('SelectInputField', () => {
  beforeAll(mockRandom)

  afterAll(restoreRandom)

  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SelectInputField name="test">
        <SelectInputField.Option value="value" label="Label" />
      </SelectInputField>,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SelectInputField name="test" disabled>
        <SelectInputField.Option value="value" label="Label" />
        <SelectInputField.Option value="value2" label="Label 2" />
      </SelectInputField>,
    ))

  test('should render correctly multiple', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SelectInputField name="test" multiple>
        <SelectInputField.Option value="value" label="Label" />
        <SelectInputField.Option value="value2" label="Label 2" />
      </SelectInputField>,
    ))

  test('should render correctly with a disabled option', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SelectInputField name="test">
        <SelectInputField.Option value="value" label="Label" />
        <SelectInputField.Option value="value2" label="Label 2" disabled />
      </SelectInputField>,
    ))

  test('should display right value on grouped options', () => {
    const selectedOption = { label: 'Group Label', value: 'Group Value' }
    const options = [
      {
        label: 'Group',
        options: [
          selectedOption,
          { label: 'Group Label 2', value: 'Group value2' },
        ],
      },
    ]

    return shouldMatchEmotionSnapshotFormWrapper(
      <SelectInputField name="test" options={options} />,
      {
        transform: ({ container }) => {
          const select = screen.getByRole<HTMLInputElement>('combobox')
          act(() => select.focus())
          fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 })
          const option = screen.getByTestId(
            `option-test-${selectedOption.value}`,
            // eslint-disable-next-line testing-library/no-node-access
          ).firstChild as HTMLElement

          act(() => option.click())

          // react-select works with a hidden input to handle value.
          // eslint-disable-next-line testing-library/no-node-access
          const hiddenSelectInput = container.querySelector(
            'input[type="hidden"]',
          ) as HTMLInputElement

          const { value } = hiddenSelectInput
          expect(value).toBe(selectedOption.value)
        },
      },
    )
  })

  test('should trigger events', () => {
    const onChange = jest.fn()

    return shouldMatchEmotionSnapshotFormWrapper(
      <SelectInputField
        name="test"
        options={[
          { label: 'Label', value: 'value' },
          { label: 'Label 2', value: 'value2' },
        ]}
        onChange={onChange}
      />,
      {
        transform: () => {
          const select = screen.getByRole('combobox')
          fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 })
          const option =
            // eslint-disable-next-line testing-library/no-node-access
            screen.getByTestId('option-test-value').firstChild as HTMLElement

          act(() => option.click())
          expect(onChange).toBeCalledTimes(1)
          act(() => select.blur())
        },
      },
    )
  })
})
