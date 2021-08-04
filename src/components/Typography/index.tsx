import { SerializedStyles, Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {
  ElementType,
  FocusEvent,
  MouseEvent,
  ReactNode,
  Ref,
  forwardRef,
  useCallback,
} from 'react'
import recursivelyGetChildrenString from '../../helpers/recursivelyGetChildrenString'
import { Color } from '../../theme/colors'
import Box from '../Box'
import Tooltip, { TooltipProps } from '../Tooltip'

type StyleProps = {
  theme?: Theme
  maxLines?: number
}
const styles: Record<string, (props: StyleProps) => SerializedStyles | string> =
  {
    badge: ({ theme }: StyleProps) =>
      css`
        background-color: ${theme?.colors.gray100};
        color: ${theme?.colors.gray700};
        text-transform: capitalize;
        letter-spacing: 1px;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        padding: 6px 12px;
        border-radius: 20px;
      `,
    bodyA: ({ theme }: StyleProps) =>
      css`
        color: ${theme?.colors.gray700};
        font-size: 16px;
        line-height: 24px;
      `,
    bodyB: ({ theme }: StyleProps) =>
      css`
        color: ${theme?.colors.gray550};
        font-size: 14px;
        line-height: 18px;
      `,
    bodyC: ({ theme }: StyleProps) =>
      css`
        color: ${theme?.colors.gray700};
        font-size: 14px;
        line-height: 22px;
      `,
    bodyD: ({ theme }: StyleProps) =>
      css`
        color: ${theme?.colors.gray700};
        font-size: 14px;
        line-height: 20px;
      `,
    clamp: ({ maxLines }: StyleProps) =>
      maxLines
        ? css`
            -webkit-line-clamp: ${maxLines};
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          `
        : '',
    command: ({ theme }: StyleProps) =>
      css`
        font-family: ${theme?.fonts.monospace};
        font-size: 13px;
        font-weight: 500;
        border-radius: ${theme?.radii.default};
        color: ${theme?.colors.gray700};
        background-color: ${theme?.colors.gray100};
        padding: 8px;
      `,
    description: ({ theme }: StyleProps) =>
      css`
        color: ${theme?.colors.gray950};
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
      `,
    ellipsis: () => css`
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    `,
    hero: ({ theme }: StyleProps) =>
      css`
        color: ${theme?.colors.gray950};
        font-size: 35px;
        line-height: 41px;
        margin-bottom: 72px;
      `,
    lead: ({ theme }: StyleProps) =>
      css`
        color: ${theme?.colors.gray950};
        font-size: 25px;
        line-height: 25px;
        margin-bottom: 0;
      `,
    'lead-block': () => css`
      margin-bottom: 16px;
      margin-top: 48px;
    `,
    'lead-text': () => css`
      margin-bottom: 24px;
    `,
    link: () => css`
      color: #3f6ed8;
      :hover {
        text-decoration: underline;
      }
    `,
    samplecode: ({ theme }: StyleProps) =>
      css`
        background-color: ${theme?.colors.gray100};
        color: ${theme?.colors.gray700};
        font-size: 12px;
        line-height: 16px;
        padding: 4px;
      `,
    tiny: ({ theme }: StyleProps) =>
      css`
        color: ${theme?.colors.gray550};
        font-size: 12px;
        line-height: 16px;
      `,
    title: ({ theme }: StyleProps) =>
      css`
        color: ${theme?.colors.gray950};
        font-size: 21px;
        line-height: 24px;
      `,
  }

type TypographyVariant = keyof typeof styles

const variantTags = {
  bodyA: 'p',
  bodyB: 'p',
  bodyC: 'p',
  bodyD: 'p',
  command: 'code',
  default: 'div',
  description: 'p',
  hero: 'h1',
  lead: 'h2',
  'lead-block': 'h2',
  'lead-text': 'h2',
  link: 'div',
  samplecode: 'code',
  tiny: 'small',
  title: 'h3',
}

const colorStyles = ({ theme, color }: { theme: Theme; color?: string }) =>
  color
    ? css`
        color: ${theme.colors[color as Color] ?? color};
      `
    : undefined

const variantStyles = ({
  theme,
  variant,
}: {
  theme: Theme
  variant: TypographyVariant
}) =>
  ['lead-block', 'lead-text'].includes(variant)
    ? css`
        ${styles.lead({ theme })}
        ${styles[variant]?.({ theme } as StyleProps)}
      `
    : css`
        ${styles[variant]?.({ theme } as StyleProps)}
      `

type StyledTextProps = {
  ellipsis?: boolean
  maxLines?: number
  variant: TypographyVariant
  as?: string | ElementType<unknown>
  onFocus?: (event: FocusEvent) => void
  onMouseEnter?: (event: MouseEvent) => void
} & XStyledProps

const StyledText = styled(Box, {
  shouldForwardProp: prop =>
    !['ellipsis', 'variant', 'maxLines', 'text'].includes(prop.toString()),
})<StyledTextProps>`
  color: ${({ theme }) => theme?.colors.gray700};
  font-weight: 400;
  margin-bottom: 0;
  margin-top: 0;

  ${variantStyles}
  ${colorStyles}

    ${({ ellipsis, theme }) =>
    ellipsis ? styles.ellipsis({ theme }) : undefined}
    ${({ maxLines }) => (maxLines ? styles.clamp({ maxLines }) : undefined)}
`

export const typographyVariants = Object.keys(variantTags)

type TypographyProps = {
  as?: string | ElementType<unknown>
  children: ReactNode
  ellipsis?: boolean
  maxLines?: number
  onFocus?: (event: FocusEvent) => void
  onMouseEnter?: (event: MouseEvent) => void
  tooltipProps?: Partial<TooltipProps>
  variant?: TypographyVariant
} & XStyledProps

const Text = forwardRef(
  (
    {
      onMouseEnter,
      onFocus,
      tooltipProps = {},
      variant = 'default',
      children,
      as,
      color,
      align,
      lineHeight,
      maxLines = 0,
      ellipsis = false,
      fontWeight,
      width,
      ...props
    }: TypographyProps,
    ref,
  ) => (
    <StyledText
      ref={ref as Ref<Element>}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      {...tooltipProps}
      {...props}
      width={width}
      as={
        as ||
        (variant && variant in variantTags
          ? variantTags[variant as keyof typeof variantTags]
          : undefined)
      }
      color={color}
      variant={variant}
      align={align}
      ellipsis={ellipsis}
      lineHeight={lineHeight}
      fontWeight={fontWeight}
      maxLines={maxLines}
    >
      {children}
    </StyledText>
  ),
)

const TextWithTooltip = ({ children, ...props }: TypographyProps) => {
  const isTruncated = useCallback((target = {}) => {
    // If the text is really truncated
    const { offsetWidth, scrollWidth } = target as {
      offsetWidth: number
      scrollWidth: number
    }

    return offsetWidth < scrollWidth
  }, [])

  const finalStringChildren = recursivelyGetChildrenString(children)

  return (
    <Tooltip text={finalStringChildren}>
      {({ onMouseEnter = () => {}, onFocus = () => {}, ...tooltipProps }) => (
        <Text
          {...props}
          onMouseEnter={(ev: MouseEvent) => {
            if (isTruncated(ev.currentTarget)) {
              onMouseEnter()
            }
          }}
          onFocus={(ev: FocusEvent) => {
            if (isTruncated(ev.currentTarget)) {
              onFocus()
            }
          }}
          tooltipProps={tooltipProps}
        >
          {children}
        </Text>
      )}
    </Tooltip>
  )
}

const Typography = forwardRef((props: TypographyProps, ref) => {
  const Component = props.ellipsis ? TextWithTooltip : Text

  return <Component ref={ref} {...props} />
})

Typography.propTypes = {
  align: PropTypes.string,
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  ellipsis: PropTypes.bool,
  fontWeight: PropTypes.number,
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxLines: PropTypes.number,
  onFocus: PropTypes.func,
  onMouseEnter: PropTypes.func,
  tooltipProps: PropTypes.shape({}),
  variant: PropTypes.oneOf(typographyVariants),
}

export default Typography
