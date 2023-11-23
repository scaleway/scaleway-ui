import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon, Stack, Text } from '@ultraviolet/ui'
import type { MouseEventHandler, ReactNode } from 'react'
import { createRef, forwardRef, useEffect, useMemo, useState } from 'react'
import { Skeleton } from './Skeleton'

const activeStyle = (theme: Theme) => css`
  &:hover {
    border: 1px solid ${theme.colors.primary.borderHover};
    box-shadow: ${theme.shadows.defaultShadow};
    cursor: pointer;
  }
`

const Card = styled.div<{
  onClick?: ContentCardProps['onClick']
  href?: ContentCardProps['href']
}>`
  display: block;
  text-align: left;
  padding: 0;
  color: ${({ theme }) => theme.colors.neutral.text};
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};
  background: ${({ theme }) => theme.colors.neutral.background};
  ${({ onClick, href, theme }) =>
    onClick || href ? activeStyle(theme) : null};
  overflow-wrap: break-word;
`

const IconContainer = styled.div`
  display: flex;
  width: fit-content;
  background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  padding: ${({ theme }) => theme.space['1']};
  border-radius: ${({ theme }) => theme.radii.default};
`

const StyledIconStack = styled(Stack, {
  shouldForwardProp: prop => prop !== 'direction',
})<{ direction: ContentCardProps['direction'] }>`
  padding: ${({ theme, direction }) =>
    direction === 'column'
      ? `0 ${theme.space['3']} ${theme.space['3']} ${theme.space['3']}`
      : `${theme.space['3']} ${theme.space['3']} ${theme.space['3']} 0`};
`

const SubContainer = styled(Stack, {
  shouldForwardProp: prop => !['direction', 'href'].includes(prop),
})<{
  direction: ContentCardProps['direction']
  href: ContentCardProps['href']
}>`
  padding: ${({ theme, direction }) =>
    direction === 'column'
      ? `${theme.space['3']} ${theme.space['3']} 0 ${theme.space['3']}`
      : `${theme.space['3']} 0 ${theme.space['3']} ${theme.space['3']}`};
  padding: ${({ theme, href }) => (!href ? `${theme.space['3']}` : null)};
  height: fit-content;
`

const Image = styled('img', {
  shouldForwardProp: prop =>
    !['direction', 'subContainerHeight'].includes(prop),
})<{
  direction: ContentCardProps['direction']
  subContainerHeight?: number
}>`
  object-fit: cover;
  border-radius: ${({ theme, direction }) =>
    `${
      direction === 'column'
        ? `${theme.radii.default} ${theme.radii.default} 0 0`
        : `${theme.radii.default} 0 0 ${theme.radii.default}`
    }`};
  ${({ direction, subContainerHeight }) =>
    direction === 'row' ? `max-height: ${subContainerHeight}px` : null}
`

const FullHeightStack = styled(Stack)`
  height: 100%;
`

type ContentCardProps = {
  direction?: 'row' | 'column'
  /**
   * The image to display at the top of the card (if direction is column) or to the left of the card (if direction is row).
   * By default, the image will be cropped to fit the card.
   */
  image?: string
  /**
   * The icon the second element of the card to be displayed after the image. We allow any ReactNode but recommend
   * using `<ProductIcon>` from `@ultraviolet/icons`.
   */
  icon?: ReactNode
  subtitle?: string
  title: string
  description?: string
  children?: ReactNode
  /**
   * The href to link the card to. If not provided, the card will not be clickable.
   */
  href?: HTMLAnchorElement['href']
  target?: HTMLAnchorElement['target']
  onClick?: MouseEventHandler<HTMLElement>
  loading?: boolean
  className?: string
}

/**
 * ContentCard is a component that displays a title, subtitle, description, image and icon in a card.
 * It can take different directions to display the image and the content. You can also add more content
 * by passing children.
 */
export const ContentCard = forwardRef<
  HTMLAnchorElement & HTMLButtonElement & HTMLDivElement,
  ContentCardProps
>(
  (
    {
      image,
      direction = 'column',
      icon,
      subtitle,
      title,
      description,
      children,
      href,
      target = '_blank',
      onClick,
      loading,
      className,
    },
    ref,
  ) => {
    const subContainerRef = createRef<HTMLDivElement>()
    const [subContainerHeight, setSubContainerHeight] = useState(
      subContainerRef?.current?.offsetHeight,
    )
    const Container = useMemo(() => {
      if (href) {
        return Card.withComponent('a')
      }

      if (onClick) {
        return Card.withComponent('button')
      }

      return Card
    }, [href, onClick])

    useEffect(
      () => setSubContainerHeight(subContainerRef?.current?.offsetHeight),
      [subContainerRef],
    )

    return (
      <Container
        target={target}
        onClick={onClick}
        href={href}
        role={onClick ? 'button' : undefined}
        ref={ref}
        className={className}
      >
        {loading ? (
          <Skeleton direction={direction} />
        ) : (
          <FullHeightStack direction={direction}>
            {image ? (
              <Image
                alt=""
                src={image}
                height={direction === 'column' ? 120 : undefined}
                width={direction === 'row' ? 220 : undefined}
                direction={direction}
                subContainerHeight={subContainerHeight}
              />
            ) : null}
            <Stack gap={2} direction={direction} flex={1}>
              <SubContainer
                gap={2}
                direction={direction}
                href={href}
                ref={subContainerRef}
              >
                {icon ?? null}
                <Stack gap={2} justifyContent="center">
                  <Stack gap={0.5}>
                    <Stack>
                      {subtitle ? (
                        <Text
                          as="small"
                          variant="caption"
                          prominence="weak"
                          sentiment="neutral"
                        >
                          {subtitle}
                        </Text>
                      ) : null}
                      <Text as="h3" variant="bodyStrong" sentiment="neutral">
                        {title}
                      </Text>
                    </Stack>
                    {description ? (
                      <Text as="p" variant="bodySmall" sentiment="neutral">
                        {description}
                      </Text>
                    ) : null}
                  </Stack>
                  {children ? <Stack>{children}</Stack> : null}
                </Stack>
              </SubContainer>
              {href ? (
                <StyledIconStack
                  flex={1}
                  alignItems={direction === 'column' ? 'flex-end' : 'center'}
                  justifyContent={direction === 'column' ? 'center' : 'end'}
                  direction={direction}
                >
                  <IconContainer>
                    <Icon name="open-in-new" color="neutral" />
                  </IconContainer>
                </StyledIconStack>
              ) : null}
            </Stack>
          </FullHeightStack>
        )}
      </Container>
    )
  },
)
