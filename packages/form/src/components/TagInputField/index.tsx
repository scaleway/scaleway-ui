import { TagInput } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues, Path, PathValue } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

export type TagInputFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = BaseFieldProps<TFieldValues, TFieldName> &
  Partial<
    Pick<
      ComponentProps<typeof TagInput>,
      | 'variant'
      | 'placeholder'
      | 'disabled'
      | 'className'
      | 'id'
      | 'data-testid'
      | 'clearable'
      | 'label'
      | 'labelDescription'
      | 'size'
      | 'success'
      | 'readOnly'
      | 'tooltip'
    >
  >

export const TagInputField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  disabled,
  id,
  control,
  name,
  onChange,
  placeholder,
  required,
  variant,
  shouldUnregister = false,
  'data-testid': dataTestId,
  clearable,
  label,
  labelDescription,
  size,
  success,
  readOnly,
  tooltip,
  validate,
}: TagInputFieldProps<TFieldValues, TFieldName>) => {
  const { getError } = useErrors()
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    control,
    rules: {
      required,
      shouldUnregister,
      validate,
    },
  })

  return (
    <TagInput
      name={field.name}
      className={className}
      disabled={disabled}
      id={id}
      onChange={newTags => {
        field.onChange(newTags)
        onChange?.(newTags as PathValue<TFieldValues, Path<TFieldValues>>)
      }}
      placeholder={placeholder}
      variant={variant}
      value={field.value}
      data-testid={dataTestId}
      clearable={clearable}
      label={label}
      labelDescription={labelDescription}
      size={size}
      success={success}
      error={getError({ label: label ?? '' }, error)}
      readOnly={readOnly}
      tooltip={tooltip}
    />
  )
}
