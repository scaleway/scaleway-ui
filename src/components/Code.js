import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { theme } from 'theme'
import { Box } from './Box'

const styles = {
  input: error => css`
    border: solid 1px ${error ? theme.red : theme.gray300};
    font-size: 24px;
    color: ${error ? theme.red : theme.gray700};
    text-align: center;
    border-radius: 4px;
    margin-right: 8px;
    width: 56px;
    height: 64px;

    &:last-child {
      margin-right: 0;
    }

    &::placeholder {
      color: ${theme.gray300};
    }
  `,
}

const KEY_CODE = {
  backspace: 8,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
}

export const Code = ({
  inputId,
  fields,
  initialValue,
  onChange,
  onComplete,
  type,
  error,
  autoFocus,
  disabled,
  required,
  placeholder,
  inputStyle,
  ...props
}) => {
  const valuesArray = []
  for (let i = 0; i < fields; i += 1) {
    valuesArray.push(initialValue?.[i] ?? '')
  }
  const [values, setValues] = useState(valuesArray)
  const [handleKeys, setHandleKeys] = useState({})

  const inputRefs = []
  for (let i = 0; i < fields; i += 1) {
    inputRefs.push(React.createRef())
  }

  const triggerChange = inputValues => {
    const stringValue = inputValues.join('')
    if (onChange) {
      onChange(stringValue)
    }
    if (onComplete && stringValue.length >= fields) {
      onComplete(stringValue)
    }
  }

  const inputOnChange = e => {
    const index = parseInt(e.target.dataset.id, 10)
    if (type === 'number') {
      e.target.value = e.target.value.replace(/[^\d]/gi, '')
    }
    setHandleKeys({ ...handleKeys, [index]: false })
    if (
      e.target.value === '' ||
      (type === 'number' && !e.target.validity.valid)
    ) {
      return
    }

    const { value } = e.target
    const newValues = [...values]
    const sanitizedValue = value[0] // in case more than 1 char, we just take the first one
    newValues[index] = sanitizedValue
    setValues(newValues)
    const nextIndex = Math.min(index + 1, fields - 1)
    const next = inputRefs[nextIndex]

    if (next) {
      next.current.focus()
    }

    triggerChange(newValues)
  }

  const inputOnKeyDown = e => {
    const index = parseInt(e.target.dataset.id, 10)
    const prevIndex = index - 1
    const nextIndex = index + 1
    const prev = inputRefs[prevIndex]
    const next = inputRefs[nextIndex]
    const vals = [...values]
    switch (e.keyCode) {
      case KEY_CODE.backspace:
        e.preventDefault()
        if (values[index]) {
          vals[index] = ''
          setValues(vals)
          triggerChange(vals)
        } else if (prev) {
          vals[prevIndex] = ''
          prev.current.focus()
          setValues(vals)
          triggerChange(vals)
        }
        break
      case KEY_CODE.left:
        e.preventDefault()
        if (prev) {
          prev.current.focus()
        }
        break
      case KEY_CODE.right:
        e.preventDefault()
        if (next) {
          next.current.focus()
        }
        break
      case KEY_CODE.up:
      case KEY_CODE.down:
        e.preventDefault()
        break
      default:
        setHandleKeys({ ...handleKeys, [index]: true })
        break
    }
  }

  const inputOnKeyUp = e => {
    const index = parseInt(e.target.dataset.id, 10)
    if (handleKeys[index]) {
      setHandleKeys({ ...handleKeys, [index]: false })
      const next = inputRefs[index + 1]
      if (next) {
        next.current.focus()
      }
    }
  }

  const inputOnFocus = e => {
    e.target.select(e)
  }

  return (
    <Box {...props}>
      {values.map((value, index) => (
        <input
          css={[styles.input(error), inputStyle]}
          type={type === 'number' ? 'tel' : type}
          pattern={type === 'number' ? '[0-9]*' : null}
          key={`${inputId}-${index}`}
          data-id={index}
          value={value}
          id={inputId ? `${inputId}-${index}` : null}
          ref={inputRefs[index]}
          onChange={inputOnChange}
          onKeyDown={inputOnKeyDown}
          onKeyUp={inputOnKeyUp}
          onFocus={inputOnFocus}
          disabled={disabled}
          required={required}
          placeholder={placeholder?.[index] ?? ''}
        />
      ))}
    </Box>
  )
}

Code.propTypes = {
  fields: PropTypes.number,
  type: PropTypes.oneOf(['text', 'number']),
  onChange: PropTypes.func,
  onComplete: PropTypes.func,
  inputId: PropTypes.string,
  initialValue: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
}

Code.defaultProps = {
  type: 'number',
  fields: 4,
  disabled: false,
  required: false,
  error: false,
}
