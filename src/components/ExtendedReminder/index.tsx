import { Theme, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent, MouseEventHandler } from 'react'
import Badge from '../Badge'
import Box from '../Box'
import Button from '../Button'
import Icon, { IconName, icons } from '../Icon'
import Typography from '../Typography'

const variants = {
  error: ({ colors }: Theme) => ({
    background: colors.pippin,
    main: colors.red,
  }),
  info: ({ colors }: Theme) => ({
    background: colors.zumthor,
    main: colors.blue,
  }),
  success: ({ colors }: Theme) => ({
    background: colors.foam,
    main: colors.gray700,
  }),
  warning: ({ colors }: Theme) => ({
    background: colors.serenade,
    main: colors.orange,
  }),
}

type Variants = keyof typeof variants

const StyledContainer = styled(Box, {
  shouldForwardProp: prop => !['variant'].includes(prop.toString()),
})<{ variant: Variants }>`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  position: relative;
  padding: 16px;
  background-color: ${({ variant, theme }) =>
    variants[variant]?.(theme).background};
`

const StyledBadgeContainer = styled(Box)`
  position: absolute;
  top: -12px;
  left: 16px;
  font-weight: 500;
  text-transform: uppercase;
`

const StyledTitle = styled(Typography, {
  shouldForwardProp: prop => !['color'].includes(prop.toString()),
})<{ color: Variants }>`
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme, color }) => variants[color]?.(theme).main};
`

const StyledButtonLink = styled(Button)`
  margin-top: auto;
  color: ${({ theme: { colors } }) => colors.blue};
  background-color: ${({ theme: { colors } }) => colors.transparent};
  padding: 0;
  width: transparent;
  display: flex;
  align-items: center;
  justify-content: left;
  text-decoration: none;
  font-size: 14px;
`

type Props = {
  /**
   * The text to be placed in the top badge
   */
  badgeText: string
  /**
   * The icon to use in the badge
   */
  icon: IconName
  /**
   * The link text to display at the end
   */
  linkText?: string
  /**
   * MouseEvent listener on the component
   */
  onClick?: MouseEventHandler
  text: string
  title: string
  /**
   * The link that linkText prop need to redirect to.
   */
  to?: string
  variant?: Variants
}

const ExtendedReminder: FunctionComponent<Props> = ({
  badgeText,
  icon,
  linkText,
  onClick,
  text,
  title,
  to,
  variant = 'info',
  ...props
}) => {
  const theme = useTheme()
  const badgeVariant = {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'beta',
  } as const

  return (
    <StyledContainer variant={variant} {...props}>
      <StyledBadgeContainer>
        <Badge size="small" variant={badgeVariant[variant]}>
          <Icon mr="4px" color={theme.colors.white} name={icon} size={16} />
          {badgeText}
        </Badge>
      </StyledBadgeContainer>
      <StyledTitle color={variant} mb={1} variant="bodyC">
        {title}
      </StyledTitle>
      <Typography mb={1} variant="bodyD">
        {text}
      </Typography>
      {linkText && (
        <StyledButtonLink
          variant="link"
          to={to}
          onClick={onClick}
          size="xsmall"
          icon="east"
        >
          {linkText}
        </StyledButtonLink>
      )}
    </StyledContainer>
  )
}

ExtendedReminder.propTypes = {
  badgeText: PropTypes.string.isRequired,
  icon: PropTypes.oneOf(icons).isRequired,
  linkText: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(variants) as Variants[]),
}

export default ExtendedReminder
