import styled from '@emotion/styled'
import { AlertCircleIcon } from '@ultraviolet/icons'
import type { FocusEvent, ReactNode } from 'react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Button } from '../Button'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'
import {
  DEFAULT_DATE,
  DEFAULT_PLACEHOLDER,
  INPUT_SIZE_HEIGHT,
  TIME_KEYS,
} from './constants'
import {
  canConcat,
  format,
  getLastTypedChar,
  getValueByType,
  isAOrP,
  isCompleteHour,
  isNumber,
  setValueByType,
} from './helpers'

export type Time = {
  h: string
  m: string
  s: string
  period?: string
}

const TimeInputWrapper = styled(Stack)<{
  'data-readonly': boolean
  'data-disabled': boolean
  'data-size': 'small' | 'medium' | 'large'
  'data-error': boolean
}>`
  display: flex;
  cursor: text;
  padding: ${({ theme }) => theme.space[1]};
  box-shadow: none;
  background: ${({ theme }) => theme.colors.neutral.background};
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};

  &:not([data-disabled="true"]):not([data-readonly="true"]):active {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
  }
  
  &[data-disabled="false"]:hover,
  [data-disabled="false"]:focus {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
    outline: none;
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
  }

  &[data-size='small'] {
    height: ${({ theme }) => theme.sizing[INPUT_SIZE_HEIGHT.small]};
    padding-left: ${({ theme }) => theme.space[1]};
  }

  &[data-size='medium'] {
    height: ${({ theme }) => theme.sizing[INPUT_SIZE_HEIGHT.medium]};
  }

  &[data-size='large'] {
    height: ${({ theme }) => theme.sizing[INPUT_SIZE_HEIGHT.large]};
  }

  &[data-readonly='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    border-color: ${({ theme }) => theme.colors.neutral.border};
    cursor: default;
  }

  &[data-disabled='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
    cursor: not-allowed;
    user-select: none;
  }

  &[data-error='true'] {
    border: 1px solid ${({ theme }) => theme.colors.danger.border};

    &:not([data-disabled="true"]):not([data-readonly="true"]):active {
      border-color: ${({ theme }) => theme.colors.danger.borderHover};
      box-shadow: ${({ theme }) => theme.shadows.focusDanger};
    }

    &:not([data-disabled="true"]):not([data-readonly="true"]):hover {
      border-color: ${({ theme }) => theme.colors.danger.borderHover};
    }
  }
`

export const Input = styled.input<{
  'data-size': 'small' | 'medium' | 'large'
  'data-period'?: boolean
}>`
  border: none;
  outline: none;
  background: transparent;
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
  width: ${({ theme }) => theme.sizing[312]};
  height: ${({ theme }) => theme.sizing[300]};
  text-align: center;
  border-radius: ${({ theme }) => theme.radii.default};
  color: ${({ theme }) => theme.colors.neutral.text};
  caret-color: transparent;

  &[data-size='large'] {
    font-size: ${({ theme }) => theme.typography.body.fontSize};
  }

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundHover};
    color: ${({ theme }) => theme.colors.neutral.textWeak};
  }

  &:not(:disabled):active, 
  :not(:disabled):focus{
    background-color: ${({ theme }) => theme.colors.neutral.backgroundStrong};
    color:  ${({ theme }) => theme.colors.neutral.text};
  }

  &:read-only {
    cursor: default;
  }

  &:disabled {
    cursor: not-allowed;
    user-select: none;
  }

  &[data-period="true"] {
    color: ${({ theme }) => theme.colors.neutral.textWeak};
  }

  ::-moz-selection {
    background: none;
  }

  ::selection {
    background: none;
  }
`

const CustomText = styled(Text)`
padding-inline: ${({ theme }) => theme.space['0.25']};
`

type TimeInputProps = {
  placeholder?: Time
  value?: Date
  clearable?: boolean
  required?: boolean
  labelDescription?: ReactNode
  helper?: ReactNode
  disabled?: boolean
  readOnly?: boolean
  error?: boolean | string
  'data-testid'?: string
  onChange?: (value: Date | undefined, valuePeriod?: string) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  className?: string
  id?: string
  size?: 'small' | 'medium' | 'large'
  timeFormat?: 12 | 24
  /**
   * Automatically focus on the element on render. Autofocus is applied to the hour input
   */
  autoFocus?: boolean
} & (
  | {
      label?: string
      'aria-label'?: never
    }
  | {
      label?: never
      'aria-label': string
    }
)

/**
 * A time input component that allows users to type a time in a 24 or 12-hour format.
 * @experimental This component is experimental and may be subject to breaking changes in the future.
 */
export const TimeInputV2 = ({
  label,
  timeFormat = 24,
  value,
  clearable,
  required,
  labelDescription,
  helper,
  size = 'medium',
  disabled = false,
  readOnly = false,
  error = false,
  onChange,
  onBlur,
  onFocus,
  className,
  id,
  autoFocus,
  'data-testid': dataTestId,
  placeholder = DEFAULT_PLACEHOLDER,
  'aria-label': ariaLabel,
}: TimeInputProps) => {
  const localId = useId()
  const defaultPeriod = useMemo(() => {
    if (value) return value.getHours() >= 12 ? 'pm' : 'am'

    return undefined
  }, [value])

  const [time, setTime] = useState(value)
  const [period, setPeriod] = useState<'pm' | 'am' | undefined>(defaultPeriod)
  const [filled, setFilled] = useState(
    value ? { h: true, m: true, s: true } : { h: false, m: false, s: false },
  ) // to not show 00 when there should be a placeholder

  const refHours = useRef<HTMLInputElement>(null)
  const refSeconds = useRef<HTMLInputElement>(null)
  const refMinutes = useRef<HTMLInputElement>(null)
  const refPeriod = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value) {
      setTime(value)

      // without this condition, every time an input value changes, the other ones will be set to 0 if they used to be undefined
      // instead of leaving them empty (and showing the placeholder)
      if (value.getTime() !== time?.getTime()) {
        setFilled({ h: true, m: true, s: true })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const handleChangePeriod = (key: 'a' | 'p') => {
    if (!time) {
      setPeriod(`${key}m`)
    } else if (key.toLowerCase() === 'a') {
      if (time.getHours() >= 12) {
        const newTime = new Date(time)
        newTime.setHours(newTime.getHours() - 12)
        setTime(newTime)
        onChange?.(newTime)
      }
      setPeriod('am')
    } else {
      if (time.getHours() < 12) {
        const newTime = new Date(time)
        newTime.setHours(newTime.getHours() + 12)
        setTime(newTime)
        onChange?.(newTime)
      }
      setPeriod('pm')
    }
  }
  const handleChange = (type: 'h' | 'm' | 's', key: number) => {
    const newTime = time ? new Date(time) : DEFAULT_DATE
    const valueToChange = getValueByType(type, time)

    if (canConcat(valueToChange, type, key, timeFormat)) {
      const newValue = (valueToChange % 10) * 10 + key

      setValueByType(type, newTime, newValue)
    } else setValueByType(type, newTime, key)

    const newValue = getValueByType(type, newTime)
    // Focus to next input if the current input has a valid time
    if (type === 's' && newTime && newValue >= 7 && timeFormat === 12) {
      refPeriod.current?.focus()
    } else if (type === 'm' && newTime && newValue >= 6) {
      refSeconds.current?.focus()
    }

    if (type === 'h') {
      if (isCompleteHour(timeFormat, newValue)) {
        refMinutes.current?.focus()
      }
    }
    const newFilled = { ...filled }
    newFilled[type] = true

    setTime(newTime)
    onChange?.(newTime)

    setFilled(newFilled)
  }

  // Increase time with arrow up
  const handleIncrease = (type: 'h' | 'm' | 's') => {
    const newTime = time ? new Date(time) : DEFAULT_DATE
    const currentValue = getValueByType(type, newTime)
    if (type === 'h' && timeFormat === 24) {
      setValueByType(type, newTime, currentValue === 23 ? 0 : currentValue + 1)
    } else if (type === 'h' && timeFormat === 12) {
      setValueByType(type, newTime, currentValue === 12 ? 1 : currentValue + 1)
    } else {
      setValueByType(type, newTime, currentValue === 59 ? 0 : currentValue + 1)
    }
    const newFilled = { ...filled }
    newFilled[type] = true

    setTime(newTime)
    onChange?.(newTime)
    setFilled(newFilled)
  }

  // Decrease time with arrow down
  const handleDecrease = (type: 'h' | 'm' | 's') => {
    const newTime = time ? new Date(time) : DEFAULT_DATE
    const currentValue = getValueByType(type, newTime)

    if (type === 'h' && timeFormat === 24) {
      setValueByType(type, newTime, currentValue === 0 ? 23 : currentValue - 1)
    } else if (type === 'h' && timeFormat === 12) {
      setValueByType(type, newTime, currentValue === 1 ? 12 : currentValue - 1)
    } else {
      setValueByType(type, newTime, currentValue === 0 ? 59 : currentValue - 1)
    }
    const newFilled = { ...filled }
    newFilled[type] = true

    setTime(newTime)
    onChange?.(newTime)
    setFilled(newFilled)
  }

  // Go to next input
  const handleNext = (type: 'h' | 'm' | 's') => {
    if (type === 'h') refMinutes.current?.focus()
    if (type === 'm') refSeconds.current?.focus()
    if (type === 's' && timeFormat === 12) refPeriod.current?.focus()
  }

  // Go to previous input
  const handlePrevious = (type: 'h' | 'm' | 's') => {
    if (type === 'm') refHours.current?.focus()
    if (type === 's') refMinutes.current?.focus()
  }

  return (
    <Stack gap={0.5} className={className}>
      {label || labelDescription ? (
        <Label
          labelDescription={labelDescription}
          required={required}
          size={size}
          htmlFor={id ?? localId}
        >
          {label}
        </Label>
      ) : null}
      <TimeInputWrapper
        data-readonly={readOnly}
        data-disabled={disabled}
        data-size={size}
        data-error={!!error}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        onBlur={onBlur}
        onFocus={onFocus}
        aria-required={required}
        onClick={() => refHours.current?.focus()}
        id={id}
        data-testid={dataTestId}
        aria-label={ariaLabel}
      >
        <Stack direction="row">
          {TIME_KEYS.map(type => {
            const computedRef = () => {
              if (type === 'h') return refHours
              if (type === 'm') return refMinutes

              return refSeconds
            }
            const fullName = () => {
              if (type === 'h') return 'hours'
              if (type === 'm') return 'minutes'

              return 'seconds'
            }

            const computeMaxValue = () => {
              if (type === 'h' && timeFormat === 12) return 12
              if (type === 'h' && timeFormat === 24) return 23

              return 59
            }

            return (
              <Stack key={type} direction="row">
                <Input
                  value={
                    filled[type]
                      ? format(getValueByType(type, time), type, timeFormat)
                      : ''
                  }
                  placeholder={placeholder[type]}
                  data-size={size}
                  readOnly={readOnly}
                  disabled={disabled}
                  aria-label={ariaLabel}
                  data-testid={`${fullName()}-input`}
                  onClick={event => {
                    event.stopPropagation()
                  }}
                  ref={computedRef()}
                  role="spinbutton"
                  aria-valuemax={computeMaxValue()}
                  aria-valuemin={type === 'h' && timeFormat === 12 ? 1 : 0}
                  aria-valuenow={
                    filled[type]
                      ? Number.parseInt(
                          format(getValueByType(type, time), type, timeFormat),
                          10,
                        )
                      : undefined
                  }
                  onChange={event => {
                    if (!readOnly && !disabled) {
                      const key = getLastTypedChar(
                        event.target.value,
                        getValueByType(type, time),
                      )
                      if (isNumber(key)) {
                        handleChange(type, Number.parseInt(key, 10))
                      }
                    }
                  }}
                  onKeyDown={event => {
                    if (!readOnly && !disabled) {
                      if (event.key === 'ArrowUp') {
                        event.preventDefault()
                        handleIncrease(type)
                      } else if (event.key === 'ArrowDown') {
                        event.preventDefault()
                        handleDecrease(type)
                      } else if (event.key === 'ArrowLeft') {
                        event.preventDefault()
                        handlePrevious(type)
                      } else if (event.key === 'ArrowRight') {
                        event.preventDefault()
                        handleNext(type)
                      }
                    }
                  }}
                  autoFocus={autoFocus && type === 'h'}
                />
                {type === 's' ? null : (
                  <CustomText
                    as="span"
                    variant="body"
                    prominence="default"
                    sentiment="neutral"
                  >
                    :
                  </CustomText>
                )}
              </Stack>
            )
          })}
          {timeFormat === 12 ? (
            <Input
              value={period?.toUpperCase()}
              placeholder={placeholder.period ?? 'AM'}
              data-size={size}
              data-period
              readOnly={readOnly}
              disabled={disabled}
              aria-label={ariaLabel}
              data-testid="am-pm-input"
              onChange={event => {
                if (!readOnly && !disabled) {
                  const key = event.target.value.slice(-1)
                  if (isAOrP(key)) handleChangePeriod(key as 'a' | 'p')
                }
              }}
              onKeyDown={event => {
                if (!readOnly && !disabled) {
                  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                    event.preventDefault()
                    handleChangePeriod(period === 'am' ? 'p' : 'a')
                  } else if (event.key === 'ArrowLeft') {
                    event.preventDefault()
                    refSeconds.current?.focus()
                  }
                }
              }}
              ref={refPeriod}
              onClick={event => event.stopPropagation()}
              role="spinbutton"
              aria-valuemax={12}
              aria-valuemin={0}
              aria-valuenow={period === 'am' ? 0 : 12}
              aria-valuetext={period}
            />
          ) : null}
        </Stack>
        {error || clearable ? (
          <Stack direction="row" alignItems="center" gap="1">
            {error ? <AlertCircleIcon sentiment="danger" /> : null}
            {clearable ? (
              <Button
                aria-label="clear value"
                disabled={disabled || readOnly}
                variant="ghost"
                size="small"
                icon="close"
                onClick={event => {
                  event.stopPropagation()
                  setTime(undefined)
                  onChange?.(undefined)
                }}
                sentiment="neutral"
                data-testid="clear"
              />
            ) : null}
          </Stack>
        ) : null}
      </TimeInputWrapper>
      {helper || error ? (
        <Text
          as="p"
          variant="caption"
          sentiment={error ? 'danger' : 'neutral'}
          prominence={error ? 'default' : 'weak'}
          disabled={disabled}
        >
          {error || helper}
        </Text>
      ) : null}
    </Stack>
  )
}
