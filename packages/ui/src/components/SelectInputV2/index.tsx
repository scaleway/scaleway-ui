import styled from '@emotion/styled'
import { useId, useRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Dropdown } from './Dropdown'
import { SelectBar } from './SelectBar'
import { SelectInputProvider } from './SelectInputProvider'
import type { DataType } from './types'

type SelectInputV2Props<IsMulti extends undefined | boolean = false> = {
  /**
   * Input name
   */
  name: string
  /**
   * Place holder when no value defined
   */
  placeholder?: string
  /**
   * When searchable, placeholder when no value is searched
   */
  placeholderSearch?: string
  /**
   * Label of the component
   */
  label?: string
  /**
   * Helper text to give more information to the user
   */
  helper?: string
  /**
   * Selectable options
   */
  options: DataType
  /**
   * Message to show when no option available
   */
  emptyState?: ReactNode
  /**
   * Whether it is possible to search through the input
   */
  searchable?: boolean
  /**
   * Whether the component in disabled
   */
  disabled?: boolean
  /**
   * Whether the component in readOnly
   */
  readOnly?: boolean
  /**
   * Whether it is possible to clear the search input
   */
  clearable?: boolean
  /**
   * Size of the input
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Whether field is required
   */
  required?: boolean
  /**
   * More information regarding/description ofs the selectInput
   */
  labelDescription?: ReactNode
  /**
   * Whether option description is on the right of the option or under it
   */
  descriptionDirection?: 'row' | 'column'
  /**
   * Where to place the additional info prop
   */
  optionalInfoPlacement?: 'left' | 'right'
  /**
   * To add custom fixed elements at the bottom of the dropdown
   */
  footer?: ((closeDropdown: () => void) => ReactNode) | ReactNode
  /**
   * Display an error message under the select bar
   */
  error?: string
  /**
   * Display a success message under the select bar
   */
  success?: string
  /**
   * Load more button to implement lazy loading
   */
  loadMore?: ReactNode
  /**
   * When the options are loading, display a skeleton
   */
  isLoading?: boolean
  /**
   * Add a tooltip around the select bar
   */
  tooltip?: string
  /**
   * Adds an option to select every selectable options
   */
  selectAll?: { label: ReactNode; description?: string }
  /**
   * When options are group, define a option to select every selectable options of a group
   */
  selectAllGroup?: boolean
  autofocus?: boolean
  /**
   * Whether it is possible to select multiple options
   */
  multiselect?: IsMulti
  /**
   * Default value, must be one of the options
   */
  value?: IsMulti extends true ? string[] : string
  onChange?: IsMulti extends true
    ? (value: string[]) => void
    : (value: string) => void
  'data-testid'?: string
} & Pick<
  HTMLAttributes<HTMLDivElement>,
  'id' | 'onBlur' | 'onFocus' | 'aria-label' | 'className'
>

const SelectInputContainer = styled.div`
  width: 100%;
`
const HelperText = styled(Text)`
  padding-top: ${({ theme }) => theme.space['0.5']};
`

/**
 * SelectInputV2 component is used to select one or many elements from a selection.
 */
export const SelectInputV2 = <IsMulti extends undefined | boolean>({
  name,
  id,
  onBlur,
  onFocus,
  onChange,
  'aria-label': ariaLabel,
  value,
  label,
  helper,
  options,
  size = 'large',
  emptyState,
  descriptionDirection = 'column',
  success,
  error,
  'data-testid': dataTestId,
  className,
  tooltip,
  footer,
  placeholderSearch = 'Search in list',
  placeholder = 'Select item',
  searchable = true,
  disabled = false,
  readOnly = false,
  clearable = false,
  multiselect = false,
  required = false,
  labelDescription,
  autofocus,
  loadMore,
  optionalInfoPlacement = 'right',
  isLoading,
  selectAll,
  selectAllGroup = false,
}: SelectInputV2Props<IsMulti>) => {
  const localId = useId()
  const finalId = id ?? localId
  const ref = useRef<HTMLDivElement | null>(null)
  const numberOfOptions = Array.isArray(options)
    ? options.length
    : Object.values(options).reduce(
        (acc, current) =>
          acc + current.filter(option => !option.disabled).length,
        0,
      )
  const finalDataTestId = dataTestId ?? `select-input-${name}`

  return (
    <SelectInputProvider
      options={options}
      multiselect={multiselect}
      selectAll={selectAll}
      value={value}
      selectAllGroup={selectAllGroup}
      numberOfOptions={numberOfOptions}
      onChange={onChange}
      refSelect={ref}
    >
      <SelectInputContainer
        onBlur={onBlur}
        onFocus={onFocus}
        className={className}
        aria-label={name}
      >
        <Dropdown
          emptyState={emptyState}
          descriptionDirection={descriptionDirection}
          searchable={searchable}
          placeholder={placeholderSearch}
          footer={footer}
          refSelect={ref}
          loadMore={loadMore}
          optionalInfoPlacement={optionalInfoPlacement}
          isLoading={isLoading}
          size={size}
        >
          <Stack gap={0.5} aria-label={ariaLabel}>
            {label || labelDescription ? (
              <Label
                htmlFor={finalId}
                labelDescription={labelDescription}
                required={required}
                size={size}
              >
                {label}
              </Label>
            ) : null}
            <SelectBar
              size={size}
              data-testid={finalDataTestId}
              clearable={clearable}
              readOnly={readOnly}
              disabled={disabled}
              placeholder={placeholder}
              success={success}
              error={error}
              autoFocus={autofocus}
              innerRef={ref}
              id={finalId}
              label={label}
              tooltip={tooltip}
            />
          </Stack>
        </Dropdown>
        {!error && !success && helper ? (
          <HelperText
            variant="caption"
            as="p"
            sentiment="neutral"
            prominence="weak"
          >
            {helper}
          </HelperText>
        ) : null}
        {error || success ? (
          <HelperText
            variant="caption"
            as="p"
            sentiment={error ? 'danger' : 'success'}
            prominence="default"
          >
            {error || success}
          </HelperText>
        ) : null}
      </SelectInputContainer>
    </SelectInputProvider>
  )
}
