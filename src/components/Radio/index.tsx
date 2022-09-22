import styled from '@emotion/styled'
import {
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useId,
} from 'react'
import { Radio as ReakitRadio, RadioProps as ReakitRadioProps } from 'reakit'

const InnerCircleRing = styled.circle`
  fill: ${({ theme }) => theme.colors.neutral.backgroundWeak};
`

const RadioMark = styled.circle``

const RadioMarkedIcon = () => (
  <g>
    <circle cx="12" cy="12" r="8" strokeWidth="2" />
    <InnerCircleRing cx="12" cy="12" r="6" />
    <RadioMark cx="12" cy="12" r="4" />
  </g>
)

const StyledIcon = styled.svg<{ size: number }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  min-width: ${({ size }) => size}px;
  min-height: ${({ size }) => size}px;
  border-radius: ${({ theme }) => theme.radii.circle};
  fill: ${({ theme }) => theme.colors.neutral.textWeak};
  ${InnerCircleRing} {
    fill: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  }
`

const StyledRadio = styled(ReakitRadio)`
  visibility: hidden;
  position: absolute;
  cursor: pointer;
  & + ${StyledIcon} {
    ${RadioMark} {
      transform-origin: center;
      transition: 200ms transform ease-in-out;
      transform: scale(0);
    }
  }

  &[aria-checked='true'] + svg {
    ${RadioMark} {
      transform: scale(1);
    }
  }

  &[aria-checked='true'][aria-disabled='false'][aria-invalid='false']
    + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.primary.backgroundStrong};
  }

  &[aria-invalid='true'] + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.danger.text};
  }

  &:focus + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.primary.background};
    fill: ${({ theme }) => theme.colors.primary.backgroundStrong};
    ${InnerCircleRing} {
      fill: ${({ theme }) => theme.colors.primary.background};
    }
  }

  &[aria-invalid='true']:focus + ${StyledIcon} {
    background-color: ${({ theme }) => theme.colors.danger.background};
    fill: ${({ theme }) => theme.colors.danger.text};
    ${InnerCircleRing} {
      fill: ${({ theme }) => theme.colors.danger.background};
    }
  }
`

const StyledRadioContainer = styled.label<{ htmlFor: string }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space['1']};

  &[aria-disabled='false'] {
    cursor: pointer;
  }

  :hover[aria-disabled='false'] {
    ${StyledRadio}[id=${({ htmlFor }) => htmlFor}] + ${StyledIcon} {
      background-color: ${({ theme }) => theme.colors.primary.background};
      fill: ${({ theme }) => theme.colors.primary.backgroundStrong};
      ${InnerCircleRing} {
        fill: ${({ theme }) => theme.colors.primary.background};
      }
    }

    ${StyledRadio}[id=${({ htmlFor }) =>
      htmlFor}][aria-invalid='true']  + ${StyledIcon} {
      background-color: ${({ theme }) => theme.colors.danger.background};
      fill: ${({ theme }) => theme.colors.danger.text};
      ${InnerCircleRing} {
        fill: ${({ theme }) => theme.colors.danger.background};
      }
    }
  }
  &[aria-disabled='true'] {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.neutral.textDisabled};

    ${StyledIcon} {
      fill: ${({ theme }) => theme.colors.neutral.textDisabled};
      ${InnerCircleRing} {
        fill: ${({ theme }) => theme.colors.neutral.backgroundStrong};
      }
    }
  }
`

type RadioProps = {
  children: ReactNode
  error?: string | ReactNode
  checked?: boolean
  name?: string
  size?: number
  value: string | number
} & InputHTMLAttributes<HTMLInputElement> &
  Required<Pick<ReakitRadioProps, 'onChange'>>

const Radio = forwardRef(
  (
    {
      checked = false,
      onChange,
      onFocus,
      onBlur,
      disabled = false,
      error,
      name,
      value,
      size = 24,
      children,
      className,
      autoFocus,
      onKeyDown,
    }: RadioProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const id = useId()
    const computedName = name ?? id

    return (
      <StyledRadioContainer
        as="label"
        aria-disabled={disabled}
        htmlFor={`${computedName}-${value}`}
        className={className}
        data-checked={checked}
        data-error={error}
      >
        <StyledRadio
          type="radio"
          aria-invalid={!!error}
          aria-checked={checked}
          aria-disabled={disabled}
          checked={checked}
          id={`${computedName}-${value}`}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          value={value}
          disabled={disabled}
          name={computedName}
          autoFocus={autoFocus}
          ref={ref}
        />
        <StyledIcon size={size} viewBox="0 0 24 24">
          <RadioMarkedIcon />
        </StyledIcon>
        {children}
      </StyledRadioContainer>
    )
  },
)

export default Radio
