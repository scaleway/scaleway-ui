import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { ChangeEventHandler, ReactNode } from 'react'
import Tooltip from '../Tooltip'

const SIZES = {
  medium: {
    ball: 20,
    height: 32,
    width: 72,
  },
  small: {
    ball: 12,
    height: 24,
    width: 40,
  },
} as const

type Sizes = keyof typeof SIZES
const switchSizes = Object.keys(SIZES) as Sizes[]

interface LabelProps {
  size?: Sizes
  onLabel?: string | ReactNode
  offLabel?: string | ReactNode
  labeled?: boolean | LabelPositions
}

const SwitchBall = styled.span``
const SwitchBallContainer = styled.div``
const StyledInsideLabel = styled.span``

const labelPositions = ['left', 'right', 'inside'] as const

type LabelPositions = typeof labelPositions[number]

type VariantProps = LabelProps & {
  width?: number
}

type Variants = 'primary' | 'success'

type StyledSwitchProps = VariantProps & {
  variant?: Variants
  disabled?: boolean
}

const SwitchVariantsStyles = {
  primary: (theme: Theme) => css`
    &[data-checked='true'] {
      color: ${theme.colors.neutral.textStrong};
      background-color: ${theme.colors.primary.backgroundStrong};
    }

    &[data-checked='true'] {
      & > ${StyledInsideLabel} {
        color: ${theme.colors.primary.textStrong};
      }

      &:focus-within,
      &:focus {
        box-shadow: ${theme.shadows.focusPrimary};
      }
    }
  `,
  success: (theme: Theme) => css`
    color: ${theme.colors.neutral.text};
    background-color: ${theme.colors.neutral.backgroundHover};
    font-weight: bold;

    & ${SwitchBall} {
      background-color: ${theme.colors.neutral.backgroundWeak};
    }

    &[data-checked='true'] {
      color: ${theme.colors.success.text};
      background-color: ${theme.colors.success.backgroundHover};

      & ${SwitchBall} {
        background-color: ${theme.colors.success.backgroundStrong};
      }

      & > ${StyledInsideLabel} {
        color: ${theme.colors.neutral.textStrong};
      }

      &:focus-within,
      &:focus {
        box-shadow: 0 0 1px 2px ${theme.colors.neutral.backgroundWeak},
          0 0 1px 3px ${theme.colors.success.backgroundStrong};
      }
    }
  `,
}

const StyledSwitch = styled('div', {
  shouldForwardProp: prop => !['variant'].includes(prop.toString()),
})<StyledSwitchProps>`
  box-sizing: content-box;
  outline: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 34px;
  position: relative;
  transition: all 250ms;
  padding: ${({ theme }) => theme.space[0.5]};
  height: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.neutral.backgroundHover};
  min-width: ${({ theme }) => theme.space[6]};

  &:focus-within,
  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
  }

  & ${SwitchBallContainer} {
    position: absolute;
    margin-left: ${({ theme }) => theme.space[0.5]};
    margin-right: ${({ theme }) => theme.space[0.5]};
    left: 0;
    right: ${({ theme }) => theme.space[3]};
    transition: all 250ms;
    top: ${({ theme }) => theme.space[0.5]};
    bottom: 0;
  }

  & ${SwitchBall} {
    display: block;
    border-radius: 50%;
    width: ${({ theme }) => theme.space[3]};
    height: ${({ theme }) => theme.space[3]};
    background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  }

  &[data-checked='true'] > ${SwitchBallContainer} {
    transform: translateX(100%);
  }

  &:not([data-checked='true']) > ${StyledInsideLabel} {
    margin-left: ${({ theme }) => theme.space[4]};
    margin-right: ${({ theme }) => theme.space[1]};
  }

  &[data-checked='true'] ${StyledInsideLabel} {
    margin-right: ${({ theme }) => theme.space[4]};
    margin-left: ${({ theme }) => theme.space[1]};
  }

  &[data-size='small'] {
    padding: ${({ theme }) => theme.space[0.5]};
    height: ${({ theme }) => theme.space[2]};
    min-width: ${({ theme }) => theme.space[4]};

    & ${SwitchBallContainer} {
      right: ${({ theme }) => theme.space[2]};
    }

    & ${SwitchBall} {
      width: ${({ theme }) => theme.space[2]};
      height: ${({ theme }) => theme.space[2]};
    }

    &:not([data-checked='true']) > ${StyledInsideLabel} {
      margin-left: calc(
        ${({ theme }) => theme.space[2]} + ${({ theme }) => theme.space[0.5]}
      );
      margin-right: ${({ theme }) => theme.space[0.5]};
    }

    &[data-checked='true'] ${StyledInsideLabel} {
      margin-right: calc(
        ${({ theme }) => theme.space[2]} + ${({ theme }) => theme.space[0.5]}
      );
      margin-left: ${({ theme }) => theme.space[0.5]};
    }
  }

  &[data-variant='success'] {
    &[data-checked='true'] {
      background-color: ${({ theme }) => theme.colors.success.backgroundStrong};
    }
  }

  ${({ theme }) =>
    Object.entries(SwitchVariantsStyles).map(
      ([key, variantFn]) => css`
        &[data-variant='${key}'] {
          ${variantFn(theme)}
        }
      `,
    )}
`

const StyledCheckbox = styled.input`
  position: absolute;
  opacity: 0.01;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &[disabled] {
    cursor: not-allowed;
  }
`

const StyledLabel = styled.div<{ width?: number }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: ${({ width }) => (width ? `${width}px` : `fit-content`)};

  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.3;
  }
`

const StyledLabelContent = styled('div', {
  shouldForwardProp: prop => !['labeled', 'value'].includes(prop.toString()),
})<{
  labeled: boolean | LabelPositions
  value: ReactNode
}>`
  ${({ labeled, value, theme }) =>
    labeled === 'left' && typeof value === 'string'
      ? `margin-right: ${theme.space[1]}`
      : `margin-left: ${theme.space[1]}`}
`

type SwitchProps = StyledSwitchProps & {
  id?: string
  checked?: boolean
  name: string
  tooltip?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const Switch = ({
  checked = false,
  disabled = false,
  id,
  name,
  onChange,
  size = 'medium',
  tooltip,
  labeled = false,
  onLabel,
  offLabel,
  variant = 'primary',
  width,
}: SwitchProps) => {
  const renderInsideLabel = labeled && labeled !== 'right' && labeled !== 'left'

  return (
    <Tooltip text={tooltip}>
      <StyledLabel
        width={width}
        aria-disabled={disabled}
        onClick={evt => evt.stopPropagation()}
      >
        {labeled === 'left' ? (
          <StyledLabelContent
            labeled={labeled}
            value={checked ? onLabel : offLabel}
          >
            {checked ? onLabel : null}
            {!checked ? offLabel : null}
          </StyledLabelContent>
        ) : null}
        <StyledSwitch
          size={size}
          data-checked={checked}
          data-variant={variant}
          data-size={size}
        >
          {renderInsideLabel ? (
            <StyledInsideLabel>
              {checked ? onLabel : offLabel}
            </StyledInsideLabel>
          ) : null}
          <SwitchBallContainer>
            <SwitchBall />
          </SwitchBallContainer>
          <StyledCheckbox
            id={id || name}
            aria-label={name}
            checked={checked}
            disabled={disabled}
            name={name}
            onChange={onChange}
            type="checkbox"
          />
        </StyledSwitch>
        {labeled === 'right' ? (
          <StyledLabelContent
            labeled={labeled}
            value={checked ? onLabel : offLabel}
          >
            {checked ? onLabel : null}
            {!checked ? offLabel : null}
          </StyledLabelContent>
        ) : null}
      </StyledLabel>
    </Tooltip>
  )
}

Switch.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  /**
   * Left and right will be outside of switch button in the contrary of inside value.
   */
  labeled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(labelPositions),
  ]),
  name: PropTypes.string.isRequired,
  /**
   * Text or node shown in switch button when its state if off
   */
  offLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onChange: PropTypes.func.isRequired,
  /**
   * Text or node shown in switch button when its state if on
   */
  onLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  size: PropTypes.oneOf(switchSizes),
  tooltip: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'success']),
  width: PropTypes.number,
}

export default Switch
