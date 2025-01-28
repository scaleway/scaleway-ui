import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { AsteriskIcon } from '@ultraviolet/icons'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef, useId } from 'react'
import { Loader } from '../Loader'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

const ErrorText = styled(Text)`
  padding-top: ${({ theme }) => `${theme.space['0.5']}`};
`
const InnerCheckbox = styled.rect`
  fill: ${({ theme }) => theme.colors.neutral.background};
  stroke: ${({ theme }) => theme.colors.neutral.border};
`

const CheckMixedMark = styled.rect``

const CheckboxIconContainer = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()

  return (
    <g>
      <InnerCheckbox
        x="4"
        y="4"
        width="16"
        height="16"
        rx={theme.radii.small}
        strokeWidth="2"
      />
      {children}
    </g>
  )
}

const StyledIcon = styled('svg')<{ size: number | string }>`
  border-radius: ${({ theme }) => theme.radii.default};
  height: ${({ size }) => (typeof size === 'string' ? size : `${size}px`)};
  width: ${({ size }) => (typeof size === 'string' ? size : `${size}px`)};
  min-width: ${({ size }) => (typeof size === 'string' ? size : `${size}px`)};
  min-height: ${({ size }) => (typeof size === 'string' ? size : `${size}px`)};

  & path {
    fill: ${({ theme }) => theme.colors.neutral.background};
    transform: translate(2px, 2px);
    transform: scale(0);
  }
`
const StyledLabel = styled('label')`
  width: 100%;
  cursor: pointer;
`

const StyledTextLabel = styled(Text)`
  width: 100%;
  cursor: pointer;
`

const CheckboxInput = styled('input', {
  shouldForwardProp: prop => !['inputSize'].includes(prop),
})<{ inputSize: number | string }>`
  position: absolute;
  white-space: nowrap;
  height: ${({ inputSize }) => (typeof inputSize === 'string' ? inputSize : `${inputSize}px`)};
  width: ${({ inputSize }) => (typeof inputSize === 'string' ? inputSize : `${inputSize}px`)};
  opacity: 0;
  border-width: 0;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:not(:disabled) {
    &:checked + ${StyledIcon}, &[aria-checked='mixed'] + ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.primary.backgroundStrong};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.primary.borderStrong};
      }
    }

    &[aria-invalid='true']
      + ${StyledIcon},
      &[aria-invalid='mixed']
      + ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.danger.background};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.danger.border};
      }
    }
  }

  &:focus + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.primary.background};
    fill: ${({ theme }) => theme.colors.danger.background};
    outline: 1px solid ${({ theme }) => theme.shadows.focusPrimary};

    ${InnerCheckbox} {
      stroke: ${({ theme }) => theme.colors.primary.borderHover};
      fill: ${({ theme }) => theme.colors.primary.backgroundHover};
    }
  }

  &[aria-invalid='true']:focus + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.danger.background};
    fill: ${({ theme }) => theme.colors.danger.background};
    outline: 1px solid ${({ theme }) => theme.shadows.focusDanger};

    ${InnerCheckbox} {
      stroke: ${({ theme }) => theme.colors.danger.borderHover};
      fill: ${({ theme }) => theme.colors.danger.backgroundHover};
    }
  }
`

export const CheckboxContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: start;
  gap: ${({ theme }) => theme.space['1']};

  ${StyledLabel} {
    cursor: pointer;
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;

    ${StyledLabel} {
      cursor: not-allowed;
    }

    color: ${({ theme }) => theme.colors.neutral.textDisabled};

    ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.neutral.borderDisabled};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.neutral.borderStrongDisabled};
        fill: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
      }
    }

    ${CheckboxInput}[aria-invalid="true"]:checked + ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.danger.backgroundStrongDisabled};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.danger.borderStrongDisabled};
        fill: ${({ theme }) => theme.colors.danger.backgroundStrongDisabled};
      }
    }

    ${CheckboxInput}[aria-invalid="true"] + ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.danger.background};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.danger.borderDisabled};
        fill: ${({ theme }) => theme.colors.danger.background};
      }
    }

    ${CheckboxInput}:checked + ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.primary.backgroundStrongDisabled};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.primary.borderDisabled};
        fill: ${({ theme }) => theme.colors.primary.borderDisabled};
      }
    }

    ${CheckboxInput}[aria-checked="mixed"] + ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.primary.backgroundStrongDisabled};

      ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.primary.borderStrongDisabled};
        fill: ${({ theme }) => theme.colors.primary.backgroundStrongDisabled};
      }
    }
  }

  ${CheckboxInput}:checked + ${StyledIcon} path {
    transform-origin: center;
    transition: 200ms transform ease-in-out;
    transform: scale(1);
    transform: translate(2px, 2px);
  }

  ${CheckboxInput}:checked + ${StyledIcon} ${InnerCheckbox} {
    fill: ${({ theme }) => theme.colors.primary.backgroundStrong};
    stroke: ${({ theme }) => theme.colors.primary.borderStrong};
  }

  ${CheckboxInput}[aria-invalid="true"]:checked + ${StyledIcon} ${InnerCheckbox} {
    fill: ${({ theme }) => theme.colors.danger.backgroundStrong};
    stroke: ${({ theme }) => theme.colors.danger.borderStrong};
  }

  ${CheckboxInput}[aria-checked="mixed"] + ${StyledIcon} {
    ${CheckMixedMark} {
      fill: ${({ theme }) => theme.colors.neutral.iconStronger};
    }

    ${InnerCheckbox} {
      fill: ${({ theme }) => theme.colors.primary.backgroundStrong};
      stroke: ${({ theme }) => theme.colors.primary.borderStrong};
    }
  }

  &:hover[aria-disabled='false'] {
    ${CheckboxInput}[aria-invalid='false'] {
      &[aria-checked='false'] + ${StyledIcon} ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.primary.borderHover};
        fill: ${({ theme }) => theme.colors.primary.backgroundHover};
      }

      &[aria-checked='true'] + ${StyledIcon} ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.primary.borderStrongHover};
        fill: ${({ theme }) => theme.colors.primary.backgroundStrongHover};
      }

      &[aria-checked='mixed'] + ${StyledIcon} ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.primary.borderStrongHover};
        fill: ${({ theme }) => theme.colors.primary.backgroundStrongHover};
      }
    }

    ${CheckboxInput}[aria-invalid='true'] {
      &[aria-checked='false'] + ${StyledIcon} ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.danger.borderHover};
        fill: ${({ theme }) => theme.colors.danger.backgroundHover};
      }

      &[aria-checked='true'] + ${StyledIcon} ${InnerCheckbox} {
        stroke: ${({ theme }) => theme.colors.danger.borderStrongHover};
        fill: ${({ theme }) => theme.colors.danger.backgroundStrongHover};
      }
    }
  }

  ${CheckboxInput}[aria-invalid="true"] + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.danger.backgroundStrong};

    ${InnerCheckbox} {
      stroke: ${({ theme }) => theme.colors.danger.backgroundStrong};
      fill: ${({ theme }) => theme.colors.danger.background};
    }
  }
`

const StyledActivityContainer = styled.div`
  display: flex;
`

type LabelProp =
  | {
      children: ReactNode
      'aria-label'?: never
    }
  | {
      children?: never
      'aria-label': string
    }

type CheckboxProps = {
  error?: string | ReactNode
  /**
   * @deprecated Size prop is deprecated and will be removed in next major update.
   */
  size?: number
  /**
   * @deprecated Progress prop is deprecated and will be removed in next major update.
   */
  progress?: boolean
  helper?: ReactNode
  disabled?: boolean
  checked?: boolean | 'indeterminate'
  className?: string
  ['data-visibility']?: string
  required?: boolean
  'data-testid'?: string
  tooltip?: string
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'autoFocus'
  | 'id'
  | 'name'
  | 'onBlur'
  | 'onChange'
  | 'onClick'
  | 'onFocus'
  | 'tabIndex'
  | 'value'
> &
  LabelProp

/**
 * Checkbox is an input component used to select or deselect an option.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      checked = false,
      onChange,
      onFocus,
      onBlur,
      error,
      name,
      helper,
      value,
      size,
      children,
      progress = false,
      disabled = false,
      autoFocus = false,
      className,
      'data-visibility': dataVisibility,
      'aria-label': ariaLabel,
      required,
      'data-testid': dataTestId,
      tooltip,
      tabIndex,
    },
    ref,
  ) => {
    const theme = useTheme()
    const uniqId = useId()
    const localId = id ?? uniqId

    const isDisabled = disabled || progress
    const isCheck = checked === true ? checked : false

    return (
      <Tooltip text={tooltip}>
        <CheckboxContainer
          className={className}
          aria-disabled={isDisabled}
          data-visibility={dataVisibility}
          data-checked={checked}
          data-error={!!error}
          data-testid={dataTestId}
        >
          {progress ? (
            <StyledActivityContainer>
              <Loader active size={size ?? theme.sizing['300']} />
            </StyledActivityContainer>
          ) : null}

          <CheckboxInput
            id={localId}
            type="checkbox"
            aria-invalid={!!error}
            aria-describedby={error ? `${localId}-hint` : undefined}
            aria-checked={checked === 'indeterminate' ? 'mixed' : isCheck}
            aria-label={ariaLabel}
            checked={isCheck}
            inputSize={size ?? theme.sizing['300']}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={isDisabled}
            value={value}
            name={name}
            autoFocus={autoFocus}
            ref={ref}
            required={required}
            tabIndex={tabIndex}
          />

          {!progress ? (
            <StyledIcon
              size={size ?? theme.sizing['300']}
              viewBox="0 0 24 24"
              fill="none"
            >
              <CheckboxIconContainer>
                {checked !== 'indeterminate' ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    width={12}
                    height={9}
                    x="5"
                    y="4"
                    d="M15.6678 5.26709C16.0849 5.6463 16.113 6.28907 15.7307 6.70276L9.29172 13.6705C9.10291 13.8748 8.83818 13.9937 8.55884 13.9998C8.2795 14.0058 8.0098 13.8984 7.81223 13.7024L4.30004 10.2185C3.89999 9.82169 3.89999 9.17831 4.30004 8.78149C4.70009 8.38467 5.34869 8.38467 5.74874 8.78149L8.50441 11.5149L14.2205 5.32951C14.6028 4.91583 15.2508 4.88788 15.6678 5.26709Z"
                    fill="white"
                  />
                ) : (
                  <CheckMixedMark x="6" y="11" rx="1" width="12" height="2" />
                )}
              </CheckboxIconContainer>
            </StyledIcon>
          ) : null}

          {!!children || required || !!helper || !!error ? (
            <Stack gap={0.5} flex={1}>
              <Stack gap={0.5} direction="row" alignItems="center" flex={1}>
                {children ? (
                  <>
                    {typeof children === 'string' ? (
                      <StyledTextLabel
                        as="label"
                        variant="body"
                        sentiment="neutral"
                        prominence="default"
                        htmlFor={localId}
                      >
                        {children}
                      </StyledTextLabel>
                    ) : (
                      <StyledLabel htmlFor={localId}>{children}</StyledLabel>
                    )}
                  </>
                ) : null}
                {required ? (
                  <sup>
                    <AsteriskIcon size={8} sentiment="danger" />
                  </sup>
                ) : null}
              </Stack>

              {helper ? (
                <Text
                  variant="caption"
                  as="span"
                  prominence="weak"
                  sentiment="neutral"
                >
                  {helper}
                </Text>
              ) : null}

              {error && typeof error !== 'boolean' ? (
                <ErrorText variant="caption" as="span" sentiment="danger">
                  {error}
                </ErrorText>
              ) : null}
            </Stack>
          ) : null}
        </CheckboxContainer>
      </Tooltip>
    )
  },
)
