import { css } from '@emotion/react'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { memo, useMemo } from 'react'
import flattenChildren from 'react-flatten-children'
import { colors } from '../../theme'
import { Box } from '../Box'

const styles = {
  container: css({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: 48,
  }),
  base: css({
    display: 'flex',
    flex: 1,
    fontWeight: 500,
    borderRadius: 24,
    borderStyle: 'solid',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    touchAction: 'manipulation',
    outline: 'none',
  }),
  left: css({
    paddingRight: 24,
    paddingLeft: 24,
    marginRight: -24,
  }),
  middle: css({
    paddingRight: 24,
    paddingLeft: 48,
    marginLeft: -24,
    marginRight: -24,
  }),
  right: css({
    paddingRight: 24,
    paddingLeft: 48,
    marginLeft: -24,
  }),
  past: css({
    backgroundColor: colors.success,
    color: colors.white,
    borderColor: colors.white,
  }),
  clickable: css({
    cursor: 'pointer',

    ':focus': {
      boxShadow: `0 0 0 2px ${transparentize(0.75, colors.success)}`,
    },
  }),
  current: css({
    backgroundColor: colors.primary,
    color: colors.white,
    borderColor: colors.white,

    ':focus': {
      boxShadow: `0 0 0 2px ${transparentize(0.75, colors.primary)}`,
    },
  }),
  future: css({
    backgroundColor: colors.white,
    color: colors.gray550,
    borderColor: colors.gray350,

    ':focus': {
      boxShadow: `0 0 0 2px ${transparentize(0.75, colors.gray550)}`,
    },
  }),
}

const Step = () => null

function Progress({ children, selected, ...props }) {
  const flatChildren = flattenChildren(children)
  const { length } = flatChildren

  return (
    <Box css={styles.container} {...props}>
      {flatChildren.map((child, index) => {
        if (!child) {
          return null
        }

        const { onClick, title } = child.props
        const isPast = selected > index
        const isClickable = isPast && Boolean(onClick)

        const isLeftOrRightStyles = useMemo(() => {
          if (index === 0) return styles.left
          if (index === length - 1) return styles.right

          return styles.middle
        }, [index])

        const isPastOrCurrentStyles = useMemo(() => {
          if (selected > index) return styles.past
          if (selected === index) return styles.current

          return styles.future
        }, [index, selected])

        return (
          <Box
            key={`step-${index}`}
            onClick={isClickable ? () => onClick(index) : undefined}
            as={isClickable ? 'button' : 'div'}
            css={[
              styles.base,
              css({ zIndex: length - index }),
              isLeftOrRightStyles,
              isClickable && styles.clickable,
              isPastOrCurrentStyles,
            ]}
          >
            {title}
          </Box>
        )
      })}
    </Box>
  )
}

Progress.propTypes = {
  selected: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
}

const MemoProgress = memo(Progress)

MemoProgress.Step = Step

export { MemoProgress as Progress }
