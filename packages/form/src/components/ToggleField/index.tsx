import { Toggle } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type ToggleFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = Omit<BaseFieldProps<TFieldValues, TFieldName>, 'label'> &
  Pick<
    ComponentProps<typeof Toggle>,
    | 'disabled'
    | 'label'
    | 'onChange'
    | 'size'
    | 'tooltip'
    | 'labelPosition'
    | 'className'
    | 'data-testid'
  > & {
    parse?: (value: boolean) => any
    format?: (value: any) => boolean
  }

export const ToggleField = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  disabled,
  label,
  name,
  control,
  onChange,
  required,
  size,
  tooltip,
  labelPosition,
  parse,
  format,
  'data-testid': dataTestId,
  shouldUnregister = false,
  validate,
}: ToggleFieldProps<TFieldValues, TFieldName>) => {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TFieldName>({
    name,
    control,
    shouldUnregister,
    rules: {
      required,
      validate,
    },
  })
  const { getError } = useErrors()

  const transformedValue = () => {
    if (format) {
      return format(field.value)
    }

    return field.value as boolean
  }

  return (
    <Toggle
      name={field.name}
      ref={field.ref}
      checked={transformedValue()}
      tooltip={tooltip}
      onChange={event => {
        if (parse) {
          field.onChange(parse(event.target.checked))
        } else {
          field.onChange(event)
        }
        onChange?.(event)
      }}
      label={label}
      size={size}
      disabled={disabled}
      labelPosition={labelPosition}
      className={className}
      required={required}
      data-testid={dataTestId}
      error={getError({ label: name }, error)}
    />
  )
}
