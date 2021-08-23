import { ThemeProvider } from '@emotion/react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import RadioBorderedBox from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'
import theme from '../../../theme'

describe('RadioBorderedBox', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <RadioBorderedBox
        label="Choice"
        onChange={() => {}}
        name="radio"
        value="choice"
      >
        Choice description
      </RadioBorderedBox>,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(
      <RadioBorderedBox
        label="Choice"
        onChange={() => {}}
        name="radio"
        value="choice"
        disabled
      >
        Choice description
      </RadioBorderedBox>,
    ))

  test('renders correctly when checked', () =>
    shouldMatchEmotionSnapshot(
      <RadioBorderedBox
        label="Choice"
        onChange={() => {}}
        name="radio"
        value="choice"
        checked
      >
        Choice description
      </RadioBorderedBox>,
    ))

  test('renders correctly with label desc and badge', () =>
    shouldMatchEmotionSnapshot(
      <RadioBorderedBox
        label="Choice"
        labelDescription="(something)"
        badgeText="Badge"
        badgeVariant="warning"
        badgeSize="small"
        onChange={() => {}}
        name="radio"
        value="choice"
        disabled
      >
        Choice description
      </RadioBorderedBox>,
    ))

  test('renders correctly and triggers change on borderedbox click', async () => {
    let choice
    render(
      <ThemeProvider theme={theme}>
        <RadioBorderedBox
          checked={choice === 'choice1'}
          id="radiotest"
          label="Choice 1"
          name="radioborderedbox"
          value="choice1"
          onChange={evt => {
            choice = evt.target.value
          }}
        >
          Choice 1 description
        </RadioBorderedBox>
      </ThemeProvider>,
    )
    const box = document.getElementById('radiotest')
    userEvent.click(box)
    await waitFor(() => expect(choice).toBe('choice1'))
  })
})
