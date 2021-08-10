import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {
  FunctionComponent,
  ReactNode,
  Ref,
  useEffect,
  useMemo,
} from 'react'
import {
  Checkbox as ReakitCheckbox,
  CheckboxProps as ReakitCheckboxProps,
  useCheckboxState,
} from 'reakit/Checkbox'
import ActivityIndicator from '../ActivityIndicator'
import Box from '../Box'
import Expandable from '../Expandable'
import Icon from '../Icon'
import Typography, { typographyVariants } from '../Typography'

const StyledCheckBoxContainer = styled(Typography)`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: ${({ 'aria-disabled': disabled }) =>
    disabled ? 'not-allowed' : 'pointer'};
`

const StyledReakitCheckbox = styled(ReakitCheckbox, {
  shouldForwardProp: prop => !['hasChildren', 'size'].includes(prop.toString()),
})<{ hasChildren: boolean }>`
  opacity: 0.01;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: absolute;
  cursor: pointer;
  margin-right: ${({ hasChildren }) => (hasChildren ? '10px' : 0)};
  padding: 2px;
  pointer-events: auto;
  &:hover {
    svg {
      border-radius: ${({ theme }) => theme.radii.default};
      background-color: ${({ theme, disabled }) =>
        !disabled && theme.colors.gray100};
      fill: ${({ theme, disabled }) => !disabled && theme.colors.primary};
      transition: fill 300ms;
    }
  }
  &:focus + svg {
    outline: 1px ${({ theme }) => theme.colors.gray550} dotted;
  }
`

const StyledIcon = styled(Icon)`
  box-sizing: content-box;
`

const StyledChildrenContainer = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop.toString()),
})``

type CheckboxProps = {
  children: ReactNode
  valid: boolean | undefined
  error: string | ReactNode
  size?: number
  progress?: boolean
  disabled?: boolean
  typographyVariant?: string
} & ReakitCheckboxProps & {
    ref?: Ref<Element>
  } & XStyledProps

const Checkbox: FunctionComponent<CheckboxProps> = ({
  checked = false,
  onChange = () => undefined,
  onFocus = () => undefined,
  onBlur = () => undefined,
  valid = undefined,
  error,
  name = 'checkbox',
  value = undefined,
  size = 24,
  children,
  progress = false,
  disabled = false,
  autoFocus = false,
  typographyVariant = 'default',
  ...props
}) => {
  const hasChildren = !!children
  const checkbox = useCheckboxState({ state: checked })
  const color = useMemo(() => {
    if (disabled) return 'gray100'
    if (valid === false || !!error) return 'warning'
    if (valid === true) return 'success'
    if (checkbox.state) return 'primary'

    return 'gray300'
  }, [disabled, valid, checkbox.state, error])

  const { setState } = checkbox
  useEffect(() => {
    setState(checked)
  }, [checked, setState])

  return (
    <Box {...props}>
      <StyledCheckBoxContainer
        as="label"
        variant={typographyVariant}
        aria-disabled={disabled}
      >
        <StyledReakitCheckbox
          state={checkbox.state}
          setState={checkbox.setState}
          hasChildren={hasChildren}
          size={size}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!progress) onChange(e)
            setState(e.target.checked)
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          value={value}
          name={name}
          autoFocus={autoFocus}
        />
        {progress ? (
          <Box display="flex" mr={hasChildren ? 1 : 0}>
            <ActivityIndicator active size={size} />
          </Box>
        ) : (
          <StyledIcon
            mr={hasChildren ? '10px' : 0}
            p="2px"
            name={
              checkbox?.state
                ? 'checkbox-marked-outline'
                : 'checkbox-blank-outline'
            }
            color={color}
            size={size}
          />
        )}
        {hasChildren && (
          <StyledChildrenContainer>{children}</StyledChildrenContainer>
        )}
      </StyledCheckBoxContainer>
      <Expandable height={56} overflow="hidden" opened={!!error}>
        <Box fontSize={12} color="warning" px="4px">
          {error}
        </Box>
      </Expandable>
    </Box>
  )
}

Checkbox.propTypes = {
  autoFocus: PropTypes.bool,
  checked: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  progress: PropTypes.bool,
  size: PropTypes.number,
  typographyVariant: PropTypes.oneOf(typographyVariants),
  valid: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Checkbox
