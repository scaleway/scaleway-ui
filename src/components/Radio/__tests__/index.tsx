import React from 'react'
import Radio from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Radio', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <Radio onChange={() => {}} name="radio" value="choice">
        Choice
      </Radio>,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(
      <Radio onChange={() => {}} name="radio" value="choice" disabled>
        Choice
      </Radio>,
    ))

  test('renders correctly when checked', () =>
    shouldMatchEmotionSnapshot(
      <Radio onChange={() => {}} name="radio" value="choice" checked>
        Choice
      </Radio>,
    ))
})
