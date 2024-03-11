import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { CategoryIcon, Icon } from '@ultraviolet/icons'
import { Badge, Button, Expandable, MenuV2, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import { Children, useMemo, useReducer } from 'react'
import { useNavigation } from './NavigationProvider'

const NeutralButtonLink = css`
  color: inherit;
  text-decoration: none;
  background-color: inherit;
  border: none;
  text-align: left;
`

const StyledContainer = styled(Stack)`
  ${NeutralButtonLink};
  border-radius: ${({ theme }) => theme.radii.default};
  cursor: pointer;

  &[data-has-sub-label='true'] {
    padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1']}`};
  }

  &[data-has-sub-label='false'] {
    padding: ${({ theme }) => theme.space['1']};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.background};
  }
`

const CustomExpandable = styled(Expandable)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['0.25']};
  padding-left: 28px; // This value needs to be hardcoded because of the category icon size
`

const MenuStack = styled(Stack)`
  padding: ${({ theme }) => theme.space['0.5']};
`

type ItemProps = {
  children?: ReactNode
  categoryIcon?: ComponentProps<typeof CategoryIcon>['name']
  label?: string
  subLabel?: string
  badgeText?: string
  badgeSentiment?: ComponentProps<typeof Badge>['sentiment']
  href?: string
  /**
   * This function will be triggered when item is clicked to expand collapse
   * passing the new toggle state.
   */
  onClickToggle?: (toggle: true | false) => void
  /**
   * This prop is used to control the toggle state of the item.
   */
  toggle?: boolean
  /**
   * When setting this prop you will add a button at the end of the item.
   * If you set this prop as a `string` it will be added automatically into a button.
   * If needed you can pass to this prop your own component for advanced use cases.
   */
  button?: ReactNode
}

export const Item = ({
  children,
  categoryIcon,
  label,
  subLabel,
  badgeText,
  badgeSentiment,
  href,
  onClickToggle,
  toggle = true,
  button,
}: ItemProps) => {
  const context = useNavigation()
  const [internalToggle, setToggle] = useReducer(state => {
    onClickToggle?.(!state)

    return !state
  }, toggle)

  if (!context) {
    throw new Error('Navigation.Item can only be used inside a Navigation')
  }

  const { expanded } = context

  const hasHrefAndNoChildren = href && !children

  const Container = StyledContainer.withComponent(
    hasHrefAndNoChildren ? 'a' : 'button',
  )

  const ariaExpanded = useMemo(() => {
    if (hasHrefAndNoChildren && internalToggle) {
      return true
    }

    if (hasHrefAndNoChildren && !internalToggle) {
      return false
    }

    return undefined
  }, [hasHrefAndNoChildren, internalToggle])

  if (expanded) {
    return (
      <>
        <Container
          gap={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          data-has-sub-label={!!subLabel}
          onClick={children ? setToggle : undefined}
          aria-expanded={ariaExpanded}
          href={href}
        >
          <Stack direction="row" gap={1} alignItems="center">
            {categoryIcon ? <CategoryIcon name={categoryIcon} /> : null}
            <Stack>
              <Text
                as="span"
                variant="bodySmallStrong"
                sentiment="neutral"
                prominence={!children ? 'weak' : undefined}
              >
                {label}
              </Text>
              {subLabel ? (
                <Text
                  as="span"
                  variant="caption"
                  sentiment="neutral"
                  prominence="weak"
                >
                  {subLabel}
                </Text>
              ) : null}
            </Stack>
          </Stack>
          <Stack gap={1} direction="row" alignItems="center">
            {badgeText ? (
              <Badge
                sentiment={badgeSentiment}
                size="small"
                prominence="strong"
              >
                {badgeText}
              </Badge>
            ) : null}
            {hasHrefAndNoChildren ? (
              <Icon name="open-in-new" color="neutral" prominence="weak" />
            ) : null}
            {children ? (
              <Icon
                name={internalToggle ? 'arrow-down' : 'arrow-right'}
                color="neutral"
                prominence="weak"
              />
            ) : null}
            {button && typeof button === 'string' ? (
              <Button sentiment="neutral" variant="ghost" size="small">
                {button}
              </Button>
            ) : null}
            {button && typeof button !== 'string' ? button : null}
          </Stack>
        </Container>
        {children ? (
          <CustomExpandable opened={internalToggle}>
            {children}
          </CustomExpandable>
        ) : null}
      </>
    )
  }

  if (categoryIcon) {
    return (
      <MenuStack gap={1} alignItems="center" justifyContent="start">
        {Children.count(children) > 0 ? (
          <MenuV2
            disclosure={
              <Button sentiment="neutral" variant="ghost" size="small">
                <Stack
                  direction="row"
                  gap={1}
                  alignItems="center"
                  justifyContent="center"
                >
                  <CategoryIcon name={categoryIcon} />
                </Stack>
              </Button>
            }
            placement="right"
          >
            {Children.map(children, child => (
              <MenuV2.Item href={href}>{child}</MenuV2.Item>
            ))}
          </MenuV2>
        ) : (
          <Button sentiment="neutral" variant="ghost" size="small">
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              justifyContent="center"
            >
              <CategoryIcon name={categoryIcon} />
            </Stack>
          </Button>
        )}
      </MenuStack>
    )
  }

  return label
}
