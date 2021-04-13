import { useTheme } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'

const ABSOLUTE_LINK_REGEXP = /^https?:\/\//
const TEL_LINK_REGEXP = /^tel:/

const needNativeLink = url => {
  if (!url) return false
  const isAbsolute = ABSOLUTE_LINK_REGEXP.test(url)
  const isTelLink = TEL_LINK_REGEXP.test(url)
  const isAnchor = url[0] === '#'

  return isAbsolute || isTelLink || isAnchor
}

const UniversalLink = ({
  children,
  target,
  rel: propsRel,
  to,
  as: propsAs,
  href: propsHref,
  ...props
}) => {
  const { linkComponent = 'a' } = useTheme()
  const isBlank = target === '_blank'
  const rel = propsRel || (isBlank ? 'noopener noreferrer' : undefined)
  const href = to || propsHref
  const asValue = propsAs || (needNativeLink(href) ? 'a' : linkComponent)

  return (
    <Box {...props} target={target} as={asValue} href={href} rel={rel}>
      {children}
    </Box>
  )
}

UniversalLink.propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.string,
  rel: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  as: PropTypes.string,
}

UniversalLink.defaultProps = {
  target: undefined,
  rel: undefined,
  to: null,
  href: null,
  as: null,
}

export default UniversalLink
