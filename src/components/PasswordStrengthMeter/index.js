import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import Box from '../Box'
import Typography from '../Typography'

const StyledTitle = styled(Typography)`
  display: inline-block;
  vertical-align: top;
  line-height: 22px;
  font-weight: 500;
`
const StyledStrength = styled(Typography)`
  float: right;
  vertical-align: top;
  font-weight: 500;
`

const StyledWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 5px;
  height: 8px;
`

const StyledMeter = styled.div`
  border-radius: 5px;
  height: 100%;
  transition: all 0.5s;
`

const PasswordStrengthMeter = ({
  password,
  onChange,
  strength,
  title,
  estimate,
  userInputs,
  ...props
}) => {
  const [score, setScore] = useState(0)
  const [backgroundColor, setBackgroundColor] = useState(strength[0].color)
  const [width, setWidth] = useState(0)

  const getScore = useCallback(
    passwordToTest => estimate(passwordToTest || '', userInputs).score || 0,
    [estimate, userInputs],
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
      <StyledTitle variant="bodyB" color="gray700">
        {title}
      </StyledTitle>

      <StyledStrength as="span" variant="bodyB" color={strength[score].color}>
        {strength[score].t}
      </StyledStrength>

      <StyledWrapper mt={1} mb={2}>
        <StyledMeter
          style={{
            backgroundColor,
            width,
          }}
        />
      </StyledWrapper>
    </Box>
  )
}

PasswordStrengthMeter.propTypes = {
  /**
   * A function that should return a score based on password. The higher score is the stronger password is.
   */
  estimate: PropTypes.func,
  onChange: PropTypes.func,
  password: PropTypes.string,
  /**
   * Strength is used for defining different color and text associated with it.
   */
  strength: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      t: PropTypes.string,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
  /**
   * An array of string that defines what word shouldn't be used in the password.
   */
  userInputs: PropTypes.arrayOf(PropTypes.string),
}

PasswordStrengthMeter.defaultProps = {
  estimate: () => ({ score: 0 }),
  onChange: () => null,
  password: '',
  userInputs: [],
}

export default PasswordStrengthMeter
