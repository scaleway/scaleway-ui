import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TagInputField } from '../..'
import { shouldMatchEmotionSnapshotFormWrapper } from '../../../../.jest/helpers'

describe('ToggleField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TagInputField name="test" placeholder="placeholder" />,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TagInputField name="test-disabled" placeholder="placeholder" disabled />,
    ))

  test('should render correctly with default tags', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TagInputField
        name="test-tags"
        placeholder="placeholder"
        tags={['tags-1', 'tags-2']}
      />,
    ))
  test('should render correctly with default tags on initialValues Form', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TagInputField name="formTags" placeholder="placeholder" />,
      {},
      {
        initialValues: {
          formTags: ['tags-1', 'tags-2'],
        },
      },
    ))

  test('should render correctly with default tags on initialValues Form', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TagInputField name="formTags" placeholder="placeholder" />,
      {
        transform: async () => {
          const input = screen.getByDisplayValue<HTMLInputElement>('')
          await userEvent.type(input, 'test{enter}')
          await waitFor(() => expect(input.value).toBe(''))
          expect(screen.getByText('test')).toBeInTheDocument()
        },
      },
      {
        initialValues: {
          formTags: ['tags-1', 'tags-2'],
        },
      },
    ))
})
