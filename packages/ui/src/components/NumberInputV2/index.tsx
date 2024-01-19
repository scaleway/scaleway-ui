import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type {
  ChangeEvent,
  ForwardedRef,
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
} from 'react'
import { Button } from '../Button'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

const SIZES = {
  small: '30px',
  medium: '38px',
  large: '46px',
}

type Sizes = keyof typeof SIZES

const SideContainer = styled(Stack)`
  padding: ${({ theme }) => `${theme.space['0.25']} ${theme.space['1']}`};

  &[data-size='small'] {
    height: ${SIZES.small};
  }

  &[data-size='medium'] {
    height: ${SIZES.medium};
  }

  &[data-size='large'] {
    height: ${SIZES.large};
    padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1']}`};
  }
`

const InputContainer = styled(Row)`
  border-width: 0 1px 0 1px;
  border-style: solid;
  border-color: inherit;
  background: inherit;
  width: 100%;
`

const Unit = styled(Text, {
  shouldForwardProp: prop => !['size'].includes(prop),
})<{ size: Sizes }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space['1']};
  height: ${({ size }) => SIZES[size]};
`

const Input = styled.input`
  outline: none;
  border: none;
  padding: 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.neutral.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  text-align: center;
  padding: ${({ theme }) => theme.space['1']};
  background: none;

  &[data-has-unit='true'] {
    text-align: left;
    padding: ${({ theme }) =>
      `${theme.space['1']} 0 ${theme.space['1']} ${theme.space['1']}`};
  }

  // Remove native arrows from input[type=number]

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & {
    -moz-appearance: textfield;
  }

  &[data-size='small'] {
    height: ${SIZES.small};
  }

  &[data-size='medium'] {
    height: ${SIZES.medium};
  }

  &[data-size='large'] {
    height: ${SIZES.large};
  }

  &:read-only {
    color: ${({ theme }) => theme.colors.neutral.text};
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};

    & ~ ${Unit} {
      background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    }
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    cursor: not-allowed;

    & ~ ${Unit} {
      background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
      cursor: not-allowed;
      user-select: none;
    }
  }

  &:placeholder-shown ~ ${Unit} {
    color: ${({ theme }) => theme.colors.neutral.textWeak};
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
  }

  &[data-success='true'] {
    border-color: ${({ theme }) => theme.colors.success.border};
  }

  &[data-error='true'] {
    border-color: ${({ theme }) => theme.colors.danger.border};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
  }

  &[data-readonly='true'] {
    border-color: ${({ theme }) => theme.colors.neutral.border};
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    cursor: not-allowed;
  }

  &[data-disabled='true'] {
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    cursor: not-allowed;
  }
`

type NumberInputProps = {
  size?: Sizes
  /**
   * Text displayed into component at the right of number value.
   */
  unit?: string
  tooltip?: string
  className?: string
  'data-testid'?: string
  label?: string
  /**
   * Label description displayed right next to the label. It allows you to customize the label content.
   */
  labelDescription?: ReactNode
  error?: string
  success?: string
  helper?: ReactNode
  value?: string | number
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'name'
  | 'id'
  | 'placeholder'
  | 'aria-label'
  | 'min'
  | 'max'
  | 'disabled'
  | 'step'
  | 'readOnly'
  | 'required'
  | 'autoFocus'
>

/**
 * NumberInputV2 component is used to increment / decrement a number value by clicking on + / - buttons or
 * by typing into input. If the value is out of the min / max range, the input will automatically be the min / max value on blur.
 */
export const NumberInputV2 = forwardRef(
  (
    {
      disabled = false,
      max = Infinity,
      min = 0,
      name,
      onChange,
      onFocus,
      onBlur,
      size = 'medium',
      step,
      unit,
      value,
      tooltip,
      className,
      label,
      labelDescription,
      id,
      placeholder = '',
      error,
      success,
      helper,
      'aria-label': ariaLabel,
      'data-testid': dataTestId,
      required,
      autoFocus,
      readOnly,
    }: NumberInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const localRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => localRef.current as HTMLInputElement)

    const uniqueId = useId()
    const localId = id ?? uniqueId

    const createChangeEvent = (
      newValue: string | number,
    ): ChangeEvent<HTMLInputElement> =>
      ({
        target: {
          value: newValue,
        },
      }) as ChangeEvent<HTMLInputElement>

    const onClickSideButton = useCallback(
      (direction: 'up' | 'down') => () => {
        if (direction === 'up') {
          localRef.current?.stepUp()
          onChange?.(createChangeEvent(localRef.current?.value ?? min))
        }

        if (direction === 'down') {
          localRef.current?.stepDown()
          onChange?.(createChangeEvent(localRef.current?.value ?? min))
        }
      },
      [localRef, min, onChange],
    )

    const isMinusDisabled = useMemo(
      () => {
        if (!localRef?.current?.value || localRef?.current?.value === '') {
          return false
        }

        const numericValue = Number(localRef?.current?.value)
        if (Number.isNaN(numericValue)) return false

        const minValue = typeof min === 'number' ? min : Number(min)

        return Number.isNaN(numericValue) || numericValue <= minValue
      }, // eslint-disable-next-line react-hooks/exhaustive-deps
      [localRef?.current?.value, min],
    )

    const isPlusDisabled = useMemo(
      () => {
        if (!localRef?.current?.value || localRef?.current?.value === '') {
          return false
        }

        const numericValue = Number(localRef?.current?.value)
        if (Number.isNaN(numericValue)) return false

        const maxValue = typeof max === 'number' ? max : Number(max)

        return numericValue >= maxValue
      }, // eslint-disable-next-line react-hooks/exhaustive-deps
      [localRef?.current?.value, max],
    )

    const helperSentiment = useMemo(() => {
      if (error) {
        return 'danger'
      }

      if (success) {
        return 'success'
      }

      return 'neutral'
    }, [error, success])

    return (
      <Stack gap="0.5" className={className}>
        <Stack direction="row" gap="1" alignItems="center">
          <Stack direction="row" gap="0.5" alignItems="start">
            <Text
              as="label"
              variant="bodyStrong"
              sentiment="neutral"
              htmlFor={id ?? localId}
            >
              {label}
            </Text>
            {required ? <Icon name="asterisk" color="danger" size={8} /> : null}
          </Stack>
          {labelDescription ?? null}
        </Stack>
        <div>
          <Tooltip text={tooltip}>
            <Container
              data-disabled={disabled}
              data-readonly={readOnly}
              data-error={!!error}
              data-success={!!success}
              data-unit={!!unit}
            >
              <SideContainer
                justifyContent="center"
                alignItems="center"
                data-size={size}
              >
                <Button
                  sentiment="neutral"
                  variant="ghost"
                  icon="minus"
                  size={size === 'small' ? 'xsmall' : 'small'}
                  disabled={disabled || readOnly || isMinusDisabled}
                  onClick={onClickSideButton('down')}
                  aria-label="minus"
                />
              </SideContainer>
              <InputContainer
                justifyContent="space-between"
                alignItems="center"
                templateColumns="1fr auto"
              >
                <Input
                  ref={localRef}
                  type="number"
                  name={name}
                  id={localId}
                  placeholder={placeholder}
                  onBlur={event => {
                    if (event.target.value === '') {
                      onBlur?.(event)

                      return
                    }

                    const numericValue = Number(event.target.value)
                    const maxValue = typeof max === 'number' ? max : Number(max)
                    const minValue = typeof min === 'number' ? min : Number(min)

                    if (
                      Number.isNaN(numericValue) ||
                      (!Number.isNaN(minValue) && numericValue < minValue)
                    ) {
                      onChange?.(createChangeEvent(min.toString()))
                    }

                    if (
                      Number.isNaN(numericValue) ||
                      (!Number.isNaN(maxValue) && numericValue > maxValue)
                    ) {
                      onChange?.(createChangeEvent(max.toString()))
                    }

                    onBlur?.(event)
                  }}
                  onFocus={onFocus}
                  onChange={onChange}
                  value={value}
                  data-size={size}
                  step={step}
                  disabled={disabled}
                  aria-label={ariaLabel}
                  data-testid={dataTestId}
                  min={min}
                  max={max}
                  required={required}
                  autoFocus={autoFocus}
                  readOnly={readOnly}
                  data-has-unit={!!unit}
                />
                {unit ? (
                  <Unit
                    variant="body"
                    sentiment="neutral"
                    as="span"
                    disabled={disabled}
                    size={size}
                  >
                    {unit}
                  </Unit>
                ) : null}
              </InputContainer>
              <SideContainer
                justifyContent="center"
                alignItems="center"
                data-size={size}
              >
                <Button
                  sentiment="neutral"
                  variant="ghost"
                  icon="plus"
                  size={size === 'small' ? 'xsmall' : 'small'}
                  disabled={disabled || readOnly || isPlusDisabled}
                  onClick={onClickSideButton('up')}
                  aria-label="plus"
                />
              </SideContainer>
            </Container>
          </Tooltip>
        </div>
        {error || success || helper ? (
          <Text
            variant="caption"
            as="span"
            prominence={!error && !success ? 'weak' : undefined}
            sentiment={helperSentiment}
            disabled={disabled || readOnly}
          >
            {error || success || helper}
          </Text>
        ) : null}
      </Stack>
    )
  },
)
