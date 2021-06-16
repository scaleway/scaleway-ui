import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import Box from '../Box'

const StyledWrapper = styled(Box)`
  position: relative;
  margin-left: -100px;
  margin-right: -100px;
`

const StyledBeforeScroll = styled.span`
  position: absolute;
  width: 100px;
  height: 100%;
  content: '';
  background: linear-gradient(
    -90deg,
    rgba(255, 255, 255, 0),
    ${({ theme }) => theme.colors.white}
  );
  cursor: w-resize;
  z-index: auto;
`

const StyledScrollableWrapper = styled.div`
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

const StyledAfterScroll = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 100%;
  content: '';
  cursor: e-resize;
  z-index: auto;
  background: linear-gradient(
    -90deg,
    ${({ theme }) => theme.colors.white},
    rgba(255, 255, 255, 0)
  );
`

const StyledBorderWrapper = styled(Box)`
  display: inline-block;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray350};
  height: 261px;
  width: 248px;
  max-width: 240px;
  overflow-wrap: break-word;
  white-space: normal;
  cursor: grab;

  &:hover,
  &:active,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    transition: box-shadow 0.2s ease;
    box-shadow: 2px 2px 14px 8px ${({ theme }) => theme.colors.gray200};
  }

  img {
    border-radius: 3px 3px 0% 0%;
  }
`

const Slider = ({ children, ...props }) => {
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
    <StyledWrapper {...props}>
      <StyledBeforeScroll
        onMouseOver={handleScrollRight}
        onMouseLeave={() => clearInterval(intervalRight)}
      />
      <StyledScrollableWrapper
        ref={scrollRef}
        onDragOver={e => {
          setDeltaX(dragStartX - e.pageX)
          setDragStartX(e.pageX)
        }}
        onDragStart={e => {
          const blankImg = new Image()
          blankImg.src =
            'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

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
      </StyledScrollableWrapper>

      <StyledAfterScroll
        onMouseOver={handleScrollLeft}
        onMouseLeave={() => clearInterval(intervalLeft)}
      />
    </StyledWrapper>
  )
}

Slider.Item = ({ as, ...props }) => (
  <StyledBorderWrapper as={as} {...props} draggable="true" />
)

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
