import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { darken } from 'polished'
import PropTypes from 'prop-types'
import React, { ComponentProps, FunctionComponent, ReactNode } from 'react'
import { Color } from '../../theme/colors'
import Icon from '../Icon'
import UniversalLink from '../UniversalLink'

const generateVariant =
  (color: Color | string) =>
  ({ theme }: { theme: Theme }) =>
    css`
      color: ${theme.colors[color as Color] ?? color};
      &:hover,
      &:focus {
        color: ${darken(0.2, theme.colors[color as Color] ?? color)};
      }
    `

const variants = {
  blue: generateVariant('blue'),
  gray: generateVariant('gray550'),
  grey: generateVariant('gray550'), // TODO: deprecated, to be removed soon
  inherit: () => css`
    color: inherit;
    &:hover,
    &:focus {
      color: inherit;
      text-decoration: none;
    }
  `,
  primary: ({ theme }: { theme: Theme }) => css`
    color: ${theme.colors.primary};
    &:hover,
    &:focus {
      color: ${theme.colors.primary};
    }
  `,
  white: generateVariant('white'),
}

type Variants = keyof typeof variants
export const linkVariants = Object.keys(variants) as Variants[]

const variantStyles = ({ variant }: { variant?: Variants }) =>
  variant && Object.keys(variants).includes(variant)
    ? variants[variant]
    : undefined

type LinkProps = {
  children: ReactNode
  variant?: Variants
  target?: string
} & ComponentProps<typeof UniversalLink>

const StyledLink = styled(UniversalLink, {
  shouldForwardProp: prop => !['variant'].includes(prop.toString()),
})<LinkProps>`
  cursor: pointer;
  text-decoration: none;
  transition: color 200ms ease;
  &:hover,
  &:focus {
    text-decoration: underline;
  }
  ${variantStyles}
`

const StyledIcon = styled(Icon)`
  padding-left: 2px;
  opacity: 0.5;
`

const Link: FunctionComponent<LinkProps> = ({
  variant,
  children,
  target,
  ...props
}) => (
  <StyledLink variant={variant} target={target} {...props}>
    {children}
    {target === '_blank' && (
      <StyledIcon name="open-in-new" verticalAlign="top" />
    )}
  </StyledLink>
)

Link.propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.string,
  variant: PropTypes.oneOf<Variants>(linkVariants),
}

export default Link
