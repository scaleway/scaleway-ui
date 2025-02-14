import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import type { MouseEvent, MouseEventHandler, ReactNode, Ref } from 'react'
import { forwardRef, useCallback } from 'react'
import { Tooltip } from '../../Tooltip'
import { useMenu } from '../MenuProvider'

type MenuItemSentiment = 'neutral' | 'primary' | 'danger'

const ANIMATION_DURATION = 200 // in ms

const itemCoreStyle = ({
  theme,
  sentiment,
  disabled,
}: {
  theme: Theme
  borderless: boolean
  sentiment: MenuItemSentiment
  disabled: boolean
}) => `
  display: flex;
  justify-content: start;
  text-align: left;
  align-items: center;
  min-height: ${theme.sizing['400']};
  max-height: ${theme.sizing['500']};
  font-size: ${theme.typography.bodySmall.fontSize};
  line-height: ${theme.typography.bodySmall.lineHeight};
  font-weight: inherit;
  padding: ${`${theme.space['0.5']} ${theme.space['1']}`};
  border: none;
  cursor: pointer;
  min-width: 6.875rem;
  width: 100%;
  border-radius: ${theme.radii.default};
  transition: background-color ${ANIMATION_DURATION}ms, color ${ANIMATION_DURATION}ms;

  color: ${theme.colors[sentiment][disabled ? 'textDisabled' : 'text']};
  svg {
    fill: ${theme.colors[sentiment][disabled ? 'textDisabled' : 'text']};
  }

  ${
    disabled
      ? `
        cursor: not-allowed;
      `
      : `
          &:hover,
          &:focus, &[data-active='true'] {
            background-color: ${theme.colors[sentiment].backgroundHover};
            color: ${theme.colors[sentiment].textHover};
            svg {
              fill: ${theme.colors[sentiment].textHover};
            }
          }`
  }
  `

const Container = styled('div', {
  shouldForwardProp: prop => !['borderless'].includes(prop),
})<{ borderless: boolean }>`
  ${({ theme, borderless }) =>
    borderless
      ? ''
      : `border-bottom: 1px solid ${theme.colors.neutral.border};`}
  padding: ${({ theme, borderless }) =>
    `${borderless ? theme.space['0.25'] : theme.space['0.5']} ${
      theme.space['0.5']
    }`};
  &:last-child {
    border: none;
  }
`

const StyledItem = styled('button', {
  shouldForwardProp: prop => !['borderless', 'sentiment'].includes(prop),
})<{
  borderless: boolean
  disabled: boolean
  sentiment: MenuItemSentiment
}>`
  ${({ theme, borderless, sentiment, disabled }) =>
    itemCoreStyle({ theme, borderless, sentiment, disabled })}
  background: none;
`

const StyledLinkItem = styled('a', {
  shouldForwardProp: prop => !['borderless', 'sentiment'].includes(prop),
})<{
  borderless: boolean
  disabled: boolean
  sentiment: MenuItemSentiment
}>`
  ${({ theme, borderless, sentiment, disabled }) =>
    itemCoreStyle({ theme, borderless, sentiment, disabled })}
  text-decoration: none;

  &:focus {
    text-decoration: none;
  }
`

type ItemProps = {
  href?: HTMLAnchorElement['href']
  target?: HTMLAnchorElement['target']
  rel?: HTMLAnchorElement['rel']
  disabled?: boolean | undefined
  tooltip?: string | undefined
  className?: string | undefined
  children: ReactNode
  onClick?: MouseEventHandler<HTMLElement> | undefined
  borderless?: boolean
  sentiment?: MenuItemSentiment
  active?: boolean
  'data-testid'?: string
}

const Item = forwardRef<HTMLElement, ItemProps>(
  (
    {
      borderless = false,
      disabled = false,
      onClick,
      sentiment = 'neutral',
      href,
      target,
      rel,
      children,
      tooltip,
      active,
      className,
      'data-testid': dataTestId,
    },
    ref,
  ) => {
    const { hideOnClickItem, setIsVisible } = useMenu()

    const onClickHandle = useCallback(
      (event: MouseEvent<HTMLAnchorElement>) => {
        if (disabled) return undefined
        onClick?.(event)
        if (hideOnClickItem) {
          setIsVisible(false)
        }

        return undefined
      },
      [disabled, hideOnClickItem, onClick, setIsVisible],
    )

    if (href && !disabled) {
      return (
        <Container borderless={borderless}>
          <Tooltip text={tooltip}>
            <StyledLinkItem
              data-active={active}
              borderless
              href={href}
              target={target}
              rel={rel}
              ref={ref as Ref<HTMLAnchorElement>}
              onClick={onClickHandle}
              role="menuitem"
              disabled={disabled}
              sentiment={sentiment}
              className={className}
              data-testid={dataTestId}
            >
              {children}
            </StyledLinkItem>
          </Tooltip>
        </Container>
      )
    }

    return (
      <Container borderless={borderless}>
        <Tooltip text={tooltip}>
          <StyledItem
            type="button"
            ref={ref as Ref<HTMLButtonElement>}
            role="menuitem"
            disabled={disabled}
            onClick={event => {
              onClick?.(event)
              if (hideOnClickItem) {
                setIsVisible(false)
              }
            }}
            borderless={borderless}
            sentiment={sentiment}
            className={className}
            data-testid={dataTestId}
            data-active={active}
          >
            {children}
          </StyledItem>
        </Tooltip>
      </Container>
    )
  },
)

export default Item
