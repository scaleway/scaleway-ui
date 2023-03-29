import styled from '@emotion/styled'
import type { ComponentProps } from 'react'
import { useEffect, useState } from 'react'
import type { SelectOption } from '../SelectInput'
import { SelectInput } from '../SelectInput'
import { TextInput } from '../TextInput'

export const sizesHeight: Record<string, number> = {
  large: 48,
  medium: 40,
  small: 32,
}

const CustomTextInput = styled(TextInput)`
  input {
    border-radius: ${({ theme }) => theme.radii.default} 0 0
      ${({ theme }) => theme.radii.default};
    border-right: 0;

    &:hover,
    &:focus {
      text-decoration: none;
      border-color: ${({ theme }) => theme.colors.primary.borderWeak};
      border-right: 1px solid ${({ theme }) => theme.colors.primary.borderWeak};
      z-index: 1;
      padding-right: 7px; // so it doesn't move rich select
    }
  }
`

const CustomSelectInput = styled(SelectInput)<{
  width?: number
  height?: number
}>`
  ${({ width }) => width && `width: ${width}px;`}
  ${({ height }) => height && `height: ${height}px;`}

  &:hover,
  &:focus {
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.primary.borderWeak};
    box-shadow: none;
  }
`

const customSelectStyle = (height: number) => () => ({
  control: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    boxShadow: 'none',
    height,
    minHeight: height,
  },
  singleValue: {
    marginTop: 0,
  },
})

const defaultOptionValues: SelectOption[] = [
  {
    label: 'Hours',
    value: 'hours',
  },
  {
    label: 'Weeks',
    value: 'weeks',
  },
  {
    label: 'Months',
    value: 'months',
  },
  {
    label: 'Years',
    value: 'years',
  },
]

type UnitInputValue = {
  unit: string
  value: number
}

type UnitInputProps = Omit<
  Partial<ComponentProps<typeof SelectInput>>,
  'defaultValue'
> & {
  name?: string
  /** The default value in the TextInput */
  defaultValue?: number
  disabled?: boolean
  maxValue?: number
  minValue?: number
  /**
   * @param {{value, unit}} UnitInputValue The value containing the unit select and the value in the TextInput
   */
  onChange?: (value: UnitInputValue) => void
  /** Possible SelectInput options */
  options?: SelectOption[]
  placeholder?: string
  selectInputWidth?: number
  size?: string
  textBoxWidth?: number
  /** The default selected option in the SelectInput */
  defaultOption?: SelectOption
  'data-testid'?: string
}

export const UnitInput = ({
  name = '',
  maxValue = 99999,
  minValue = 1,
  defaultValue = 1,
  size = 'medium',
  placeholder = '0',
  onChange,
  textBoxWidth = 100,
  selectInputWidth = 200,
  disabled = false,
  options = defaultOptionValues,
  defaultOption,
  className,
  'data-testid': dataTestId,
}: UnitInputProps): JSX.Element => {
  const [value, setValue] = useState({
    unit: defaultOption?.value || options?.[0]?.value,
    value: defaultValue,
  })
  useEffect(() => onChange?.(value), [onChange, value])

  return (
    <div
      style={{ display: 'flex' }}
      className={className}
      data-testid={dataTestId}
    >
      <CustomTextInput
        height={sizesHeight[size]}
        width={textBoxWidth}
        type="number"
        name={`${name}-value`}
        value={value.value < maxValue ? value.value : maxValue}
        placeholder={placeholder}
        onChange={(event: string) => {
          const numericValue = Number(event)
          setValue(current => ({
            ...current,
            value: numericValue < minValue ? minValue : numericValue,
          }))
        }}
        disabled={disabled}
      />
      <CustomSelectInput
        width={selectInputWidth}
        noTopLabel
        height={sizesHeight[size]}
        id={`${name}-unit`}
        name={`${name}-unit`}
        onChange={unitValue => {
          setValue(current => ({
            ...current,
            unit: (unitValue as SelectOption).value,
          }))
        }}
        value={options.find(
          (option: SelectOption) => option.value === value.unit,
        )}
        options={options}
        customStyle={customSelectStyle(sizesHeight[size])}
        disabled={disabled || options.length === 1}
      />
    </div>
  )
}
