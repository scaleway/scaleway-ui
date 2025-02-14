import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { Label } from '..'

describe('DateInput', () => {
  test('renders correctly with default props', () => {
    const { asFragment } = renderWithTheme(<Label>Label</Label>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly required', () => {
    const { asFragment } = renderWithTheme(<Label required>Label</Label>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with label description (string)', () => {
    const { asFragment } = renderWithTheme(
      <Label labelDescription="test">Label</Label>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with label description (ReactNode)', () => {
    const { asFragment } = renderWithTheme(
      <Label labelDescription={<div>test</div>}>Label</Label>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  test('renders correctly small', () => {
    const { asFragment } = renderWithTheme(<Label size="small">Label</Label>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly medium', () => {
    const { asFragment } = renderWithTheme(<Label size="medium">Label</Label>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly large', () => {
    const { asFragment } = renderWithTheme(<Label size="large">Label</Label>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with htmlFor', async () => {
    const { asFragment } = renderWithTheme(
      <div>
        <Label size="small" htmlFor="id" id="id-label">
          Label
        </Label>
        <input id="id" data-testid="test-input" />
      </div>,
    )

    const input = screen.getByTestId('test-input')
    const label = screen.getByText('Label')

    await userEvent.click(label)
    expect(input).toHaveFocus()
    expect(asFragment()).toMatchSnapshot()
  })
})
