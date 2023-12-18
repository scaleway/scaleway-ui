import { describe, expect, jest, test } from '@jest/globals'
import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextArea } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'

describe('TextArea', () => {
  test('should render correctly with basic props', () =>
    shouldMatchEmotionSnapshot(
      <TextArea label="Test" value="test" onChange={() => {}} />,
    ))

  test('should control the value', () => {
    const onChange = jest.fn<() => string>()

    renderWithTheme(<TextArea label="Test" value="test" onChange={onChange} />)

    const textarea = screen.getByLabelText<HTMLTextAreaElement>('Test')
    expect(textarea.value).toBe('test')
    // userEvent.type do not work here at the moment
    fireEvent.change(textarea, { target: { value: 'another value' } })
    expect(onChange).toHaveBeenCalledWith('another value')
  })

  test('should be clearable', async () => {
    const onChange = jest.fn<() => string>()

    renderWithTheme(
      <TextArea label="Test" value="test" onChange={onChange} clearable />,
    )

    const textarea = screen.getByLabelText<HTMLTextAreaElement>('Test')
    expect(textarea.value).toBe('test')
    const clearableButton = screen.getByLabelText('clear value')
    await userEvent.click(clearableButton)
    expect(onChange).toHaveBeenCalledWith('')
  })

  test('should render correctly when input is disabled', () =>
    shouldMatchEmotionSnapshot(
      <TextArea label="Test" value="test" onChange={() => {}} disabled />,
    ))

  test('should render correctly when input is readOnly', () =>
    shouldMatchEmotionSnapshot(
      <TextArea label="Test" value="test" onChange={() => {}} readOnly />,
    ))

  test('should render correctly when input has a success sentiment', () =>
    shouldMatchEmotionSnapshot(
      <TextArea
        label="Test"
        value="test"
        onChange={() => {}}
        success="success"
      />,
    ))

  test('should render correctly when input  has a error sentiment', () =>
    shouldMatchEmotionSnapshot(
      <TextArea
        label="Test"
        value="test"
        onChange={() => {}}
        error="success"
      />,
    ))

  test('should display success message', () => {
    const onChange = jest.fn<() => string>()
    const successMessage = 'success message'

    renderWithTheme(
      <TextArea
        label="Test"
        value="test"
        onChange={onChange}
        success={successMessage}
      />,
    )

    expect(screen.getByText(successMessage)).toBeDefined()
  })

  test('should display error message', () => {
    const onChange = jest.fn<() => string>()
    const errorMessage = 'error!'

    renderWithTheme(
      <TextArea
        label="Test"
        value="test"
        onChange={onChange}
        success={errorMessage}
      />,
    )

    expect(screen.getByText(errorMessage)).toBeDefined()
  })

  test('should display helper message', () => {
    const onChange = jest.fn<() => string>()
    const helperMessage = 'helper'

    renderWithTheme(
      <TextArea
        label="Test"
        value="test"
        onChange={onChange}
        helper={helperMessage}
      />,
    )

    expect(screen.getByText(helperMessage)).toBeDefined()
  })

  test('should not display helper message when success is displayed', () => {
    const onChange = jest.fn<() => string>()
    const successMessage = 'success message'
    const helperMessage = 'helper'

    renderWithTheme(
      <TextArea
        label="Test"
        value="test"
        onChange={onChange}
        success={successMessage}
        helper={helperMessage}
      />,
    )

    expect(screen.getByText(successMessage)).toBeDefined()
    expect(screen.queryByText(helperMessage)).toBeNull()
  })

  test('should not display helper message when error is displayed', () => {
    const onChange = jest.fn<() => string>()
    const error = 'error!'
    const helperMessage = 'helper'

    renderWithTheme(
      <TextArea
        label="Test"
        value="test"
        onChange={onChange}
        error={error}
        helper={helperMessage}
      />,
    )

    expect(screen.getByText(error)).toBeDefined()
    expect(screen.queryByText(helperMessage)).toBeNull()
  })
})
