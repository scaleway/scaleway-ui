import styled from '@emotion/styled'
import type { ComponentProps, ReactNode, Ref } from 'react'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../Button'
import { Popup } from '../Popup'
import { Stack } from '../Stack'
import { Text } from '../Text'

type SentimentType = 'neutral' | 'primary'

const SIZES_WIDTH = {
  small: 320,
  medium: 420,
  large: 520,
}

const StyledPopup = styled(Popup, {
  shouldForwardProp: prop => !['sentiment', 'size'].includes(prop),
})<{
  sentiment: SentimentType
  size: keyof typeof SIZES_WIDTH
}>`
  padding: ${({ theme }) => theme.space['2']};
  width: ${({ size }) => SIZES_WIDTH[size]}px;
  max-width: ${({ size }) => SIZES_WIDTH[size]}px;
  text-align: initial;

  ${({ theme, sentiment }) => {
    if (sentiment === 'neutral') {
      return `
      background: ${theme.colors.neutral.background};
      box-shadow: ${theme.shadows.popover};
      &[data-has-arrow='true'] {
        &::after {
          border-color: ${theme.colors.neutral.background} transparent transparent transparent;
        }
      }
      `
    }

    return `
      background: ${theme.colors.primary.backgroundStrong};
      box-shadow: ${theme.shadows.popover};
      &[data-has-arrow='true'] {
        &::after {
          border-color: ${theme.colors.primary.backgroundStrong} transparent transparent transparent;
        }
      }
      `
  }}
`

// This is to avoid having text inherit color from popup (which is white on white background)
const StyledStack = styled(Stack)`
  color: ${({ theme }) => theme.colors.neutral.text};
`

type ContentWrapperProps = Pick<
  PopoverProps,
  'title' | 'onClose' | 'sentiment' | 'children'
>

const ContentWrapper = ({
  title,
  onClose,
  children,
  sentiment,
}: ContentWrapperProps) => (
  <StyledStack gap={1}>
    <Stack direction="row" justifyContent="space-between">
      <Text
        variant="bodyStrong"
        as="h3"
        sentiment="neutral"
        prominence={sentiment === 'neutral' ? 'strong' : 'stronger'}
      >
        {title}
      </Text>
      <Button
        variant={sentiment === 'neutral' ? 'ghost' : 'filled'}
        sentiment={sentiment === 'neutral' ? 'neutral' : 'primary'}
        onClick={onClose}
        size="small"
        icon="close"
        aria-label="close"
      />
    </Stack>
    {typeof children === 'string' ? (
      <Text
        variant="bodySmall"
        as="p"
        sentiment="neutral"
        prominence={sentiment === 'neutral' ? 'strong' : 'stronger'}
      >
        {children}
      </Text>
    ) : (
      children
    )}
  </StyledStack>
)

type PopoverProps = {
  children: ReactNode
  content: ReactNode
  title: string
  sentiment?: SentimentType
  visible?: boolean
  size?: keyof typeof SIZES_WIDTH
  onClose?: () => void
  className?: string
  'data-testid'?: string
  maxWidth?: string
  maxHeight?: string
  /**
   * By default, the portal target is children container or document.body if children is a function. You can override this
   * behavior by setting a portalTarget prop.
   */
  portalTarget?: HTMLElement
} & Pick<ComponentProps<typeof Popup>, 'placement'>

/**
 * Popover component is used to display additional information or actions on top of the main content of the page.
 * It is usually triggered by clicking on a button. It includes a title, a close button and a content area.
 */
export const Popover = forwardRef(
  (
    {
      visible = false,
      children,
      placement,
      content,
      title,
      sentiment = 'neutral',
      size = 'medium',
      onClose,
      className,
      maxWidth,
      maxHeight,
      'data-testid': dataTestId,
      portalTarget,
    }: PopoverProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const innerRef = useRef<HTMLDivElement>(null)
    const [localVisible, setLocalVisible] = useState(visible)

    // We change local value if visible prop changes
    useEffect(() => {
      setLocalVisible(visible)
    }, [visible])

    const localOnClose = useCallback(() => {
      setLocalVisible(false)
      onClose?.()
    }, [onClose])

    return (
      <StyledPopup
        hideOnClickOutside
        needDebounce={false}
        visible={localVisible}
        placement={placement}
        text={
          <ContentWrapper
            title={title}
            onClose={localOnClose}
            sentiment={sentiment}
          >
            {content}
          </ContentWrapper>
        }
        className={className}
        data-ultraviolet
        sentiment={sentiment}
        data-testid={dataTestId}
        size={size}
        role="dialog"
        ref={ref}
        tabIndex={-1}
        innerRef={innerRef}
        onClose={localOnClose}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        portalTarget={portalTarget}
      >
        {children}
      </StyledPopup>
    )
  },
)
