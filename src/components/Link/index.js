import { css } from '@emotion/react'
import { darken } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import { colors } from '../../new_theme'
import { Icon } from '../Icon'
import { UniversalLink } from '../UniversalLink'

const variant = color => css`
  color: ${color};
  &:hover,
  &:focus {
    color: ${darken(0.2, color)};
  }
`

const variants = {
  blue: variant(colors.blue),
  grey: variant(colors.gray550), // TODO: deprecated, to be removed soon
  gray: variant(colors.gray550),
  white: variant(colors.white),
  primary: css`
    color: ${colors.primary};
    &:hover,
    &:focus {
      color: ${colors.primary};
    }
  `,
  inherit: css`
    color: inherit;
    &:hover,
    &:focus {
      color: inherit;
      text-decoration: none;
    }
  `,
}

export const linkVariants = Object.keys(variants)

const styles = {
  link: css`
    cursor: pointer;
    text-decoration: none;
    transition: color 200ms ease;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  `,
  openInNew: css`
    padding-left: 2px;
    opacity: 0.5;
  `,
}

export function Link({ variant, children, ...props }) {
  const isBlank = props.target === '_blank'
  return (
    <UniversalLink css={[styles.link, variants[variant]]} {...props}>
      {children}
      {isBlank && (
        <Icon name="open-in-new" css={styles.openInNew} verticalAlign="top" />
      )}
    </UniversalLink>
  )
}

Link.propTypes = {
  variant: PropTypes.oneOf(linkVariants),
}
