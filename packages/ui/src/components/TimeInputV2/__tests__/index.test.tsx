import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { TimeInputV2 } from '..'

const DEFAULT_VALUE = new Date('01/01/2000 11:23:14')

describe('TimeInput', () => {
  test('renders correctly with base props', () =>
    shouldMatchEmotionSnapshot(<TimeInputV2 />))

  test('renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(<TimeInputV2 label="test" disabled />))

  test('renders correctly readOnly', () =>
    shouldMatchEmotionSnapshot(<TimeInputV2 label="test" readOnly />))

  test('renders correctly with error', () =>
    shouldMatchEmotionSnapshot(<TimeInputV2 label="test" error="error" />))

  test('renders correctly clearable', () =>
    shouldMatchEmotionSnapshot(<TimeInputV2 label="test" clearable />))

  test('renders correctly required', () =>
    shouldMatchEmotionSnapshot(<TimeInputV2 label="test" required />))

  test('renders correctly small', () =>
    shouldMatchEmotionSnapshot(<TimeInputV2 label="test" size="small" />))

  test('renders correctly large', () =>
    shouldMatchEmotionSnapshot(<TimeInputV2 label="test" size="large" />))

  test('renders correctly with 12-hour format', () =>
    shouldMatchEmotionSnapshot(<TimeInputV2 label="test" timeFormat={12} />))

  test('renders correctly with label description and helper', () =>
    shouldMatchEmotionSnapshot(
      <TimeInputV2
        label="label"
        labelDescription={<h1>label</h1>}
        helper="helper"
      />,
    ))

  test('renders correctly with helper and error', () =>
    shouldMatchEmotionSnapshot(
      <TimeInputV2
        label="label"
        labelDescription="label description"
        helper="helper"
        error
      />,
    ))

  test('renders correctly controlled - 12-hour format', async () => {
    const mockOnChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <TimeInputV2
        label="label"
        labelDescription="labeldescription"
        helper="helper"
        onChange={mockOnChange}
        value={DEFAULT_VALUE}
        timeFormat={12}
      />,
    )
    const hours = screen.getByTestId('hours-input')
    const period = screen.getByTestId('am-pm-input')
    const seconds = screen.getByTestId('seconds-input')

    await userEvent.type(hours, '12')
    expect(hours).toHaveValue('12')

    await userEvent.type(seconds, '7')
    expect(period).toHaveFocus()

    await userEvent.type(period, 'p')
    expect(period).toHaveValue('PM')

    await userEvent.type(period, 'A')
    expect(period).toHaveValue('AM')

    await userEvent.type(period, 'P')
    expect(period).toHaveValue('PM')

    await userEvent.type(period, 'a')
    expect(period).toHaveValue('AM')

    expect(mockOnChange).toHaveBeenCalled()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly controlled - 24-hours format', async () => {
    const mockOnChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <TimeInputV2
        label="label"
        labelDescription="labeldescription"
        helper="helper"
        onChange={mockOnChange}
        value={DEFAULT_VALUE}
        timeFormat={24}
      />,
    )
    const hours = screen.getByTestId('hours-input')
    const minutes = screen.getByTestId('minutes-input')
    const seconds = screen.getByTestId('seconds-input')

    await userEvent.type(minutes, '3')
    expect(mockOnChange).toHaveBeenCalledOnce()
    expect(minutes).toHaveValue('03')

    await userEvent.type(minutes, '2')
    expect(minutes).toHaveValue('32')
    expect(seconds).toHaveFocus()

    await userEvent.type(seconds, '31')
    expect(seconds).toHaveValue('31')

    await userEvent.type(hours, '23')
    expect(hours).toHaveValue('23')

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly clearable', async () => {
    const mockOnChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <TimeInputV2
        label="label"
        labelDescription="labeldescription"
        helper="helper"
        onChange={mockOnChange}
        value={DEFAULT_VALUE}
        timeFormat={12}
        clearable
      />,
    )
    await userEvent.click(screen.getByTestId('clear'))
    expect(mockOnChange).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders can move with arrow keys - 12-hour format', async () => {
    const mockOnChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <TimeInputV2
        label="label"
        labelDescription="labeldescription"
        helper="helper"
        onChange={mockOnChange}
        value={DEFAULT_VALUE}
        timeFormat={12}
      />,
    )

    const hours = screen.getByTestId('hours-input')
    const seconds = screen.getByTestId('seconds-input')
    const period = screen.getByTestId('am-pm-input')

    await userEvent.click(hours)
    await userEvent.keyboard('[ArrowUp][ArrowUp]')
    expect(hours).toHaveValue('01')
    expect(mockOnChange).toHaveBeenCalledTimes(2)
    await userEvent.keyboard('[ArrowDown]')
    expect(hours).toHaveValue('12')

    await userEvent.click(period)
    await userEvent.keyboard('[ArrowDown]')
    expect(period).toHaveValue('PM')

    await userEvent.keyboard('[ArrowLeft]')
    expect(seconds).toHaveFocus()

    await userEvent.keyboard('[ArrowRight]')
    expect(period).toHaveFocus()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders can move with arrow keys - 24-hour format', async () => {
    const mockOnChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <TimeInputV2
        label="label"
        labelDescription="labeldescription"
        helper="helper"
        onChange={mockOnChange}
        value={DEFAULT_VALUE}
        timeFormat={24}
        clearable
      />,
    )
    const hours = screen.getByTestId('hours-input')
    const minutes = screen.getByTestId('minutes-input')
    const seconds = screen.getByTestId('seconds-input')

    await userEvent.click(seconds)
    await userEvent.keyboard('[ArrowUp]')
    expect(seconds).toHaveValue('15')
    expect(mockOnChange).toHaveBeenCalledOnce()
    await userEvent.keyboard('[ArrowDown]')
    expect(seconds).toHaveValue('14')

    await userEvent.click(minutes)
    await userEvent.keyboard('[ArrowUp]')
    expect(minutes).toHaveValue('24')
    await userEvent.keyboard('[ArrowDown]')
    expect(minutes).toHaveValue('23')

    await userEvent.type(hours, '23')
    await userEvent.click(hours)
    await userEvent.keyboard('[ArrowUp]')
    expect(hours).toHaveValue('00')
    await userEvent.keyboard('[ArrowDown]')
    expect(hours).toHaveValue('23')

    await userEvent.keyboard('[ArrowRight]')
    expect(minutes).toHaveFocus()

    await userEvent.keyboard('[ArrowLeft]')
    expect(hours).toHaveFocus()

    expect(asFragment()).toMatchSnapshot()
  })
})
