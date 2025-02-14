import type { RefObject } from 'react'

export type PopupPlacement = 'top' | 'right' | 'bottom' | 'left' | 'auto'
export type PopupAlign = 'start' | 'center'
export const DEFAULT_ARROW_WIDTH = 8 // in px
const SPACE = 4 // in px
const TOTAL_USED_SPACE = 0 // in px
export const DEFAULT_POSITIONS = {
  arrowLeft: 0,
  arrowTop: 0,
  arrowTransform: 'translate(-50%, -50)',
  placement: 'top',
  rotate: 135,
  popupInitialPosition: 'translate3d(0px, 0px, 0)',
  popupPosition: 'translate3d(0px, 0px, 0)',
}

type ComputePlacementTypes = {
  childrenStructuredRef: DOMRect
  popupStructuredRef: DOMRect
  popupPortalTarget: HTMLElement
  offsetParentRect: DOMRect
  offsetParent: Element
}

/**
 * This function will find the best placement in a window for popup based on children position and popup size
 */
const computePlacement = ({
  childrenStructuredRef,
  popupStructuredRef,
  offsetParentRect,
  offsetParent,
  popupPortalTarget,
}: ComputePlacementTypes) => {
  const {
    top: childrenTop,
    left: childrenLeft,
    right: childrenRight,
    width: childrenWidth,
  } = childrenStructuredRef

  const { top: parentTop, left: parentLeft } = offsetParentRect

  const isPopupPortalTargetBody =
    popupPortalTarget === document.body || offsetParent === document.body

  const overloadedChildrenLeft = isPopupPortalTargetBody
    ? childrenLeft
    : childrenLeft - parentLeft
  const overloadedChildrenTop = isPopupPortalTargetBody
    ? childrenTop
    : childrenTop - parentTop
  const overloadedChildrenRight = isPopupPortalTargetBody
    ? childrenRight
    : childrenLeft - parentLeft + childrenWidth

  const { width: popupWidth, height: popupHeight } = popupStructuredRef

  if (overloadedChildrenTop - popupHeight - TOTAL_USED_SPACE < 0) {
    return 'bottom'
  }

  if (overloadedChildrenLeft - popupWidth - TOTAL_USED_SPACE < 0) {
    return 'right'
  }

  if (
    overloadedChildrenRight + popupWidth + TOTAL_USED_SPACE >
    window.innerWidth
  ) {
    return 'left'
  }

  return 'top'
}

/**
 * This function will check if the offset parent is usable for popup positioning
 * If not it will loop and search for a compatible parent until document.body is reached
 */
const findOffsetParent = (element: RefObject<HTMLDivElement>) => {
  const offsetParent = element?.current?.offsetParent

  // We need to check if offsetParent is a table cell or a table because they are not suitable for positioning
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
  if (offsetParent && !['TH', 'TD', 'TABLE'].includes(offsetParent.tagName)) {
    return offsetParent
  }

  let currentElement = element?.current

  while (currentElement && currentElement.tagName !== 'BODY') {
    const { position } = window.getComputedStyle(currentElement)

    // Check if the current element is a potential offset parent
    if (position !== 'static') {
      return currentElement
    }

    currentElement = currentElement.parentElement as HTMLDivElement
  }

  // If no suitable offset parent is found, return the body element
  return document.body
}

/**
 * This function will check if there is an overflow of the popup compared to the parent it is set in.
 * Depending on the position, for top and bottom the overflow will be on X axis and for left and right
 * the overflow will be Y axis. The function return the number of pixels the popup is overflowing
 * and that needs to be reajusted.
 * @param position the position of the popup
 * @param offsetParentRect the rect of the parent element where the children is located in
 * @param childrenRect the rect of the children element, the children element is the one that will trigger the popup
 * @param popupStructuredRef the rect of the popup, the popup itself
 */
const getPopupOverflowFromParent = (
  position: 'top' | 'right' | 'bottom' | 'left',
  offsetParentRect: { top: number; left: number; right: number },
  childrenRect: DOMRect,
  popupStructuredRef: DOMRect,
  arrowWidth: number,
) => {
  const {
    top: parentTop,
    left: parentLeft,
    right: parentRight,
  } = offsetParentRect

  const {
    top: childrenTop,
    bottom: childrenBottom,
    left: childrenLeft,
    right: childrenRight,
    width: childrenWidth,
  } = childrenRect

  const { width: popupWidth, height: popupHeight } = popupStructuredRef
  const popupHalfWidthWithArrow = popupWidth / 2 - arrowWidth - 1 // -1 px to compensate border radius
  const popupHalfHeightWithArrow = popupHeight / 2 - arrowWidth - 1 // -1 px to compensate border radius

  if (position === 'top' || position === 'bottom') {
    const popupOverflowRight =
      childrenRight - childrenWidth / 2 + popupWidth / 2

    const popupOverflowLeft =
      childrenLeft + childrenWidth / 2 - parentLeft - popupWidth / 2

    if (popupOverflowRight > parentRight) {
      if (
        Math.abs(popupOverflowRight - parentRight) > popupHalfWidthWithArrow
      ) {
        return -popupHalfWidthWithArrow
      }

      return parentRight - popupOverflowRight
    }

    if (popupOverflowLeft < 0) {
      if (Math.abs(popupOverflowLeft) > popupHalfWidthWithArrow) {
        return popupHalfWidthWithArrow
      }

      return Math.abs(popupOverflowLeft)
    }
  }

  if (position === 'left' || position === 'right') {
    const popupOverflowTop = childrenTop - parentTop - popupHeight / 2

    if (popupOverflowTop < 0) {
      if (
        Math.abs(childrenTop - parentTop - popupHalfHeightWithArrow) >
        popupHalfHeightWithArrow
      ) {
        return popupHalfHeightWithArrow
      }

      return Math.abs(popupOverflowTop)
    }

    if (childrenBottom + popupHeight > window.innerHeight) {
      return -popupHalfHeightWithArrow
    }
  }

  return 0
}

type ComputePositionsTypes = {
  placement: PopupPlacement
  childrenRef: RefObject<HTMLDivElement | null>
  popupRef: RefObject<HTMLDivElement | null>
  popupPortalTarget: HTMLElement
  hasArrow: boolean
  align: PopupAlign
}

/**
 * This function will compute the positions of popup and arrow based on children position and popup size
 */
export const computePositions = ({
  placement,
  childrenRef,
  popupRef,
  popupPortalTarget,
  hasArrow,
  align,
}: ComputePositionsTypes) => {
  const arrowWidth = hasArrow ? DEFAULT_ARROW_WIDTH : 0
  const childrenRect = (
    childrenRef.current as HTMLDivElement
  ).getBoundingClientRect()
  const offsetParent = findOffsetParent(
    childrenRef as RefObject<HTMLDivElement>,
  )
  const offsetParentRect = offsetParent?.getBoundingClientRect() ?? {
    top: 0,
    left: 0,
    right: window?.innerWidth ?? 0,
  }

  const popupStructuredRef = (
    popupRef.current as HTMLDivElement
  ).getBoundingClientRect()

  const placementBasedOnWindowSize =
    placement === 'auto'
      ? computePlacement({
          childrenStructuredRef: childrenRect,
          popupStructuredRef,
          offsetParentRect,
          popupPortalTarget,
          offsetParent,
        })
      : placement

  const {
    top: childrenTop,
    left: childrenLeft,
    right: childrenRight,
    width: childrenWidth,
    height: childrenHeight,
  } = childrenRect

  const { top: parentTop, left: parentLeft } = offsetParentRect

  const { width: popupWidth, height: popupHeight } = popupStructuredRef

  // offSetParent is the closest positioned ancestor. If the element is not positioned, the nearest table cell or root element is used.
  const isPopupPortalTargetBody =
    popupPortalTarget === document.body || offsetParent === document.body

  // It will get how much scroll is done on the page to compute the position of the popup
  const scrollTopValue = isPopupPortalTargetBody
    ? document.documentElement.scrollTop
    : offsetParent.scrollTop

  // We need to compute the position of the popup based on the parent element in the case the popup is not in the body
  const overloadedChildrenLeft = isPopupPortalTargetBody
    ? childrenLeft
    : childrenLeft - parentLeft
  const overloadedChildrenTop = isPopupPortalTargetBody
    ? childrenTop
    : childrenTop - parentTop
  const overloadedChildrenRight = isPopupPortalTargetBody
    ? childrenRight
    : childrenLeft - parentLeft + childrenWidth

  const popupOverflow = getPopupOverflowFromParent(
    placementBasedOnWindowSize,
    offsetParentRect,
    childrenRect,
    popupStructuredRef,
    arrowWidth,
  )

  const isAligned = align === 'start'

  switch (placementBasedOnWindowSize) {
    case 'bottom': {
      const positionX = isAligned
        ? overloadedChildrenLeft
        : overloadedChildrenLeft + childrenWidth / 2 - popupWidth / 2
      const positionY =
        overloadedChildrenTop +
        scrollTopValue +
        childrenHeight +
        arrowWidth +
        SPACE

      return {
        arrowLeft: isAligned
          ? childrenWidth / 2 - arrowWidth
          : popupWidth / 2 + popupOverflow * -1,
        arrowTop: -arrowWidth - 5,
        arrowTransform: '',
        placement: 'bottom',
        rotate: 180,
        popupInitialPosition: `translate3d(${!isAligned ? positionX + popupOverflow : positionX}px, ${
          positionY - TOTAL_USED_SPACE
        }px, 0)`,
        popupPosition: `translate3d(${
          !isAligned ? positionX + popupOverflow : positionX
        }px, ${positionY}px, 0)`,
      }
    }
    case 'left': {
      const positionX =
        overloadedChildrenLeft - popupWidth - arrowWidth - SPACE * 2
      const positionY = isAligned
        ? overloadedChildrenTop + scrollTopValue
        : overloadedChildrenTop +
          scrollTopValue -
          popupHeight / 2 +
          childrenHeight / 2

      return {
        arrowLeft: popupWidth + arrowWidth + 5,
        arrowTop: isAligned
          ? childrenHeight / 2 - arrowWidth
          : popupHeight / 2 + popupOverflow * -1,
        arrowTransform: 'translate(-50%, -50%)',
        placement: 'left',
        rotate: -90,
        popupInitialPosition: `translate3d(${positionX + TOTAL_USED_SPACE}px, ${
          positionY + popupOverflow
        }px, 0)`,
        popupPosition: `translate3d(${positionX}px, ${
          positionY + popupOverflow
        }px, 0)`,
      }
    }
    case 'right': {
      const positionX = overloadedChildrenRight + arrowWidth + SPACE * 2
      const positionY = isAligned
        ? overloadedChildrenTop + scrollTopValue
        : overloadedChildrenTop +
          scrollTopValue -
          popupHeight / 2 +
          childrenHeight / 2

      return {
        arrowLeft: -arrowWidth - 5,
        arrowTop: isAligned
          ? childrenHeight / 2 - arrowWidth
          : popupHeight / 2 + popupOverflow * -1,
        arrowTransform: 'translate(50%, -50%)',
        placement: 'right',
        rotate: 90,
        popupInitialPosition: `translate3d(${positionX - TOTAL_USED_SPACE}px, ${
          positionY + popupOverflow
        }px, 0)`,
        popupPosition: `translate3d(${positionX}px, ${
          positionY + popupOverflow
        }px, 0)`,
      }
    }
    default: {
      // top placement is default value
      const positionX = isAligned
        ? overloadedChildrenLeft
        : overloadedChildrenLeft + childrenWidth / 2 - popupWidth / 2
      const positionY =
        overloadedChildrenTop +
        scrollTopValue -
        popupHeight -
        arrowWidth -
        SPACE

      return {
        arrowLeft: isAligned
          ? childrenWidth / 2 - arrowWidth
          : popupWidth / 2 + popupOverflow * -1,
        arrowTop: popupHeight - 1,
        arrowTransform: '',
        placement: 'top',
        rotate: 0,
        popupInitialPosition: `translate3d(${!isAligned ? positionX + popupOverflow : positionX}px, ${
          positionY + TOTAL_USED_SPACE
        }px, 0)`,
        popupPosition: `translate3d(${
          !isAligned ? positionX + popupOverflow : positionX
        }px, ${positionY}px, 0)`,
      }
    }
  }
}
