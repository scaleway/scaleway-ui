import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { colors } from '../../theme'

const Pentagon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);

  ${({ size, color }) => `
    width: ${size};
    height: ${size};
    background-color: ${color};
  `}
`

Pentagon.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
}

Pentagon.defaultProps = {
  size: '48px',
  color: colors.pippin,
}

export { Pentagon }
