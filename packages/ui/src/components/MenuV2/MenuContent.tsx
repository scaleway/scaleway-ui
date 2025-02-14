import styled from '@emotion/styled'
import type { ButtonHTMLAttributes, MouseEvent, ReactNode, Ref } from 'react'
import {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Popup } from '../Popup'
import { SearchInput } from '../SearchInput'
import { Stack } from '../Stack'
import { useMenu } from './MenuProvider'
import { SIZES } from './constants'
import { searchChildren } from './helpers'
import type { MenuProps } from './types'

const StyledPopup = styled(Popup, {
  shouldForwardProp: prop => !['size', 'searchable'].includes(prop),
})<{ size?: keyof typeof SIZES; searchable: boolean }>`
  background-color: ${({ theme }) => theme.colors.other.elevation.background.raised};
  box-shadow: ${({ theme }) => `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`};
  padding: 0;

  &[data-has-arrow='true'] {
    &::after {
      border-color: ${({ theme }) => theme.colors.other.elevation.background.raised}
        transparent transparent transparent;
    }
  }

  min-width: ${SIZES.small};
  max-width: ${SIZES.large};
  ${({ size }) => (size ? `width: ${SIZES[size]};` : null)}
  ${({ searchable }) => (searchable ? `min-width: 20rem` : null)};
  padding: ${({ theme }) => `${theme.space['0.25']} 0`};
`

const MenuList = styled(Stack)`
  overflow-y: auto;
  overflow-x: hidden;
  &:after,
  &:before {
    border: solid transparent;
    border-width: 9px;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: transparent;
  }
  &:before {
    border-color: transparent;
  }
  background-color: ${({ theme }) =>
    theme.colors.other.elevation.background.raised};
  color: ${({ theme }) => theme.colors.neutral.text};
  border-radius: ${({ theme }) => theme.radii.default};
  position: relative;
`

const StyledSearchInput = styled(SearchInput)`
  padding: ${({ theme }) => theme.space['1']};
`

export const Menu = forwardRef(
  (
    {
      id,
      ariaLabel = 'Menu',
      children,
      disclosure,
      hasArrow = false,
      placement = 'bottom',
      className,
      'data-testid': dataTestId,
      maxHeight,
      maxWidth,
      portalTarget = document.body,
      size,
      triggerMethod = 'click',
      dynamicDomRendering,
      align,
      searchable = false,
    }: MenuProps,
    ref: Ref<HTMLButtonElement | null>,
  ) => {
    const { isVisible, setIsVisible } = useMenu()
    const searchInputRef = useRef<HTMLInputElement>(null)
    const [localChild, setLocalChild] = useState<ReactNode[] | null>(null)
    const popupRef = useRef<HTMLDivElement>(null)
    const disclosureRef = useRef<HTMLButtonElement>(null)
    const tempId = useId()
    const finalId = `menu-${id ?? tempId}`

    // if you need dialog inside your component, use function, otherwise component is fine
    const target = isValidElement<ButtonHTMLAttributes<HTMLButtonElement>>(
      disclosure,
    )
      ? disclosure
      : disclosure({ visible: isVisible })
    const innerRef = useRef(target as unknown as HTMLButtonElement)
    useImperativeHandle(ref, () => innerRef.current)

    const finalDisclosure = cloneElement(target, {
      onClick: (event: MouseEvent<HTMLButtonElement>) => {
        target.props.onClick?.(event)
        setIsVisible(!isVisible)
      },
      'aria-haspopup': 'dialog',
      'aria-expanded': isVisible,
      // @ts-expect-error not sure how to fix this
      ref: disclosureRef,
    })

    const onSearch = useCallback(
      (value: string) => {
        if (typeof children === 'object') {
          setLocalChild(searchChildren(children, value))
        }
      },
      [children],
    )

    useEffect(() => {
      if (isVisible && searchable) {
        setTimeout(() => {
          searchInputRef.current?.focus()
        }, 50)
      }
    }, [isVisible, searchable])

    const finalChild = useMemo(() => {
      if (typeof children === 'function') {
        return children({ toggle: () => setIsVisible(!isVisible) })
      }

      if (searchable && localChild) {
        return localChild
      }

      return children
    }, [children, isVisible, localChild, searchable, setIsVisible])

    return (
      <StyledPopup
        debounceDelay={triggerMethod === 'hover' ? 250 : 0}
        hideOnClickOutside
        aria-label={ariaLabel}
        className={className}
        visible={triggerMethod === 'click' ? isVisible : undefined}
        placement={placement}
        hasArrow={hasArrow}
        data-has-arrow={hasArrow}
        role="dialog"
        id={finalId}
        ref={popupRef}
        onClose={() => {
          setIsVisible(false)
          setLocalChild(null)
        }}
        tabIndex={-1}
        maxHeight={maxHeight ?? '30rem'}
        maxWidth={maxWidth}
        searchable={searchable}
        size={size}
        text={
          <div>
            {searchable && typeof children !== 'function' ? (
              <StyledSearchInput
                size="small"
                onSearch={onSearch}
                ref={searchInputRef}
              />
            ) : null}
            <MenuList
              data-testid={dataTestId}
              className={className}
              role="menu"
            >
              {finalChild}
            </MenuList>
          </div>
        }
        portalTarget={portalTarget}
        dynamicDomRendering={dynamicDomRendering}
        align={align}
      >
        {finalDisclosure}
      </StyledPopup>
    )
  },
)
