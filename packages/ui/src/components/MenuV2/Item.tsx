import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import type { MouseEventHandler, ReactNode, Ref } from 'react'
import { Tooltip } from '../Tooltip'

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
  align-items: center;
  min-height: 32px;
  max-height: 44px;
  font-size: ${theme.typography.bodySmall.fontSize};
  line-height: ${theme.typography.bodySmall.lineHeight};
  font-weight: inherit;
  padding: ${`${theme.space['0.5']} ${theme.space['1']}`};
  border: none;
  cursor: pointer;
  min-width: 110px;
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
  href?: string | undefined
  disabled?: boolean | undefined
  tooltip?: string | undefined
  className?: string | undefined
  children: ReactNode
  onClick?: MouseEventHandler<HTMLElement> | undefined
  borderless?: boolean
  sentiment?: MenuItemSentiment
  active?: boolean
  'data-testid'?: string
  ref?: Ref<HTMLElement>
}

const Item = ({
  borderless = false,
  disabled = false,
  onClick,
  sentiment = 'neutral',
  href,
  children,
  tooltip,
  active,
  className,
  'data-testid': dataTestId,
  ref,
}: ItemProps) => {
  if (href && !disabled) {
    return (
      <Container borderless={borderless}>
        <Tooltip text={tooltip}>
          <StyledLinkItem
            data-active={active}
            borderless
            href={href}
            ref={ref as Ref<HTMLAnchorElement>}
            onClick={
              disabled
                ? undefined
                : (onClick as MouseEventHandler<HTMLAnchorElement>)
            }
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
          onClick={onClick}
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
}

export default Item
