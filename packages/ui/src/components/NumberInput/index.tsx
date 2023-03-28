import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import type {
  ChangeEventHandler,
  FocusEventHandler,
  InputHTMLAttributes,
  KeyboardEventHandler,
  MutableRefObject,
  ReactNode,
} from 'react'
import { useRef, useState } from 'react'
import parseIntOr from '../../helpers/numbers'
import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'

const bounded = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max))

const roundStep = (value: number, step: number, direction: number) =>
  direction === -1
    ? Math.floor(value / step) * step
    : Math.ceil(value / step) * step

const disabledStyles = ({ theme }: { theme: Theme }) =>
  `
    background-color: ${theme.colors.neutral.backgroundDisabled};
    border: none;
    color: ${theme.colors.neutral.textDisabled};
    opacity: 1;
    cursor: not-allowed;
  `

const containerSizes = {
  large: 48,
  medium: 40,
  small: 32,
}

type ContainerSizesType = keyof typeof containerSizes

const iconSizes = {
  large: 26,
  medium: 24,
  small: 22,
}

const StyledSelectButton = styled.button`
  cursor: pointer;
  background: none;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.default};

  color: ${({ theme, disabled }) =>
    disabled
      ? theme.colors.neutral.textDisabled
      : theme.colors.primary.textWeak};

  :hover:not([disabled]) {
    background: ${({ theme }) => theme.colors.primary.background};
  }

  padding: 0;
  margin: 0 ${({ theme }) => theme.space['1']};
`

const StyledCenterBox = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop),
})<{ size: ContainerSizesType }>`
  display: flex;
  flex: 1;
  flex-direction: row;
  height: ${({ size }) => (size === 'small' ? '24px' : '32px')};
  align-items: center;
  outline: none;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid transparent;
  max-width: 100%;
`

const StyledInput = styled.input`
  color: ${({ theme }) => theme.colors.neutral.text};
  background-color: transparent;
  font-size: ${({ theme }) => theme.typography.bodyStrong.fontSize};
  border: none;
  outline: none;
  position: relative;
  margin-right: ${({ theme }) => theme.space['0.5']};
  max-width: 100%;
  font-weight: ${({ theme }) => theme.typography.bodyStrong.weight};
  text-align: center;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`

const StyledText = styled('span', {
  shouldForwardProp: prop => !['disabled'].includes(prop),
})<{ disabled: boolean }>`
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.neutral.textDisabled : theme.colors.neutral.text};
  user-select: none;
`

const StyledContainer = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop),
})<{ size: ContainerSizesType }>`
  background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  font-weight: 500;
  height: ${({ size }) => containerSizes[size]}px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: ${({ theme }) => theme.radii.default};

  &[aria-disabled='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};

    > ${StyledSelectButton}, ${StyledInput}, ${StyledCenterBox} {
      ${({ theme }) => disabledStyles({ theme })}
    }
  }

  &:not([aria-disabled='true']) {
    ${StyledCenterBox}:hover,
    ${StyledCenterBox}:focus {
      border: 1px solid ${({ theme }) => theme.colors.primary.borderWeakHover};
    }

    ${StyledCenterBox}:focus-within {
      box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
      border: 1px solid ${({ theme }) => theme.colors.primary.borderWeakHover};
    }
  }
`

type NumberInputProps = {
  disabled?: boolean
  maxValue?: number
  minValue?: number
  name?: string
  onChange?: (input: number) => void
  onMaxCrossed?(): void
  onMinCrossed?(): void
  size?: ContainerSizesType
  /**
   * Define how much will stepper increase / decrease each time you click on + / - button.
   */
  step?: number
  /**
   * Text displayed into component at the right of number value.
   */
  text?: string | ReactNode
  defaultValue?: number
  value?: number
  disabledTooltip?: string
  className?: string
  'data-testid'?: string
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange' | 'value' | 'defaultValue'
>

export const NumberInput = ({
  disabled = false,
  maxValue,
  minValue = 0,
  name = 'numberinput',
  onChange,
  onFocus,
  onBlur,
  onMaxCrossed,
  onMinCrossed,
  size = 'large',
  step = 1,
  text,
  defaultValue = 0,
  value,
  disabledTooltip,
  className,
  'data-testid': dataTestId,
}: NumberInputProps) => {
  const inputRef =
    useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>

  // local state used if component is not controlled (no value prop provided)
  const [inputValue, setInputValue] = useState(() => {
    if (defaultValue < minValue) {
      return minValue
    }
    if (maxValue && defaultValue > maxValue) {
      return maxValue
    }

    return defaultValue
  })

  const currentValue = value !== undefined ? value : inputValue

  const setValue = (newValue: number) => {
    if (value === undefined) {
      setInputValue(newValue)
    }
    onChange?.(newValue)
  }

  const offsetFn = (direction: number) => () => {
    const newValue =
      currentValue % step === 0 ? currentValue + step * direction : currentValue
    const roundedValue = roundStep(newValue, step, direction)
    setValue(roundedValue)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    event.stopPropagation()
    const parsedValue = parseIntOr(event.currentTarget.value, 0)
    setValue(parsedValue)
  }

  const handleOnFocus: FocusEventHandler<HTMLInputElement> = event => {
    if (onFocus) onFocus(event)
  }

  const handleOnBlur: FocusEventHandler<HTMLInputElement> = event => {
    const boundedValue = bounded(
      currentValue,
      minValue,
      maxValue ?? currentValue,
    )

    if (maxValue && currentValue > maxValue) onMaxCrossed?.()
    if (currentValue < minValue) onMinCrossed?.()

    setValue(boundedValue)

    if (onBlur) onBlur(event)
  }

  const onKeyDown: KeyboardEventHandler = event => {
    if (event.key === 'ArrowUp') {
      event.stopPropagation()
      event.preventDefault()

      const direction = 1
      const newValue =
        currentValue % step === 0
          ? currentValue + step * direction
          : currentValue
      const roundedValue = roundStep(newValue, step, direction)

      if (maxValue && roundedValue <= maxValue) {
        setValue(roundedValue)
      }
    }

    if (event.key === 'ArrowDown') {
      event.stopPropagation()
      event.preventDefault()

      const direction = -1

      const newValue =
        currentValue % step === 0
          ? currentValue + step * direction
          : currentValue
      const roundedValue = roundStep(newValue, step, direction)

      if (roundedValue >= minValue) {
        setValue(roundedValue)
      }
    }
  }

  const minusRoundedValue =
    currentValue % step === 0
      ? roundStep(currentValue - step, step, -1)
      : roundStep(currentValue, step, -1)
  const plusRoundedValue =
    currentValue % step === 0
      ? roundStep(currentValue + step, step, 1)
      : roundStep(currentValue, step, 1)
  const isMinusDisabled = minusRoundedValue < minValue || disabled
  const isPlusDisabled = (maxValue && plusRoundedValue > maxValue) || disabled

  return (
    <StyledContainer
      aria-disabled={disabled}
      size={size}
      className={className}
      data-testid={dataTestId}
    >
      <Tooltip text={isMinusDisabled && disabledTooltip}>
        <StyledSelectButton
          onClick={offsetFn(-1)}
          disabled={isMinusDisabled}
          aria-label="Minus"
          type="button"
        >
          <Icon
            name="minus"
            size={iconSizes[size]}
            color="primary"
            disabled={isMinusDisabled}
          />
        </StyledSelectButton>
      </Tooltip>

      <StyledCenterBox
        size={size}
        onClick={() => {
          if (inputRef?.current) {
            inputRef.current.focus()
          }
        }}
        aria-live="assertive"
        role="status"
      >
        <StyledInput
          disabled={disabled}
          name={name}
          onBlur={handleOnBlur}
          onChange={handleChange}
          onFocus={handleOnFocus}
          onKeyDown={onKeyDown}
          ref={inputRef}
          style={{
            width: currentValue.toString().length * 10 + 15,
          }}
          value={currentValue.toString()} // A dom element can only have string attributes.
          aria-label="Input"
          type="number"
        />
        {typeof text === 'string' ? (
          <StyledText disabled={disabled}>{text}</StyledText>
        ) : (
          text
        )}
      </StyledCenterBox>

      <Tooltip text={isPlusDisabled && disabledTooltip}>
        <StyledSelectButton
          onClick={offsetFn(1)}
          disabled={isPlusDisabled}
          aria-label="Plus"
          type="button"
        >
          <Icon
            name="plus"
            size={iconSizes[size]}
            color="primary"
            disabled={isPlusDisabled}
          />
        </StyledSelectButton>
      </Tooltip>
    </StyledContainer>
  )
}
