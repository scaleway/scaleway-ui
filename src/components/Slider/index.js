import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../../theme'
import { Box } from '../Box'

const blankImg = new Image()
blankImg.src =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

const wrapper = css`
  position: relative;
  margin-left: -100px;
  margin-right: -100px;
`
const beforeScroll = css`
  position: absolute;
  width: 100px;
  height: 100%;
  content: '';
  background: linear-gradient(-90deg, rgba(255, 255, 255, 0), ${colors.white});
  cursor: w-resize;
  z-index: auto;
`
const afterScroll = css`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 100%;
  content: '';
  cursor: e-resize;
  z-index: auto;
  background: linear-gradient(-90deg, ${colors.white}, rgba(255, 255, 255, 0));
`

const scrollableWrapper = css`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 16px;

  > *:not(:last-child) {
    margin-right: 16px;
  }
`

const borderWrapper = css`
  display: inline-block;
  border-radius: 4px;
  border: 1px solid ${colors.gray350};
  height: 261px;
  width: 248px;
  max-width: 240px;
  overflow-wrap: break-word;
  white-space: normal;
  cursor: grab;

  &:hover,
  &:active,
  &:focus {
    border: 1px solid ${colors.primary};
    transition: box-shadow 0.2s ease;
    box-shadow: 2px 2px 14px 8px ${colors.gray200};
  }

  img {
    border-radius: 3px 3px 0% 0%;
  }
`

export function Slider({ children, ...props }) {
  const scrollRef = useRef(null)
  let intervalLeft
  let intervalRight

  const handleScrollRight = () => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollTo) {
        intervalRight = setInterval(() => {
          scrollRef.current.scrollTo(scrollRef.current.scrollLeft - 25, 0)
        }, 30)
      }
    }
  }
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollTo) {
        intervalLeft = setInterval(() => {
          scrollRef.current.scrollTo(scrollRef.current.scrollLeft + 25, 0)
        }, 30)
      }
    }
  }

  const handleScrollX = (scrollX = 25) => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollTo) {
        scrollRef.current.scrollTo(scrollRef.current.scrollLeft + scrollX, 0)
      }
    }
  }

  const cleanUp = () => {
    clearInterval(intervalLeft)
    clearInterval(intervalRight)
  }

  useEffect(() => cleanUp)
  const [dragStartX, setDragStartX] = useState(0)
  const [deltaX, setDeltaX] = useState(0)

  return (
    <Box css={wrapper} {...props}>
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
      <span
        css={beforeScroll}
        onMouseOver={handleScrollRight}
        onMouseLeave={() => clearInterval(intervalRight)}
      />
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={scrollRef}
        css={scrollableWrapper}
        onDragOver={e => {
          setDeltaX(dragStartX - e.pageX)
          setDragStartX(e.pageX)
        }}
        onDragStart={e => {
          e.dataTransfer.setDragImage(blankImg, 0, 0)
          setDragStartX(e.clientX)
        }}
        onDrag={() => handleScrollX(deltaX)}
        onDragEnd={() => {
          setDeltaX(0)
          setDragStartX(0)
        }}
        onMouseUp={e => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        {children}
      </div>

      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
      <span
        css={afterScroll}
        onMouseOver={handleScrollLeft}
        onMouseLeave={() => clearInterval(intervalLeft)}
      />
    </Box>
  )
}

Slider.Item = function Item({ as, ...props }) {
  return <Box as={as} css={borderWrapper} {...props} draggable="true" />
}

Slider.Item.propTypes = {
  as: PropTypes.string,
}
Slider.Item.defaultProps = {
  as: undefined,
}

Slider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Slider
