import styled from '@emotion/styled'
import { ComponentProps, ReactNode } from 'react'
import Badge from '../Badge'
import BorderedBox from '../BorderedBox'
import Expandable from '../Expandable'
import Radio from '../Radio'
import Text from '../Text'

type RadioProps = Pick<
  ComponentProps<typeof Radio>,
  | 'name'
  | 'checked'
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'disabled'
  | 'value'
  | 'size'
  | 'error'
>

type BorderedBoxTypes = {
  disabled: boolean
  checked: boolean
  error: string | ReactNode
}

const StyledBorderedBox = styled(BorderedBox)<BorderedBoxTypes>`
  display: block;

  ${({ disabled, checked, error, theme: { colors, shadows } }) => {
    if (disabled)
      return `
        cursor: not-allowed !important;
        color: ${colors.neutral.textDisabled};
      `
    if (error)
      return `
        border: 1px solid ${colors.danger.borderWeak} !important;
        box-shadow: ${shadows.focusDanger};
      `

    if (checked)
      return `
        border: 1px solid ${colors.primary.borderWeak} !important;
        box-shadow: ${shadows.focusPrimary};
      `

    return null
  }}
`

const StyledRadioContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0 ${({ theme }) => theme.space['1']};
  margin-bottom: ${({ theme }) => theme.space['1']};
`

const StyledSpaceContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledError = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger.text};
  padding: ${({ theme }) => `0 ${theme.space['0.5']}`};
`

const StyledExpandable = styled(Expandable)`
  margin-top: ${({ theme }) => theme.space['1']};
  margin-bottom: ${({ theme }) => theme.space['1']};
`

type RadioBorderedBoxProps = RadioProps & {
  badgeSize?: ComponentProps<typeof Badge>['size']
  badgeText?: string
  badgeProminence?: ComponentProps<typeof Badge>['prominence']
  badgeVariant?: ComponentProps<typeof Badge>['variant']
  children: ReactNode
  label: string
  labelDescription?: ReactNode
  name: string
  size?: number
  sideText?: string
  value: string | number
}

const RadioBorderedBox = ({
  label,
  labelDescription,
  sideText,
  badgeText,
  badgeSize = 'small',
  badgeVariant = 'info',
  badgeProminence = 'strong',
  checked = false,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  name,
  value,
  size = 24,
  children,
  error,
}: RadioBorderedBoxProps) => (
  <>
    <StyledBorderedBox disabled={disabled} checked={checked} error={error}>
      <StyledSpaceContainer>
        <StyledRadioContainer>
          <Radio
            name={name}
            checked={checked}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={disabled}
            value={value}
            size={size}
            error={error}
          >
            {label}
          </Radio>
          {labelDescription ? (
            <Text as="span" variant="body" disabled={disabled}>
              {labelDescription}
            </Text>
          ) : null}
          {badgeText && (
            <>
              &nbsp;
              <Badge
                size={badgeSize}
                variant={badgeVariant}
                prominence={badgeProminence}
                disabled={disabled}
              >
                {badgeText}
              </Badge>
            </>
          )}
        </StyledRadioContainer>
        {sideText ? (
          <Text
            as="span"
            variant="bodySmallStronger"
            color="primary"
            disabled={disabled}
          >
            {sideText}
          </Text>
        ) : null}
      </StyledSpaceContainer>
      <Text as="p" variant="body" disabled={disabled}>
        {children}
      </Text>
    </StyledBorderedBox>
    {error ? (
      <StyledExpandable opened={!!error}>
        <StyledError>{error}</StyledError>
      </StyledExpandable>
    ) : null}
  </>
)

export default RadioBorderedBox
