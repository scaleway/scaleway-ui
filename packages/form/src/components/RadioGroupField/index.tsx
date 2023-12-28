import { RadioGroup } from '@ultraviolet/ui'
import type { ComponentProps, JSX } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type RadioGroupFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TName> &
  Partial<
    Pick<
      ComponentProps<typeof RadioGroup>,
      'legend' | 'children' | 'error' | 'helper' | 'direction'
    >
  > & {
    className?: string
  }

export const RadioGroupField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  legend = '',
  name,
  onChange,
  required,
  rules,
  children,
  label = '',
  error: customError,
  helper,
  direction,
  shouldUnregister = false,
}: RadioGroupFieldProps<TFieldValues, TName>): JSX.Element => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    shouldUnregister,
    rules: {
      required,
      ...rules,
    },
  })

  return (
    <RadioGroup
      className={className}
      name={field.name}
      onChange={event => {
        field.onChange(event)
        onChange?.(
          event.target.value as PathValue<TFieldValues, Path<TFieldValues>>,
        )
      }}
      required={required}
      value={field.value}
      legend={legend}
      error={getError({ label }, error) ?? customError}
      helper={helper}
      direction={direction}
    >
      {children}
    </RadioGroup>
  )
}

RadioGroupField.Radio = RadioGroup.Radio
