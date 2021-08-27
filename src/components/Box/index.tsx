import { Interpolation, Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { x } from '@xstyled/emotion'
import PropTypes from 'prop-types'
import React, {
  AllHTMLAttributes,
  ElementType,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  forwardRef,
} from 'react'

export interface XStyledProps {
  align?: string
  alignItems?: string
  alignSelf?: string
  as?: string | React.ElementType<unknown>
  backgroundColor?: string
  borderRadius?: string | number
  boxShadow?: string
  color?: string
  display?: string
  flexWrap?: string
  fontSize?: number
  fontWeight?: number
  justifyContent?: string
  lineHeight?: string | number
  maxWidth?: string | number
  m?: string | number
  mb?: string | number
  ml?: string | number
  mr?: string | number
  mt?: string | number
  mx?: string | number
  my?: string | number
  overflow?: string
  p?: string | number
  pb?: string | number
  pl?: string | number
  position?: string
  pr?: string | number
  pt?: string | number
  px?: string | number
  py?: string | number
  verticalAlign?: string
  width?: string | number

  // HTMLAnchorElement.rel
  rel?: string
  // HTMLAnchorElement.target
  target?: string
}

const borderedStyles = ({ theme }: { theme: Theme }) => css`
  padding: ${theme.space['3']};
  border-radius: ${theme.radii.default};
  border: 1px solid ${theme.colors.gray350};
`

const StyledBox = styled(x.div, {
  shouldForwardProp: prop => !['bordered'].includes(prop.toString()),
})<{ bordered?: boolean }>`
  ${({ bordered }) => (bordered ? borderedStyles : null)}
`

export type BoxProps = {
  bordered?: boolean
  children?: ReactNode
  height?: number | string
  width?: number | string
} & Omit<AllHTMLAttributes<HTMLElement>, 'as' | 'size' | 'action'> &
  XStyledProps & {
    css?: Interpolation<Theme>
  }

const forwardType = forwardRef<Element, BoxProps>(() => null)

type BoxType = typeof forwardType & {
  withComponent: (
    element: string | ElementType<unknown>,
  ) => FunctionComponent<BoxProps>
}

// @ts-expect-error We add withComponent just below
const Box: BoxType = forwardRef<
  Element | HTMLInputElement | HTMLButtonElement,
  BoxProps
>(({ width, height, bordered = false, ...props }, ref) => (
  // @ts-expect-error As we won't know the Element kind we can't assume that Ref will be a Element
  <StyledBox ref={ref} w={width} h={height} bordered={bordered} {...props} />
))

Box.withComponent =
  (element: string | ElementType<unknown>): FunctionComponent<BoxProps> =>
  props =>
    <Box as={element} {...props} />

Box.propTypes = {
  bordered: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Box
