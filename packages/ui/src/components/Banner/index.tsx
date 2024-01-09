import type { Theme } from '@emotion/react'
import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { ComponentProps, ReactNode } from 'react'
import { useState } from 'react'
import { Button } from '../Button'
import { Link } from '../Link'
import { Stack } from '../Stack'
import { Text } from '../Text'
import defaultIllustrationSmall from './assets/default-image-small.svg'
import defaultIllustration from './assets/default-image.svg'

type Variant = 'intro' | 'promotional'
type Size = 'small' | 'medium'

const styles = ({
  theme,
  variant,
  size,
}: {
  theme: Theme
  variant: Variant
  size: Size
}) => {
  if (size === 'small') {
    if (variant === 'intro') {
      return css`
        background: ${theme.colors.primary.background};
        background-position: left, right;
        background-repeat: no-repeat, no-repeat;
        background-size: contain, contain;
      `
    }

    if (variant === 'promotional') {
      return css`
        background-position: left, right;
        background-image: ${theme.colors.other.gradients.background.aqua};
        background-repeat: no-repeat, no-repeat;
        background-size: contain, contain;
      `
    }
  }

  if (size === 'medium') {
    if (variant === 'intro') {
      return css`
        background: ${theme.colors.primary.background};
        background-position: right;
        background-repeat: no-repeat;
        background-size: contain;
      `
    }

    if (variant === 'promotional') {
      return css`
        background-image: ${theme.colors.other.gradients.background.aqua};
        background-position: right;
        background-repeat: no-repeat;
        background-size: contain;
      `
    }
  }

  return null
}

const Container = styled('div', {
  shouldForwardProp: prop => !['variant', 'size', 'padding'].includes(prop),
})<{ variant: Variant; size: Size }>`
  padding: ${({ theme, size }) => theme.space[size === 'small' ? '2' : '3']};
  border-radius: ${({ theme }) => theme.radii.large};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space['2']};
  ${({ theme, variant, size }) => styles({ theme, variant, size })};

  > svg:first-child,
  > img {
    height: ${({ size }) => (size === 'medium' ? '140px' : '100px')};
    align-self: center;
  }

  button[name='close'] {
    background: none;

    &:hover {
      background: none;
    }
  }
`

const ImageStack = styled(Stack, {
  shouldForwardProp: prop => !['size'].includes(prop),
})<{ size: Size }>`
  width: ${({ size }) => (size === 'medium' ? '140px' : '74px')};
`

type BannerProps = {
  variant?: Variant
  size?: 'small' | 'medium'
  title: string
  children: ReactNode
  direction?: 'row' | 'column'
  onClose?: () => void
  buttonText?: string
  onClickButton?: ComponentProps<typeof Button>['onClick']
  linkText?: string
  linkHref?: string
  image?: ReactNode
  closable?: boolean
  className?: string
  ['data-testid']?: string
}

/**
 * Banner component is used to display an informative message to the user with style.
 */
export const Banner = ({
  variant = 'intro',
  size = 'medium',
  title,
  children,
  direction = 'column',
  onClose,
  buttonText,
  onClickButton,
  linkText,
  linkHref,
  image,
  className,
  closable = true,
  'data-testid': dataTestId,
}: BannerProps) => {
  const { theme } = useTheme()
  const DefaultImage =
    size === 'small' ? defaultIllustrationSmall : defaultIllustration

  const [opened, setOpened] = useState(true)

  if (!opened) return null

  return (
    <Container
      variant={variant}
      size={size}
      className={className}
      data-testid={dataTestId}
    >
      <ImageStack size={size} justifyContent="center">
        {image ?? <DefaultImage />}
      </ImageStack>
      <Stack
        direction={direction}
        gap={2}
        justifyContent="space-between"
        alignItems={direction === 'column' ? 'start' : 'center'}
        style={{ flex: 1 }}
      >
        <Stack gap={0.5} style={{ flex: 1 }} justifyContent="center">
          <Text
            as="p"
            variant={size === 'medium' ? 'headingSmall' : 'bodyStronger'}
            sentiment={
              variant === 'promotional' && theme !== 'light'
                ? 'neutral'
                : 'primary'
            }
            prominence={variant === 'intro' ? 'default' : 'strong'}
          >
            {title}
          </Text>
          <Text
            as="p"
            variant="body"
            sentiment="neutral"
            prominence={
              variant === 'intro' ||
              (variant === 'promotional' && theme !== 'light')
                ? 'default'
                : 'stronger'
            }
          >
            {children}
          </Text>
        </Stack>
        {buttonText || linkText ? (
          <Stack direction="row" gap={2} alignItems="center">
            {buttonText ? (
              <Button
                size="medium"
                sentiment={variant === 'intro' ? 'primary' : 'neutral'}
                variant="filled"
                onClick={onClickButton}
              >
                {buttonText}
              </Button>
            ) : null}
            {linkText ? (
              <Link
                sentiment={theme !== 'light' ? 'neutral' : 'primary'}
                size="small"
                target="_blank"
                href={linkHref ?? ''}
                prominence={
                  variant === 'intro' || theme !== 'light'
                    ? 'default'
                    : 'strong'
                }
              >
                {linkText}
              </Link>
            ) : null}
          </Stack>
        ) : null}
      </Stack>
      {closable ? (
        <Button
          icon="close"
          size="small"
          name="close"
          variant={variant === 'intro' ? 'ghost' : 'filled'}
          sentiment={
            variant === 'intro' ||
            (variant === 'promotional' && theme !== 'light')
              ? 'neutral'
              : 'primary'
          }
          onClick={() => {
            setOpened(false)
            onClose?.()
          }}
        />
      ) : null}
    </Container>
  )
}
