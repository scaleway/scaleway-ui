import styled from '@emotion/styled'
import { AlertCircleIcon, CheckCircleOutlineIcon } from '@ultraviolet/icons'
import type {
  ChangeEvent,
  ClipboardEventHandler,
  KeyboardEventHandler,
  ReactNode,
} from 'react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { getUUID } from '../../utils'
import { Button } from '../Button'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Tag } from '../Tag'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

// Size & Padding
export const TAGINPUT_SIZE_PADDING = {
  large: '1.5',
  medium: '1',
  small: '0.5',
} as const
type TagInputSize = keyof typeof TAGINPUT_SIZE_PADDING

const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
} as const

type Keys = keyof typeof STATUS
type StatusValue = (typeof STATUS)[Keys]

type TagInputContainersProps = {
  size: TagInputSize
}
const TagInputContainer = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop),
})<TagInputContainersProps>`
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
  background-color: ${({ theme: { colors } }) => colors.neutral.background};

  padding: ${({ theme, size }) =>
    `calc(${theme.space[TAGINPUT_SIZE_PADDING[size]]} - 1px) ${
      size === 'small' ? theme.space['1'] : theme.space['2']
    }`};
  cursor: text;

  background: ${({ theme }) => theme.colors.neutral.background};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
  }

  &[data-success="true"] {
    border-color: ${({ theme }) => theme.colors.success.border};
  }

  &[data-error="true"] {
    border-color: ${({ theme }) => theme.colors.danger.border};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.borderHover};
  }

  &[data-readonly="true"] {
    border-color: ${({ theme }) => theme.colors.neutral.border};
    background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  }

  &[data-disabled="true"] {
    border-color: ${({ theme }) => theme.colors.neutral.borderDisabled};
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    cursor: not-allowed;
  }
`

const DataContainer = styled('div')`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space['1']};
  flex: 1;
`

const StateContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space['1']};
`

const StyledInput = styled.input<{ 'data-size': TagInputSize }>`
  display: flex;
  flex: 1;
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
  background: inherit;
  color: ${({ theme: { colors } }) => colors.neutral.text};
  border: none;
  outline: none;
  &::placeholder {
    color: ${({ theme: { colors } }) => colors.neutral.textWeak};
  }
  height: 100%;

  &[data-size="large"] {
    font-size: ${({ theme }) => theme.typography.body.fontSize};
  }
`

const convertTagArrayToTagStateArray = (tags?: TagInputProp) =>
  (tags ?? [])?.map((tag, index) =>
    typeof tag === 'object'
      ? { ...tag, index: getUUID(`tag-${index}`) }
      : { index: getUUID(`tag-${index}`), label: tag },
  )

type TagInputProp = (string | { label: string; index: string })[]

type TagInputProps = {
  disabled?: boolean
  id?: string
  /**
   * @deprecated this prop has no more effect
   */
  manualInput?: boolean
  name?: string
  onChange?: (tags: string[]) => void
  /**
   * @deprecated this prop has no more effect
   */
  onChangeError?: (error: Error | string) => void
  placeholder?: string
  /**
   * @deprecated use `value` property instead, both properties work the same way
   */
  tags?: TagInputProp
  value?: TagInputProp
  /**
   * @deprecated there is only one variant now, this prop has no more effect
   */
  variant?: string
  className?: string
  'data-testid'?: string
  label?: string
  /**
   * Label description displayed right next to the label. It allows you to customize the label content.
   */
  labelDescription?: ReactNode
  'aria-label'?: string
  required?: boolean
  size?: TagInputSize
  error?: string
  success?: string | boolean
  helper?: ReactNode
  readOnly?: boolean
  tooltip?: string
  clearable?: boolean
}

/**
 * TagInput is a component that allows users to input tags.
 */
export const TagInput = ({
  disabled = false,
  id,
  name,
  onChange,
  placeholder,
  tags,
  value,
  className,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  label,
  labelDescription,
  required = false,
  size = 'large',
  error,
  success,
  helper,
  readOnly = false,
  tooltip,
  clearable = false,
}: TagInputProps) => {
  const tagsProp = value ?? tags

  const [tagInputState, setTagInput] = useState(
    convertTagArrayToTagStateArray(tagsProp),
  )
  const [input, setInput] = useState<string>('')
  const [status, setStatus] = useState<{ [key: string]: StatusValue }>({})

  const uniqueId = useId()
  const localId = id ?? uniqueId

  useEffect(() => {
    setTagInput(convertTagArrayToTagStateArray(tagsProp))
  }, [tagsProp, setTagInput])

  const inputRef = useRef<HTMLInputElement>(null)

  const dispatchOnChange = (newState: TagInputProp) => {
    const changes = newState.map(tag =>
      typeof tag === 'object' ? tag?.label : tag,
    )

    onChange?.(changes)
  }

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef?.current?.focus()
    }
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value)

  const addTag = () => {
    const newTagInput = input
      ? [...tagInputState, { index: getUUID('tag'), label: input }]
      : tagInputState
    setInput('')
    setTagInput(newTagInput)
    if (newTagInput.length !== tagInputState.length && newTagInput) {
      setStatus({
        [newTagInput[newTagInput.length - 1].index]: STATUS.LOADING,
      })
    }
    try {
      dispatchOnChange(newTagInput)
      if (newTagInput) {
        setStatus({ [newTagInput[newTagInput.length - 1].index]: STATUS.IDLE })
      }
    } catch {
      setTagInput(tagInputState)
    }
  }

  const deleteTag = (tagIndex: string) => {
    setStatus({ [tagIndex]: STATUS.LOADING })
    const findIndex = tagInputState.findIndex(({ index }) => index === tagIndex)
    const newTagInput = [...tagInputState]
    newTagInput.splice(findIndex, 1)
    try {
      dispatchOnChange(newTagInput)
      setTagInput(newTagInput)
      setStatus({ [tagIndex]: STATUS.IDLE })
    } catch {
      setTagInput(tagInputState)
    }
  }

  const handleInputKeydown: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === ' ' || event.key === 'Enter') {
      addTag()
      event.preventDefault()
    }
    if (
      event.key === 'Backspace' &&
      inputRef?.current?.selectionStart === 0 &&
      tagInputState.length > 0
    ) {
      event.preventDefault()
      if (tagInputState) {
        deleteTag(tagInputState[tagInputState.length - 1].index)
      }
    }
  }

  const handlePaste: ClipboardEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    const newTagInput = [
      ...tagInputState,
      { index: getUUID('tag'), label: e?.clipboardData?.getData('Text') },
    ]
    setTagInput(newTagInput)
    setStatus({ [newTagInput.length - 1]: STATUS.LOADING })
    try {
      dispatchOnChange(newTagInput)
      setStatus({ [newTagInput.length - 1]: STATUS.IDLE })
    } catch {
      setTagInput(tagInputState)
    }
  }

  const clearAll = () => {
    setInput('')
    setTagInput([])
    dispatchOnChange([])
  }

  const helperSentiment = useMemo(() => {
    if (error) {
      return 'danger'
    }

    if (success) {
      return 'success'
    }

    return 'neutral'
  }, [error, success])

  const computedClearable = clearable && tagInputState.length > 0

  return (
    <Stack gap="0.5" className={className}>
      {label || labelDescription ? (
        <Label
          required={required}
          size={size}
          labelDescription={labelDescription}
          htmlFor={id ?? localId}
        >
          {label}
        </Label>
      ) : null}
      <div>
        <Tooltip text={tooltip}>
          <TagInputContainer
            onClick={handleContainerClick}
            className={className}
            data-testid={dataTestId}
            size={size}
            data-disabled={disabled}
            data-readonly={readOnly}
            data-error={!!error}
            data-success={!!success}
          >
            <DataContainer>
              {tagInputState.map(tag => (
                <Tag
                  sentiment="neutral"
                  disabled={disabled}
                  key={tag.index}
                  isLoading={status[tag.index] === STATUS.LOADING}
                  onClose={
                    !readOnly
                      ? e => {
                          e.stopPropagation()
                          deleteTag(tag.index)
                        }
                      : undefined
                  }
                >
                  {tag.label}
                </Tag>
              ))}
              {!disabled ? (
                <StyledInput
                  id={localId}
                  name={name}
                  aria-label={ariaLabel}
                  type="text"
                  placeholder={tagInputState.length === 0 ? placeholder : ''}
                  value={input}
                  onBlur={addTag}
                  onChange={onInputChange}
                  onKeyDown={handleInputKeydown}
                  onPaste={handlePaste}
                  ref={inputRef}
                  readOnly={readOnly}
                  data-size={size}
                />
              ) : null}
            </DataContainer>
            {computedClearable || success || error ? (
              <StateContainer>
                {computedClearable ? (
                  <Button
                    aria-label="clear value"
                    disabled={disabled}
                    variant="ghost"
                    size="xsmall"
                    icon="close"
                    onClick={clearAll}
                    sentiment="neutral"
                  />
                ) : null}
                {success ? (
                  <CheckCircleOutlineIcon
                    sentiment="success"
                    size={16}
                    disabled={disabled}
                  />
                ) : null}
                {error ? (
                  <AlertCircleIcon
                    sentiment="danger"
                    size={16}
                    disabled={disabled}
                  />
                ) : null}
              </StateContainer>
            ) : null}
          </TagInputContainer>
        </Tooltip>
      </div>
      {error || typeof success === 'string' || helper ? (
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
}
