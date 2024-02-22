import { ThemeProvider } from '@emotion/react'
import { describe, expect, jest, test } from '@jest/globals'
import { renderHook } from '@testing-library/react'
import { theme as lightTheme } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { CheckboxField, Form, TextInputField } from '../../components'
import { mockErrors } from '../../mocks'
import type { CallbackFn } from '../useOnFieldChange'
import { useOnFieldChange } from '../useOnFieldChange'

type FormValues = {
  textInputName: string
  check: boolean
}

type Wrapers = {
  children: ReactNode
  initialValues: FormValues
}

const initial = {
  textInputName: 'test',
  check: true,
}

const updated = {
  textInputName: 'updated',
  check: false,
}

const Wrapper = ({ children, initialValues }: Wrapers) => {
  const methods = useForm({
    values: initialValues,
  })

  return (
    <ThemeProvider theme={lightTheme}>
      <Form<FormValues>
        methods={methods}
        errors={mockErrors}
        onRawSubmit={() => {}}
      >
        {children}
        <CheckboxField name="check" />
        <TextInputField name="textInputName" type="text" />
      </Form>
    </ThemeProvider>
  )
}

describe('useOnFieldChange', () => {
  test('should render correctly', () => {
    const callback = jest.fn((value, values) => {
      expect(value).toBe(updated.textInputName)
      expect(values).toStrictEqual(updated)
    })

    let initialValues = initial

    const { result, rerender } = renderHook(
      () =>
        useOnFieldChange<FormValues, 'textInputName'>(
          'textInputName',
          callback,
        ),
      {
        wrapper: ({ children }) => (
          <Wrapper initialValues={initialValues}>{children}</Wrapper>
        ),
      },
    )

    expect(result.current).toBeUndefined()

    expect(callback).toHaveBeenCalledTimes(0)

    initialValues = updated

    rerender()

    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('should render when condition change', () => {
    const callback =
      jest.fn<CallbackFn<FieldValues, FormValues['textInputName']>>()

    let initialValues = initial

    const { result, rerender } = renderHook(
      ({ enabled }) => {
        useOnFieldChange<FormValues, 'textInputName'>(
          'textInputName',
          callback,
          // enabled will depends of rerender({ condition: '' })
          enabled,
        )
      },
      {
        wrapper: ({ children }) => (
          <Wrapper initialValues={initialValues}>{children}</Wrapper>
        ),

        initialProps: {
          enabled: false,
        },
      },
    )

    expect(result.current).toBeUndefined()

    expect(callback).toHaveBeenCalledTimes(0)

    initialValues = updated

    rerender({ enabled: true })

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
