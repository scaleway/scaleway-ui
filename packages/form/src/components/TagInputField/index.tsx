import { TagInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { BaseFieldProps } from '../../types'

export type TagInputFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TName> &
  Partial<
    Pick<
      ComponentProps<typeof TagInput>,
      | 'tags'
      | 'variant'
      | 'placeholder'
      | 'disabled'
      | 'className'
      | 'id'
      | 'data-testid'
    >
  >

export const TagInputField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  disabled,
  id,
  name,
  onChange,
  placeholder,
  required,
  rules,
  variant,
  shouldUnregister = false,
  'data-testid': dataTestId,
}: TagInputFieldProps<TFieldValues, TName>) => {
  const { field } = useController<TFieldValues>({
    name,
    rules: {
      required,
      shouldUnregister,
      ...rules,
    },
  })

  return (
    <TagInput
      name={field.name}
      className={className}
      disabled={disabled}
      id={id}
      onChange={event => {
        field.onChange(event)
        onChange?.(event as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      placeholder={placeholder}
      variant={variant}
      tags={field.value}
      data-testid={dataTestId}
    />
  )
}
