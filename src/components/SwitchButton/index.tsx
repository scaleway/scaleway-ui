import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  FunctionComponent,
  LabelHTMLAttributes,
  ReactNode,
} from 'react'
import { Radio } from 'reakit'
import Box from '../Box'
import Tooltip from '../Tooltip'

const variants = {
  segment: ({ theme }: { theme: Theme }) => css`
    font-size: 14;
    height: 40px;
    transition: none;
    border-radius: 4px;
    box-shadow: none;

    &:hover,
    &:focus {
      box-shadow: none;
      border-color: ${theme.colors.transparent};
      color: ${theme.colors.gray700};
    }

    &[aria-checked='true'] {
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};
      :hover {
        color: ${theme.colors.white};
      }
    }

    &[aria-checked='false'] {
      background-color: white;
      color: ${theme.colors.gray700};
      border-color: ${theme.colors.transparent};
      :hover,
      :focus {
        color: ${theme.colors.gray700};
        border-color: ${theme.colors.transparent};
        box-shadow: none;
      }
    }
  `,
} as const

type Variants = keyof typeof variants

const switchButtonVariants = Object.keys(variants) as Variants[]

const active = ({ theme }: { theme: Theme }) => css`
  &:hover,
  &:focus {
    color: ${theme.colors.gray550};
    border-color: ${theme.colors.primary};
  }

  &:hover {
    box-shadow: 0 0 8px 2px ${theme.colors.gray200};
  }

  &:focus {
    box-shadow: 0 0 1px 2px ${transparentize(0.75, theme.colors.primary)};
  }
`

const disabledClass = ({ theme }: { theme: Theme }) => css`
  cursor: not-allowed;
  color: ${theme.colors.gray350};
  background-color: ${theme.colors.gray50};
  border-color: ${theme.colors.gray350};
  pointer-events: none;

  &[aria-checked='true'] {
    color: ${theme.colors.gray350};
    border-color: ${theme.colors.gray350};
  }
`

type StyledSwitchProps = {
  checked?: boolean
  disabled?: boolean
  variant?: Variants
} & LabelHTMLAttributes<HTMLLabelElement>

const StyledSwitch = styled(Box, {
  shouldForwardProp: prop => !['variant'].includes(prop.toString()),
})<StyledSwitchProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 4px;
  align-items: center;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.gray350};
  border-width: 1px;
  padding: 16px;
  transition: color 0.2s, border-color 0.2s, box-shadow 0.2s;
  user-select: none;
  touch-action: manipulation;
  color: ${({ theme }) => theme.colors.gray550};
  font-size: 16px;
  line-height: 22px;
  position: relative;
  font-weight: 500;
  cursor: pointer;

  &[aria-checked='true'] {
    cursor: auto;
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ${({ checked, disabled }) => !checked && !disabled && active}
  ${({ disabled }) => disabled && disabledClass}
  ${({ variant }) => variant && variants[variant]}
`

const StyledRadio = styled(Radio)`
  position: absolute;
  opacity: 0.01;
`

type SwitchButtonProps = StyledSwitchProps & {
  children:
    | ReactNode
    | (({
        checked,
        disabled,
      }: {
        checked: boolean
        disabled: boolean
      }) => JSX.Element)
  name: string
  onBlur?: FocusEventHandler
  onChange: ChangeEventHandler
  onFocus?: FocusEventHandler
  tooltip?: string
  value: string
}

const SwitchButton: FunctionComponent<SwitchButtonProps> = ({
  checked = false,
  disabled = false,
  onChange,
  onFocus,
  onBlur,
  name,
  value,
  children,
  tooltip,
  variant,
  ...props
}) => (
  <Tooltip text={tooltip}>
    <StyledSwitch
      as="label"
      htmlFor={`${name}-${value}`}
      disabled={disabled}
      variant={variant}
      checked={checked}
      aria-checked={checked}
      {...props}
    >
      {typeof children === 'function'
        ? children({ checked, disabled })
        : children}
      <StyledRadio
        checked={checked}
        disabled={disabled}
        id={`${name}-${value}`}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        type="radio"
        value={value}
      />
    </StyledSwitch>
  </Tooltip>
)

SwitchButton.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  tooltip: PropTypes.string,
  value: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(switchButtonVariants),
}

export default SwitchButton
