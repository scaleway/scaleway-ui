import styled from '@emotion/styled'
import type { JSX, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

const StyledWrapper = styled.div`
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
    ${({ theme }) => theme.colors.neutral.background}
  );
  cursor: w-resize;
  z-index: auto;
`

const StyledScrollableWrapper = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  padding: ${({ theme }) => theme.space['2']} 100px;

  > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.space['2']};
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
    ${({ theme }) => theme.colors.neutral.backgroundWeak},
    rgba(255, 255, 255, 0)
  );
`

const StyledBorderWrapper = styled.div`
  display: inline-block;
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  height: 261px;
  width: 248px;
  max-width: 240px;
  overflow-wrap: break-word;
  white-space: normal;
  cursor: grab;

  &:hover,
  &:active,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary.border};
    transition: box-shadow 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
  }

  img {
    border-radius: ${({ theme }) => theme.radii.default}
      ${({ theme }) => theme.radii.default} 0 0;
  }
`

type CarouselItemProps = {
  children: ReactNode
}
export const CarouselItem = ({ children }: CarouselItemProps): JSX.Element => (
  <StyledBorderWrapper draggable="true">{children}</StyledBorderWrapper>
)

type CarouselProps = {
  className?: string
  children?: ReactNode
  'data-testid'?: string
}

export const Carousel = ({
  children,
  className,
  'data-testid': dataTestId = 'scrollbar',
}: CarouselProps): JSX.Element => {
  const scrollRef = useRef<HTMLDivElement>(null)
  let intervalLeft: ReturnType<typeof setInterval>
  let intervalRight: ReturnType<typeof setInterval>

  const handleScrollRight = () => {
    intervalRight = setInterval(() => {
      if (scrollRef.current?.scrollTo && scrollRef.current?.scrollLeft) {
        scrollRef.current.scrollTo?.(scrollRef.current.scrollLeft - 25, 0)
      }
    }, 30)
  }
  const handleScrollLeft = () => {
    intervalLeft = setInterval(() => {
      if (scrollRef.current?.scrollTo && scrollRef.current?.scrollLeft) {
        scrollRef.current.scrollTo(scrollRef.current.scrollLeft + 25, 0)
      }
    }, 30)
  }

  const handleScrollX = (scrollX = 25) => {
    if (scrollRef.current?.scrollTo && scrollRef.current?.scrollLeft) {
      scrollRef.current.scrollTo?.(scrollRef.current.scrollLeft + scrollX, 0)
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
    <StyledWrapper className={className} data-testid={dataTestId}>
      <StyledBeforeScroll
        data-testid={`${dataTestId}-before`}
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
        className={className}
        data-testid={`${dataTestId}-wrapper`}
      >
        {children}
      </StyledScrollableWrapper>

      <StyledAfterScroll
        data-testid={`${dataTestId}-after`}
        onMouseOver={handleScrollLeft}
        onMouseLeave={() => clearInterval(intervalLeft)}
      />
    </StyledWrapper>
  )
}

Carousel.Item = CarouselItem
