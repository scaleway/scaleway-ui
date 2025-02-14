import { fireEvent, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { TagInput } from '..'

describe('TagInput', () => {
  it('should renders correctly', () =>
    shouldMatchEmotionSnapshot(<TagInput onChange={() => {}} />))

  it('should renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(<TagInput disabled />))

  it('should renders correctly readOnly', () =>
    shouldMatchEmotionSnapshot(<TagInput readOnly />))

  it('should renders correctly with label', () =>
    shouldMatchEmotionSnapshot(<TagInput label="Label" />))

  it('should renders correctly with labelDescription', () =>
    shouldMatchEmotionSnapshot(
      <TagInput labelDescription={<div>label description</div>} />,
    ))

  it('should renders correctly with error', () =>
    shouldMatchEmotionSnapshot(<TagInput error="This is an error" />))

  it('should renders correctly with success', () =>
    shouldMatchEmotionSnapshot(<TagInput success="This is a success" />))

  it('should renders correctly with placeholder', () =>
    shouldMatchEmotionSnapshot(<TagInput placeholder="Enter a value here" />))

  it('should renders correctly with some tags', () =>
    shouldMatchEmotionSnapshot(
      <TagInput onChange={() => {}} name="radio" value={['hello', 'world']} />,
    ))

  it('should renders correctly with some tags objects', () =>
    shouldMatchEmotionSnapshot(
      <TagInput
        onChange={() => {}}
        name="radio"
        value={[
          { index: 'index', label: 'hello' },
          { index: 'secondIndex', label: 'world' },
        ]}
      />,
    ))

  it('should be able to be controlled', async () => {
    const mockOnChange = vi.fn()

    renderWithTheme(<TagInput value={['first']} onChange={mockOnChange} />)
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, 'new ')
    expect(mockOnChange).toHaveBeenCalledWith(['first', 'new'])
  })

  it('should be clearable', async () => {
    const mockOnChange = vi.fn()

    renderWithTheme(
      <TagInput value={['first']} onChange={mockOnChange} clearable />,
    )
    const clearableButton = screen.getByLabelText('clear value')
    await userEvent.click(clearableButton)
    expect(mockOnChange).toHaveBeenCalledWith([])
  })

  it('should delete tag', async () => {
    const mockOnChange = vi.fn()

    renderWithTheme(
      <TagInput value={['first', 'second']} onChange={mockOnChange} />,
    )

    const firstTag = screen.queryByText(/first/)
    expect(firstTag).toBeInTheDocument()
    // remove Tag
    const tagsClose = screen.getAllByTestId('close-tag')
    const firstCloseTag = tagsClose[0]
    await userEvent.click(firstCloseTag)
    // check Tag was removed
    expect(firstTag).not.toBeInTheDocument()
    expect(mockOnChange).toHaveBeenCalledWith(['second'])
  })

  it('should delete tag with backspace', async () => {
    const mockOnChange = vi.fn()
    renderWithTheme(
      <TagInput
        id="test"
        onChange={mockOnChange}
        name="radio"
        value={['hello', 'world']}
      />,
    )
    const input = screen.getByRole<HTMLInputElement>('textbox')
    const lastTag = screen.queryByText(/world/)
    expect(lastTag).toBeInTheDocument()
    await userEvent.click(input)
    expect(input).toHaveFocus()
    await userEvent.keyboard('{backspace}')
    expect(lastTag).not.toBeInTheDocument()
    expect(mockOnChange).toHaveBeenCalledWith(['hello'])
  })

  it('should add tag on paste', async () => {
    const mockOnChange = vi.fn()
    renderWithTheme(
      <TagInput
        id="test"
        onChange={mockOnChange}
        name="radio"
        value={['hello', 'world']}
      />,
    )
    const input = screen.getByRole<HTMLInputElement>('textbox')
    fireEvent.paste(input, {
      clipboardData: { getData: () => 'test' },
    })
    await waitFor(() => expect(input.value).toBe(''))
    expect(mockOnChange).toHaveBeenCalledWith(['hello', 'world', 'test'])
  })
})
