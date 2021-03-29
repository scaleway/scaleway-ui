import PropTypes from 'prop-types'
import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { colors } from '../../theme'
import { Box } from '../Box'

const ProgressCircle = ({
  percentage,
  text,
  size,
  strokeWidth,
  pathColor,
  trailColor,
  ...props
}) => (
  <Box height={size} width={size} {...props}>
    <CircularProgressbar
      value={percentage}
      text={text}
      strokeWidth={strokeWidth}
      styles={{
        root: {},
        path: {
          stroke: colors[pathColor] || pathColor,
        },
        trail: {
          stroke: colors[trailColor] || trailColor,
        },
        text: {
          fill: colors.primary,
          fontSize: '26px',
          dominantBaseline: 'middle',
          textAnchor: 'middle',
        },
      }}
    />
  </Box>
)

ProgressCircle.propTypes = {
  percentage: PropTypes.number,
  size: PropTypes.number,
  text: PropTypes.string,
  strokeWidth: PropTypes.number,
  pathColor: PropTypes.string,
  trailColor: PropTypes.string,
}

ProgressCircle.defaultProps = {
  percentage: 0,
  size: 40,
  text: undefined,
  strokeWidth: 16,
  pathColor: 'primary',
  trailColor: 'gray350',
}

export default ProgressCircle
