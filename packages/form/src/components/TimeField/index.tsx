import { TimeInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { BaseFieldProps } from '../../types'

const parseTime = (date?: Date | string): { label: string; value: string } => {
  const timeStr =
    date && typeof date !== 'string'
      ? date.toLocaleTimeString().slice(0, -3)
      : ''

  return {
    label: timeStr,
    value: timeStr,
  }
}

type TimeFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TName> &
  Omit<ComponentProps<typeof TimeInput>, 'onChange'> & {
    name: string
  }

export const TimeField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  required,
  name,
  schedule,
  placeholder,
  disabled,
  readOnly,
  onBlur,
  onFocus,
  onChange,
  isLoading,
  isClearable,
  inputId,
  id,
  animation,
  animationDuration,
  animationOnChange,
  className,
  isSearchable,
  rules,
  options,
  'data-testid': dataTestId,
  shouldUnregister = false,
}: TimeFieldProps<TFieldValues, TName>) => {
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
    <TimeInput
      name={field.name}
      placeholder={placeholder}
      schedule={schedule}
      required={required}
      value={parseTime(field.value)}
      onChange={val => {
        if (!val) return
        onChange?.(val as PathValue<TFieldValues, Path<TFieldValues>>)
        const [hours, minutes] = (
          val as { value: string; label: string }
        ).value.split(':')
        const date = field.value ? new Date(field.value) : new Date()
        date.setHours(Number(hours), Number(minutes), 0)
        field.onChange(date)
      }}
      onBlur={event => {
        field.onBlur()
        onBlur?.(event)
      }}
      onFocus={event => {
        onFocus?.(event)
      }}
      error={error?.message}
      disabled={disabled}
      readOnly={readOnly}
      animation={animation}
      animationDuration={animationDuration}
      animationOnChange={animationOnChange}
      className={className}
      isLoading={isLoading}
      isClearable={isClearable}
      isSearchable={isSearchable}
      inputId={inputId}
      id={id}
      options={options}
      data-testid={dataTestId}
    />
  )
}
