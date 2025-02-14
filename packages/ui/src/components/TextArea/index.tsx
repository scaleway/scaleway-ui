import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { AlertCircleIcon, CheckCircleIcon } from '@ultraviolet/icons'
import type { DOMAttributes, ReactNode } from 'react'
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import { Button } from '../Button'
import { SIZE_HEIGHT as ButtonSizeHeight } from '../Button/constants'
import { Label } from '../Label'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

const STATE_ICON_SIZE = 16

const StyledTextAreaWrapper = styled.div`
  position: relative;
  display: flex;
`

const StyledTextAreaAbsoluteStack = styled(Stack)`
  position: absolute;
  top: ${({ theme }) => theme.space['1.5']};
  right: ${({ theme }) => theme.space['1']};
`

type StyledTextAreaProps = {
  hasSentimentIcon: boolean
  isClearable: boolean
}
const StyledTextArea = styled('textarea', {
  shouldForwardProp: prop =>
    !['hasSentimentIcon', 'isClearable'].includes(prop),
})<StyledTextAreaProps>`
  width: 100%;
  resize: vertical;
  background: ${({ theme }) => theme.colors.neutral.background};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  color: ${({ theme }) => theme.colors.neutral.text};
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.textWeak};
  }
  border-radius: ${({ theme }) => theme.radii.default};
  padding: ${({ theme }) =>
    `${theme.space['1.5']} ${theme.space['1']} ${theme.space['1.5']} ${theme.space['2']}`};
  padding-right: ${({ theme, isClearable, hasSentimentIcon }) =>
    /* including 1 optional if both element is visible + 1 because content is absolute 1space unit from right */
    `calc(${theme.space[isClearable && hasSentimentIcon ? '4' : '3']} + ${
      isClearable ? `${ButtonSizeHeight.xsmall}px` : '0px'
    } + ${hasSentimentIcon ? `${STATE_ICON_SIZE}px` : '0px'})`};

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

  &:disabled {
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
    color: ${({ theme }) => theme.colors.neutral.textDisabled};

    &::placeholder {
      color: ${({ theme }) => theme.colors.neutral.textWeakDisabled};
    }
  }

  &:not(:disabled) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.primary.border};
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.border};
      box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
    }
  }
`

type LabelProps =
  | {
      label: string
      'aria-label'?: never
    }
  | {
      label?: never
      'aria-label': string
    }

type TextAreaProps = {
  id?: string
  className?: string
  tabIndex?: number
  autoFocus?: boolean
  value?: string
  onChange: (newValue: string) => void
  placeholder?: string
  /**
   * Override others properties : readyOnly, success, error.
   */
  disabled?: boolean
  /**
   * Override others properties : success, error.
   * Ignored if following props are provided : disabled.
   */
  readOnly?: boolean
  /**
   * Override others properties : error, helper.
   * Ignored if following props are provided : disabled, readyOnly.
   */
  success?: string
  /**
   * Override others properties : helper.
   * Ignored if following props are provided : disabled, readyOnly, success.
   */
  error?: string
  /**
   * Ignored if following props are provided : readyOnly, success.
   */
  helper?: ReactNode
  /**
   * Number of rows to display. If 'auto', the textarea will grow with the content and won't be resizable
   */
  rows?: number | 'auto'
  /**
   * Text area will grow with the content with a maximum number of rows.
   */
  maxRows?: number
  minLength?: number
  maxLength?: number
  tooltip?: string
  required?: boolean
  'data-testid'?: string
  name?: string
  onFocus?: DOMAttributes<HTMLTextAreaElement>['onFocus']
  onBlur?: DOMAttributes<HTMLTextAreaElement>['onBlur']
  onKeyDown?: DOMAttributes<HTMLTextAreaElement>['onKeyDown']
  clearable?: boolean
  labelDescription?: ReactNode
} & LabelProps

/**
 * This component offers an extended textarea HTML
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      className,
      tabIndex,
      value,
      onChange,
      placeholder,
      rows = 3,
      maxRows,
      disabled = false,
      readOnly = false,
      success,
      error,
      helper,
      minLength,
      maxLength,
      tooltip,
      label,
      autoFocus,
      required = false,
      'data-testid': dataTestId,
      name,
      onFocus,
      onBlur,
      onKeyDown,
      clearable = false,
      labelDescription,
      'aria-label': ariaLabel,
    },
    ref,
  ) => {
    const localId = useId()
    const theme = useTheme()
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    useImperativeHandle(ref, () => textAreaRef.current as HTMLTextAreaElement)

    useEffect(() => {
      const textArea = textAreaRef.current
      const padding = theme.space['1.5']

      if (textArea && rows === 'auto' && !maxRows) {
        textArea.style.height = 'auto'
        textArea.style.resize = 'none'
        textArea.style.height = `${textArea.scrollHeight + 2}px`
      } else if (textArea && maxRows) {
        const lineHeight = Number.parseFloat(
          getComputedStyle(textArea).lineHeight,
        )

        textArea.style.height = 'auto'
        const maxHeight = maxRows * lineHeight

        textArea.style.height = `${textArea.scrollHeight + 2}px`
        textArea.style.maxHeight = `calc(${maxHeight}px + 2*${padding})`

        if (typeof rows === 'number') {
          const minHeight = rows * lineHeight
          textArea.style.minHeight = `calc(${minHeight}px + 2*${padding})`
        }
      }
    }, [value, rows, theme, maxRows])

    const sentiment = useMemo(() => {
      if (error) {
        return 'danger'
      }

      if (success) {
        return 'success'
      }

      return 'neutral'
    }, [error, success])
    const notice = success || error || helper

    const computedClearable = clearable && !!value

    return (
      <Stack gap="0.5" className={className}>
        {label || labelDescription ? (
          <Label
            labelDescription={labelDescription}
            required={required}
            htmlFor={id ?? localId}
          >
            {label}
          </Label>
        ) : null}
        <Tooltip text={tooltip}>
          <StyledTextAreaWrapper>
            <StyledTextArea
              aria-invalid={!!error}
              id={id ?? localId}
              tabIndex={tabIndex}
              autoFocus={autoFocus}
              disabled={disabled}
              rows={rows !== 'auto' ? rows : 1}
              ref={textAreaRef}
              value={value}
              onChange={event => {
                onChange(event.currentTarget.value)
              }}
              hasSentimentIcon={!!success || !!error}
              data-readonly={readOnly}
              data-success={!!success}
              data-error={!!error}
              isClearable={!!computedClearable}
              minLength={minLength}
              maxLength={maxLength}
              placeholder={placeholder}
              data-testid={dataTestId}
              name={name}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
              aria-label={ariaLabel}
            />
            <StyledTextAreaAbsoluteStack
              direction="row"
              alignItems="center"
              gap="1"
            >
              {computedClearable ? (
                <Button
                  aria-label="clear value"
                  variant="ghost"
                  size="xsmall"
                  icon="close"
                  onClick={() => {
                    onChange('')
                  }}
                  sentiment="neutral"
                />
              ) : null}
              {success ? (
                <CheckCircleIcon sentiment="success" size={STATE_ICON_SIZE} />
              ) : null}
              {error ? <AlertCircleIcon sentiment="danger" /> : null}
            </StyledTextAreaAbsoluteStack>
          </StyledTextAreaWrapper>
        </Tooltip>

        {notice || maxLength ? (
          <Row templateColumns="minmax(0, 1fr) min-content" gap="1">
            <div>
              {error || success || typeof helper === 'string' ? (
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
            </div>
            {maxLength ? (
              <Text
                as="div"
                sentiment="neutral"
                prominence="weak"
                variant="caption"
              >
                {value?.length ?? 0}/{maxLength}
              </Text>
            ) : null}
          </Row>
        ) : null}
      </Stack>
    )
  },
)
