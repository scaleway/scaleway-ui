import styled from '@emotion/styled'
import { Button, Stack, Tooltip } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { NavigationProvider, useNavigation } from './NavigationProvider'
import { Group } from './components/Group'
import { Item } from './components/Item'
import { PinnedItems } from './components/PinnedItems'
import { Separator } from './components/Separator'
import {
  ANIMATION_DURATION,
  NAVIGATION_COLLASPED_WIDTH,
  NAVIGATION_MAX_WIDTH,
  NAVIGATION_MIN_WIDTH,
  NAVIGATION_WIDTH,
} from './constants'
import NavigationLocales from './locales/en'

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  position: relative;
  border-right: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
`

const Container = styled('div', {
  shouldForwardProp: prop => !['width'].includes(prop),
})<{
  width: number
}>`
  background: ${({ theme }) => theme.colors.neutral.background};
  display: flex;
  flex-direction: column;

  width: ${({ width }) => width}px;

  &[data-expanded='true'][data-animation='false'] {
    max-width: ${NAVIGATION_MAX_WIDTH}px;
    min-width: ${NAVIGATION_MIN_WIDTH}px;
  }

  &[data-expanded='false'] {
    width: ${NAVIGATION_COLLASPED_WIDTH}px;
  }

  &[data-animation='expand'] {
    transition: width ${ANIMATION_DURATION}ms ease-in-out;
    width: ${({ width }) => width}px;
  }

  &[data-animation='collapse'] {
    transition: width ${ANIMATION_DURATION}ms ease-in-out;

    width: ${NAVIGATION_COLLASPED_WIDTH}px;
  }
`

const StickyFooter = styled.div`
  display: flex;
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral.background};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  padding: ${({ theme }) => `${theme.space['1']} ${theme.space['2']}`};
  transition: justify-content ${ANIMATION_DURATION}ms ease-in-out;
  box-shadow: ${({ theme }) => theme.shadows.defaultShadow};

  justify-content: flex-end;
`

const Header = styled.div`
  background: ${({ theme }) => theme.colors.neutral.background};
`

const LogoContainer = styled(Stack)`
  margin: ${({ theme }) =>
    `${theme.space['3']} ${theme.space['3']} ${theme.space['2']} ${theme.space['3']}`};
  max-width: 220px;
  height: 22px;
`

const ContentContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Content = styled(Stack)`
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;

  &[data-is-expanded='false'] {
    padding: ${({ theme }) => theme.space['2']} 0;
  }

  &[data-is-expanded='true'],
  &[data-animation='expand'] {
    padding: ${({ theme }) => theme.space['2']};
  }
`

const Slider = styled.div`
  background: transparent;
  cursor: col-resize;
  border: 2px solid transparent;
  margin-right: -2px; // To make the slider look like it's part of the navigation
  display: flex;

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.primary.border};
  }
`

type NavigationContentProps = {
  children: ReactNode
  logo?: ReactNode | ((expanded: boolean) => ReactNode)
  className?: string
  onClickExpand?: (expanded: boolean) => void
  width: number
  onWidthResize?: (width: number) => void
}

const NavigationContent = ({
  children,
  logo,
  onClickExpand,
  width,
  onWidthResize,
  className,
}: NavigationContentProps) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const navigationRef = useRef<HTMLDivElement>(null)

  const { expanded, setExpanded, animation, setAnimation, locales } =
    useNavigation()

  // This function will be triggered when expand/collapse button is clicked
  const toggleExpand = useCallback(() => {
    onClickExpand?.(!expanded)
    if (navigationRef.current) {
      navigationRef.current.style.width = ''
    }

    setAnimation(expanded ? 'collapse' : 'expand')

    setTimeout(() => {
      setExpanded()
      setAnimation(false)
    }, ANIMATION_DURATION)
  }, [expanded, onClickExpand, setAnimation, setExpanded])

  useEffect(() => {
    let prevX: number
    let navRect: DOMRect | undefined
    let shouldCollapseOnMouseUp = false
    let shouldExpandOnMouseUp = false

    const mouseMove = (event: MouseEvent) => {
      if (prevX !== undefined) {
        const navWidth = navRect?.width ?? 0
        const newWidth = navWidth + (event.clientX - prevX)

        if (navigationRef.current && expanded) {
          navigationRef.current.style.width = `${newWidth}px`
        }

        if (newWidth <= NAVIGATION_MIN_WIDTH) {
          shouldCollapseOnMouseUp = true
        } else {
          shouldCollapseOnMouseUp = false
        }

        if (newWidth >= NAVIGATION_COLLASPED_WIDTH && !expanded) {
          shouldExpandOnMouseUp = true
        } else {
          shouldExpandOnMouseUp = false
        }
      }
    }

    const mousedown = (event: MouseEvent) => {
      document.body.style.pointerEvents = 'none'
      document.body.style.userSelect = 'none'

      prevX = event.clientX
      navRect = navigationRef.current?.getBoundingClientRect()

      const mouseup = () => {
        if (shouldCollapseOnMouseUp || shouldExpandOnMouseUp) {
          toggleExpand()
        }

        if (navigationRef.current) {
          if (!shouldCollapseOnMouseUp && !shouldExpandOnMouseUp) {
            onWidthResize?.(navigationRef.current.offsetWidth)
          }

          if (!expanded) {
            navigationRef.current.style.width = ''
          }
        }

        document.removeEventListener('mousemove', mouseMove)
        window.removeEventListener('mouseup', mouseup)

        document.body.style.pointerEvents = ''
        document.body.style.userSelect = ''
      }

      document.addEventListener('mousemove', mouseMove)
      window.addEventListener('mouseup', mouseup)
    }

    sliderRef.current?.addEventListener('mousedown', mousedown)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      sliderRef.current?.removeEventListener('mousedown', mousedown)
    }
  }, [expanded, onWidthResize, toggleExpand])

  return (
    <StyledNav className={className}>
      <Container
        ref={navigationRef}
        data-animation={animation}
        data-expanded={expanded}
        width={width}
      >
        <Header>
          <LogoContainer
            justifyContent={!expanded ? 'center' : undefined}
            alignItems="start"
          >
            {typeof logo === 'function'
              ? logo(animation ? false : expanded)
              : logo}
          </LogoContainer>
        </Header>
        <ContentContainer>
          <Content
            gap={0.25}
            data-is-expanded={expanded}
            data-animation={animation}
          >
            {children}
          </Content>
          <StickyFooter data-expanded={expanded} data-animation={animation}>
            <Tooltip
              text={
                expanded
                  ? locales['navigation.collapse.button']
                  : locales['navigation.expand.button']
              }
              placement="right"
            >
              <Button
                variant="ghost"
                sentiment="neutral"
                size="small"
                icon={expanded ? 'arrow-left-double' : 'arrow-right-double'}
                onClick={toggleExpand}
              />
            </Tooltip>
          </StickyFooter>
        </ContentContainer>
      </Container>
      <Slider ref={sliderRef} />
    </StyledNav>
  )
}

type NavigationProps = {
  children: ReactNode
  /**
   * The logo to be displayed in header of the navigation
   * It can be a component or a function. The function will retrun you
   * expanded state of the navigation so you can decide to show/hide
   * some part of your logo
   */
  logo?: ReactNode | ((expanded: boolean) => ReactNode)
  /**
   * This enable / disable the pinned feature of the navigation
   * Pinned allows the use to pin (or favorite) some items in the navigation
   */
  pinnedFeature?: boolean
  /**
   * This define how many items can be pinned at the same time.
   * If you want to disable the limit just set `Infinity` to this prop
   */
  pinLimit?: number
  /**
   * The initial pinned items. This should be an array of labels you've set on
   * your `<Navigation.Item>`
   */
  initialPinned?: string[]
  /**
   * The initial expanded state of the navigation. If set to true the
   * navigation will be expanded by default otherwise it will be collapsed
   */
  initialExpanded?: boolean
  /**
   * This function is triggered when the user click on the pin/unpin button
   * of an item
   */
  onClickPinUnpin?: (pinned: string[]) => void
  locales?: typeof NavigationLocales
  /**
   * This function is triggered when user click on expand button on the footer
   * of the navigation. This is not triggered when the user resize the navigation
   * and it automatically collapse / expand.
   */
  onClickExpand?: (expanded: boolean) => void
  className?: string
  /**
   * It defines the initial width of the navigation.
   */
  width?: number
  /**
   * This function is called when resize occur using the vertical bar on the left of the navigation.
   */
  onWidthResize?: (width: number) => void
}

export const Navigation = ({
  children,
  logo,
  pinnedFeature = false,
  onClickPinUnpin,
  onClickExpand,
  initialPinned,
  initialExpanded = true,
  locales = NavigationLocales,
  pinLimit = 7,
  width = NAVIGATION_WIDTH,
  onWidthResize,
  className,
}: NavigationProps) => (
  <NavigationProvider
    onClickPinUnpin={onClickPinUnpin}
    pinnedFeature={pinnedFeature}
    locales={locales}
    initialPinned={initialPinned}
    pinLimit={pinLimit}
    initialExpanded={initialExpanded}
  >
    <NavigationContent
      onClickExpand={onClickExpand}
      logo={logo}
      className={className}
      width={width}
      onWidthResize={onWidthResize}
    >
      {children}
    </NavigationContent>
  </NavigationProvider>
)

Navigation.Group = Group
Navigation.Item = Item
Navigation.PinnedItems = PinnedItems
Navigation.Separator = Separator
