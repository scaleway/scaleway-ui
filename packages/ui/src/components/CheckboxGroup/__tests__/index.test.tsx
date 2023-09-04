import { describe, expect, test } from '@jest/globals'
import { render } from '@testing-library/react'
import { CheckboxGroup } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('CheckboxGroup', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <CheckboxGroup onChange={() => {}} name="Checkbox" legend="Label">
        <CheckboxGroup.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox name="value-2" value="value-2">
          Checkbox 2
        </CheckboxGroup.Checkbox>
      </CheckboxGroup>,
    ))

  test('renders correctly with no CheckboxGroup.Checkbox name', () =>
    shouldMatchEmotionSnapshot(
      <CheckboxGroup onChange={() => {}} name="Checkbox" legend="Label">
        <CheckboxGroup.Checkbox value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox value="value-2">
          Checkbox 2
        </CheckboxGroup.Checkbox>
      </CheckboxGroup>,
    ))

  test('renders correctly with direction row', () =>
    shouldMatchEmotionSnapshot(
      <CheckboxGroup
        onChange={() => {}}
        name="Checkbox"
        legend="Label"
        direction="row"
      >
        <CheckboxGroup.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox name="value-2" value="value-2">
          Checkbox 2
        </CheckboxGroup.Checkbox>
      </CheckboxGroup>,
    ))

  test('renders correctly with helper content', () =>
    shouldMatchEmotionSnapshot(
      <CheckboxGroup
        onChange={() => {}}
        name="Checkbox"
        legend="Label"
        helper="Helper content"
      >
        <CheckboxGroup.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox name="value-2" value="value-2">
          Checkbox 2
        </CheckboxGroup.Checkbox>
      </CheckboxGroup>,
    ))

  test('renders correctly with error content', () =>
    shouldMatchEmotionSnapshot(
      <CheckboxGroup
        onChange={() => {}}
        name="Checkbox"
        legend="Label"
        error="Eror content"
      >
        <CheckboxGroup.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox name="value-2" value="value-2">
          Checkbox 2
        </CheckboxGroup.Checkbox>
      </CheckboxGroup>,
    ))

  test('renders correctly with required prop', () =>
    shouldMatchEmotionSnapshot(
      <CheckboxGroup
        onChange={() => {}}
        name="Checkbox"
        legend="Label"
        required
      >
        <CheckboxGroup.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox name="value-2" value="value-2">
          Checkbox 2
        </CheckboxGroup.Checkbox>
      </CheckboxGroup>,
    ))

  test('throws if CheckboxGroup.Checkbox used without CheckboxGroup', () => {
    expect(() =>
      render(
        <CheckboxGroup.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>,
      ),
    ).toThrow('CheckboxGroup.Checkbox can only be used inside a CheckboxGroup')
  })
})
