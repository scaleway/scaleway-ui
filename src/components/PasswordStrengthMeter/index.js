import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { colors } from '../../new_theme'
import { Box } from '../Box'
import { Typography } from '../Typography'

const styles = {
  wrapper: css`
    background-color: ${colors.gray100};
    border-radius: 5px;
    height: 8px;
  `,
  strengthBar: css`
    border-radius: 5px;
    height: '100%';
  `,
  title: css`
    display: inline-block;
    vertical-align: top;
    line-height: 22px;
    font-weight: 500;
  `,
  strength: css`
    float: right;
    vertical-align: top;
    font-weight: 500;
  `,
  meter: css`
    border-radius: 5px;
    height: 100%;
    transition: all 0.5s;
  `,
}

export function PasswordStrengthMeter({
  password,
  onChange,
  strength,
  title,
  estimate,
  userInputs,
  ...props
}) {
  const [score, setScore] = useState(0)
  const [backgroundColor, setBackgroundColor] = useState(strength[0].color)
  const [width, setWidth] = useState(0)

  const getScore = useCallback(
    password => estimate(password || '', userInputs).score || 0,
    [estimate],
  )

  const handleChange = useCallback(e => onChange(e), [onChange])

  useEffect(() => {
    setBackgroundColor(strength[score].color)
    handleChange(score)
    setScore(getScore(password))

    const toValue = ((score + 1) / strength.length) * 100
    setWidth(`${toValue}%`)
  }, [getScore, handleChange, password, score, strength])

  return (
    <Box {...props} title={title} role="alert" aria-live="polite">
      <Typography variant="bodyB" color="lightBlack" css={styles.title}>
        {title}
      </Typography>

      <Typography
        as="span"
        variant="bodyB"
        css={[styles.strength, css({ color: strength[score].color })]}
      >
        {strength[score].t}
      </Typography>

      <Box css={styles.wrapper} mt={1} mb={2}>
        <div
          css={styles.meter}
          style={{
            backgroundColor,
            width,
          }}
        />
      </Box>
    </Box>
  )
}

PasswordStrengthMeter.propTypes = {
  onChange: PropTypes.func,
  password: PropTypes.string,
  estimate: PropTypes.func,
  userInputs: PropTypes.arrayOf(PropTypes.string),
  strength: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      t: PropTypes.string,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
}

PasswordStrengthMeter.defaultProps = {
  onChange: () => null,
  estimate: () => ({ score: 0 }),
  password: '',
  userInputs: [],
}
