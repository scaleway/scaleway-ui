import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'
import Icon from '../Icon'
import MarkDown from '../MarkDown'
import UniversalLink from '../UniversalLink'

const variants = {
  error: {
    background: 'pippin',
    main: 'red',
  },
  info: {
    background: 'zumthor',
    main: 'blue',
  },
  warning: {
    background: 'serenade',
    main: 'orange',
  },
}

const Notification = styled(Box, {
  shouldForwardProp: prop => !['variant', 'bordered'].includes(prop),
})`
  height: 28px;
  width: max-content;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 14px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray700};
  font-weight: 400;

  &:hover {
    text-decoration: none;
  }

  ${({ variant, bordered, theme }) => `
    background-color: ${
      bordered
        ? theme.colors.transparent
        : theme.colors[variants[variant].background]
    };
    border: 1px solid ${
      bordered ? theme.colors.gray300 : theme.colors.transparent
    };
    transition: all .3s ease-in-out;

    &:hover {
      box-shadow: 0 3px 6px ${theme.colors[variants[variant].background]};
      border: 1px solid ${theme.colors[variants[variant].main]};
    }
  `}

  & strong {
    ${({ variant, theme }) => `
      color: ${theme.colors[variants[variant].main]};
    `}
  }
`

const Reminder = ({ text, variant, bordered, to, ...props }) => (
  <Notification
    as={to ? UniversalLink : 'a'}
    type={to ? null : 'button'}
    icon="east"
    style={{}}
    fontSize={12}
    px={1}
    py={1}
    bordered={bordered}
    variant={variant}
    to={to}
    {...props}
  >
    <MarkDown inline source={text.replace(/\[(.*)\]/, '__$1__')} />
    <Icon ml="4px" color={variants[variant].main} name="east" size={20} />
  </Notification>
)

Reminder.propTypes = {
  bordered: PropTypes.bool,
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
  variant: PropTypes.oneOf(['error', 'warning', 'info']),
}

Reminder.defaultProps = {
  bordered: false,
  to: undefined,
  variant: 'info',
}

export default Reminder
