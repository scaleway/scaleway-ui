import styled from '@emotion/styled'
import { AlertCircleIcon, CheckCircleIcon } from '@ultraviolet/icons'
import type {
  ChangeEvent,
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactNode,
} from 'react'
import {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Button } from '../Button'
import { Label } from '../Label'
import { Loader } from '../Loader'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

// SIZE
export const TEXTINPUT_SIZE_HEIGHT = {
  small: '400', // sizing theme tokens key
  medium: '500',
  large: '600',
} as const
type TextInputSize = keyof typeof TEXTINPUT_SIZE_HEIGHT

export const BasicPrefixStack = styled(Stack)`
  padding: ${({ theme }) => theme.space['2']};

  &[data-size="small"] {
    padding: ${({ theme }) => theme.space['1']};
  }
  border-right: 1px solid;
  border-color: inherit;
`

const StateStack = styled(Stack)`
  padding: ${({ theme }) => `0 ${theme.space['2']}`};
`

export const BasicSuffixStack = styled(Stack)`
  padding: ${({ theme }) => `0 ${theme.space['2']}`};
  border-left: 1px solid;
  border-color: inherit;
`

const CTASuffixStack = styled(Stack)`
  padding: ${({ theme }) => `0 ${theme.space['1']}`};
  border-left: 1px solid;
  border-color: inherit;
`

export const StyledInput = styled.input<{
  'data-size': TextInputSize
}>`
  flex: 1;
  border: none;
  outline: none;
  height: 100%;
  width: 100%;
  padding-left: ${({ theme }) => theme.space['2']};
  background: transparent;
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};

  &[data-size='large'] {
    font-size: ${({ theme }) => theme.typography.body.fontSize};
  }

  &[data-size='small'] {
    padding-left: ${({ theme }) => theme.space['1']};
  }
`

type StyledInputWrapperProps = {
  hasFocus: boolean
  size: TextInputSize
}
const StyledInputWrapper = styled('div', {
  shouldForwardProp: prop => !['hasFocus', 'size'].includes(prop),
})<StyledInputWrapperProps>`
  display: flex;
  flex-direction: row;
  height: ${({ size, theme }) => theme.sizing[TEXTINPUT_SIZE_HEIGHT[size]]};

  background: ${({ theme }) => theme.colors.neutral.background};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};

  & > ${StyledInput} {
    color: ${({ theme }) => theme.colors.neutral.text};

    &::placeholder {
      color: ${({ theme }) => theme.colors.neutral.textWeak};
    }
  }

  &[data-success='true'] {
    border-color: ${({ theme }) => theme.colors.success.border};
  }

  &[data-error='true'] {
    border-color: ${({ theme }) => theme.colors.danger.border};
  }

  &[data-readonly='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    border-color: ${({ theme }) => theme.colors.neutral.border};
  }

  &[data-disabled='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};

    & > ${StyledInput} {
      color: ${({ theme }) => theme.colors.neutral.textDisabled};

      &::placeholder {
        color: ${({ theme }) => theme.colors.neutral.textWeakDisabled};
      }
    }
  }

  &:not([data-disabled='true']):not([data-readonly]):hover {
    border-color: ${({ theme }) => theme.colors.primary.border};
  }

  ${({ theme, hasFocus }) =>
    hasFocus
      ? `
  box-shadow: ${theme.shadows.focusPrimary};
  border: 1px solid ${theme.colors.primary.border};
`
      : null};
`

type TextInputProps = {
  className?: string
  clearable?: boolean
  'data-testid'?: string
  error?: string
  helper?: ReactNode
  label?: string
  labelDescription?: ReactNode
  loading?: boolean
  minLength?: number
  maxLength?: number
  onRandomize?: () => void
  prefix?: ReactNode
  size?: TextInputSize
  success?: string | boolean
  suffix?: ReactNode
  tooltip?: string
  type?: 'text' | 'password' | 'url' | 'email'
  value?: string
  defaultValue?: string
  onChangeValue?: (value: string) => void
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'onFocus'
  | 'onBlur'
  | 'name'
  | 'id'
  | 'placeholder'
  | 'aria-label'
  | 'aria-labelledby'
  | 'disabled'
  | 'readOnly'
  | 'required'
  | 'autoFocus'
  | 'tabIndex'
  | 'autoComplete'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'role'
  | 'aria-live'
  | 'aria-atomic'
  | 'onChange'
>

/**
 * This component offers an extended input HTML. The component can be controlled or uncontrolled.
 * To control the component, you need to pass the value and the `onChange` function.
 * If you don't pass the `onChange` function, the component will be uncontrolled and you can set the default value using `defaultValue`
 */
export const TextInputV2 = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      className,
      tabIndex,
      value,
      onChange,
      onChangeValue,
      placeholder,
      disabled = false,
      readOnly = false,
      success,
      error,
      helper,
      tooltip,
      label,
      autoFocus,
      required = false,
      'data-testid': dataTestId,
      name,
      onFocus,
      onBlur,
      clearable = false,
      labelDescription,
      type = 'text',
      prefix,
      suffix,
      size = 'large',
      loading,
      onRandomize,
      minLength,
      maxLength,
      'aria-labelledby': ariaLabelledBy,
      'aria-label': ariaLabel,
      autoComplete,
      onKeyDown,
      onKeyUp,
      role,
      'aria-live': ariaLive,
      'aria-atomic': ariaAtomic,
      defaultValue,
    },
    ref,
  ) => {
    const localId = useId()
    const [hasFocus, setHasFocus] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const computedType =
      type === 'password' && isPasswordVisible ? 'text' : type

    const sentiment = useMemo(() => {
      if (error) {
        return 'danger'
      }

      if (success) {
        return 'success'
      }

      return 'neutral'
    }, [error, success])

    const onChangeCallback: ChangeEventHandler<HTMLInputElement> = useCallback(
      event => {
        onChange?.(event)
        onChangeValue?.(event.target.value)
      },
      [onChange, onChangeValue],
    )

    const computedClearable = clearable && !!value

    return (
      <Stack
        gap={0.5}
        className={className}
        role={role}
        aria-live={ariaLive}
        aria-atomic={ariaAtomic}
      >
        {label || labelDescription ? (
          <Label
            labelDescription={labelDescription}
            required={required}
            size={size}
            htmlFor={id ?? localId}
            id={ariaLabelledBy}
          >
            {label}
          </Label>
        ) : null}
        <div>
          <Tooltip text={tooltip}>
            <StyledInputWrapper
              hasFocus={hasFocus}
              data-disabled={disabled}
              data-readonly={readOnly}
              data-success={!!success}
              data-error={!!error}
              size={size}
            >
              {prefix ? (
                <BasicPrefixStack
                  direction="row"
                  alignItems="center"
                  data-size={size}
                >
                  {typeof prefix === 'string' ? (
                    <Text
                      as="span"
                      sentiment="neutral"
                      variant="bodySmall"
                      disabled={disabled}
                    >
                      {prefix}
                    </Text>
                  ) : (
                    prefix
                  )}
                </BasicPrefixStack>
              ) : null}
              <StyledInput
                type={computedType}
                aria-invalid={!!error}
                id={id ?? localId}
                tabIndex={tabIndex}
                autoFocus={autoFocus}
                disabled={disabled}
                ref={inputRef}
                value={value}
                defaultValue={defaultValue}
                onChange={onChangeCallback}
                data-size={size}
                placeholder={placeholder}
                data-testid={dataTestId}
                name={name}
                onFocus={event => {
                  setHasFocus(true)
                  onFocus?.(event)
                }}
                onBlur={event => {
                  setHasFocus(false)
                  onBlur?.(event)
                }}
                readOnly={readOnly}
                minLength={minLength}
                maxLength={maxLength}
                aria-labelledby={ariaLabelledBy}
                aria-label={ariaLabel}
                autoComplete={autoComplete}
                required={required}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
              />
              {success || error || loading || computedClearable ? (
                <StateStack direction="row" gap={1} alignItems="center">
                  {computedClearable ? (
                    <Button
                      aria-label="clear value"
                      disabled={disabled || !value}
                      variant="ghost"
                      size={size === 'small' ? 'xsmall' : 'small'}
                      icon="close"
                      onClick={() => {
                        if (inputRef?.current) {
                          inputRef.current.value = ''
                          onChangeCallback({
                            target: { value: '' },
                            currentTarget: { value: '' },
                          } as ChangeEvent<HTMLInputElement>)
                        }
                      }}
                      sentiment="neutral"
                    />
                  ) : null}
                  {success ? (
                    <CheckCircleIcon
                      sentiment="success"
                      size="small"
                      disabled={disabled}
                    />
                  ) : null}
                  {error ? (
                    <AlertCircleIcon
                      sentiment="danger"
                      size="small"
                      disabled={disabled}
                    />
                  ) : null}
                  {loading && !disabled ? <Loader active size={16} /> : null}
                </StateStack>
              ) : null}
              {suffix ? (
                <BasicSuffixStack direction="row" alignItems="center">
                  {typeof suffix === 'string' ? (
                    <Text
                      as="span"
                      sentiment="neutral"
                      variant="bodySmall"
                      disabled={disabled}
                    >
                      {suffix}
                    </Text>
                  ) : (
                    suffix
                  )}
                </BasicSuffixStack>
              ) : null}
              {type === 'password' ? (
                <CTASuffixStack direction="row" alignItems="center">
                  <Button
                    disabled={disabled}
                    data-testid={
                      dataTestId ? `${dataTestId}-visibility-button` : undefined
                    }
                    aria-label={isPasswordVisible ? 'hide' : 'show'}
                    onClick={() => {
                      setIsPasswordVisible(!isPasswordVisible)
                    }}
                    variant="ghost"
                    sentiment="neutral"
                    icon={isPasswordVisible ? 'eye-off' : 'eye'}
                    size={size === 'small' ? 'xsmall' : 'small'}
                  />
                </CTASuffixStack>
              ) : null}
              {onRandomize ? (
                <CTASuffixStack direction="row" alignItems="center">
                  <Button
                    disabled={disabled}
                    icon="auto-fix"
                    size={size === 'small' ? 'xsmall' : 'small'}
                    variant="ghost"
                    sentiment="neutral"
                    onClick={onRandomize}
                  />
                </CTASuffixStack>
              ) : null}
            </StyledInputWrapper>
          </Tooltip>
        </div>
        {error || typeof success === 'string' || typeof helper === 'string' ? (
          <Text
            as="p"
            variant="caption"
            sentiment={sentiment}
            prominence={!error && !success ? 'weak' : 'default'}
            disabled={disabled}
          >
            {error || success || helper}
          </Text>
        ) : null}
        {!error && !success && typeof helper !== 'string' && helper
          ? helper
          : null}
      </Stack>
    )
  },
)
