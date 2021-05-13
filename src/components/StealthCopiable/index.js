import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import useClipboard from 'react-use-clipboard'
import recursivelyGetChildrenString from '../../helpers/recursivelyGetChildrenString'
import Unselectable from '../Unselectable'

const CopyButton = styled.button`
  background-color: ${({ theme }) => theme.colors.transparent};
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  display: inline-block;
  padding-left: 8px;
  opacity: 0;
  z-index: 100;

  &:focus {
    opacity: 1;
  }
`

const StyledContainer = styled.div`
  display: block;
  position: relative;
  white-space: nowrap;

  &:hover ${CopyButton} {
    opacity: 1;
    cursor: pointer;
  }
`

const StealthCopiable = ({ children, side, copyText, copiedText }) => {
  const string = recursivelyGetChildrenString(children)

  const [isCopied, setCopied] = useClipboard(string, {
    successDuration: 5000,
  })

  return (
    <StyledContainer>
      {side === 'right' && children}
      <Unselectable as="span">
        <CopyButton onClick={setCopied} tabIndex="0" type="button">
          {isCopied ? copiedText : copyText}
        </CopyButton>
      </Unselectable>
      {side === 'left' && children}
    </StyledContainer>
  )
}

StealthCopiable.defaultProps = {
  copiedText: 'Copied',
  copyText: 'Copy',
  side: 'right',
}

StealthCopiable.propTypes = {
  children: PropTypes.node.isRequired,
  copiedText: PropTypes.string,
  copyText: PropTypes.string,
  side: PropTypes.oneOf(['left', 'right']),
}

export default StealthCopiable
