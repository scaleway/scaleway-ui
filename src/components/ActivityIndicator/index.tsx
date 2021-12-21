import { css, keyframes, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Color } from '../../theme'

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100
const HALF_VIEWBOX_WIDTH = VIEWBOX_WIDTH / 2
const HALF_VIEWBOX_HEIGHT = VIEWBOX_HEIGHT / 2

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

type ActivityIndicatorProps = {
  active?: boolean
  color?: Color | string
  percentage?: number
  size?: number | string
  strokeWidth?: number
  /**
   * Text is placed in center of ProgressCircle.
   */
  text?: string
  trailColor?: Color | string
  /**
   * Label should be defined for accessibility, to indicate what is loading
   */
  label?: string
}

const SVG = styled.svg<{ active: boolean }>`
  ${({ active }) =>
    active &&
    css`
      animation: ${spin} 0.75s linear infinite;
    `}
`

const Text = styled('text', {
  shouldForwardProp: prop => !['color'].includes(prop.toString()),
})<{ color: Color | string }>`
  fill: ${({ theme, color }) =>
    theme.colors[color as Color]?.backgroundStrong || color};

  font-size: 26px;
  dominant-baseline: middle;
  text-anchor: middle;
`

const ActivityIndicator = ({
  percentage = 20,
  text,
  size = 40,
  strokeWidth = 16,
  color = 'primary',
  trailColor = 'neutral',
  active = false,
  label = 'Loading',
}: ActivityIndicatorProps) => {
  const theme = useTheme()

  const circleRadius = HALF_VIEWBOX_HEIGHT - strokeWidth / 2
  const boundedPercentage = Math.min(Math.max(percentage, 0), 100) / 100
  const circleDiameter = Math.PI * 2 * circleRadius

  return (
    <SVG
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      aria-valuetext={`${percentage}%`}
      active={active}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      style={{
        height: typeof size === 'string' ? size : `${size}px`,
        width: typeof size === 'string' ? size : `${size}px`,
      }}
    >
      <circle
        cx={HALF_VIEWBOX_WIDTH}
        cy={HALF_VIEWBOX_HEIGHT}
        r={circleRadius}
        fill="none"
        strokeWidth={strokeWidth}
        stroke={theme.colors[trailColor as Color]?.background || trailColor}
      />
      <circle
        cx={HALF_VIEWBOX_WIDTH}
        cy={HALF_VIEWBOX_HEIGHT}
        r={circleRadius}
        fill="none"
        strokeWidth={strokeWidth}
        strokeDasharray={circleDiameter}
        strokeDashoffset={(1 - boundedPercentage) * circleDiameter}
        stroke={theme.colors[color as Color]?.backgroundStrong || color}
        strokeLinecap="round"
      />
      {text ? (
        <Text color={color} x={HALF_VIEWBOX_WIDTH} y={HALF_VIEWBOX_HEIGHT}>
          {text}
        </Text>
      ) : null}
    </SVG>
  )
}

ActivityIndicator.propTypes = {
  active: PropTypes.bool,
  color: PropTypes.string,
  /**
   * Label should be defined for accessibility, to indicate what is loading
   */
  label: PropTypes.string,
  percentage: PropTypes.number,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  strokeWidth: PropTypes.number,
  /**
   * Text is placed in center of ProgressCircle.
   */
  text: PropTypes.string,
  trailColor: PropTypes.string,
}

export default ActivityIndicator
