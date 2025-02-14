import type { ReactNode } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'

type LabelProps = {
  children?: string
  labelDescription?: ReactNode
  required?: boolean
  size?: 'small' | 'medium' | 'large'
  htmlFor?: string
  id?: string
}

/**
 * Label is used inside all of our input components, but it can be used outside for design purposes
 */
export const Label = ({
  children,
  labelDescription,
  required,
  size = 'large',
  htmlFor,
  id,
}: LabelProps) => {
  const LabelRequiredOrNot = () =>
    required ? (
      <Stack direction="row" gap="0.5" alignItems="start">
        <Text
          as="label"
          id={id}
          variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
          sentiment="neutral"
          htmlFor={htmlFor}
          prominence="strong"
        >
          {children}
        </Text>
        <Text
          as="label"
          variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
          sentiment="danger"
          htmlFor={htmlFor}
        >
          *
        </Text>
      </Stack>
    ) : (
      <Text
        as="label"
        id={id}
        variant={size === 'large' ? 'bodyStrong' : 'bodySmallStrong'}
        sentiment="neutral"
        htmlFor={htmlFor}
        prominence="strong"
      >
        {children}
      </Text>
    )

  return labelDescription ? (
    <Stack direction="row" gap="1" alignItems="center">
      <LabelRequiredOrNot />
      {typeof labelDescription === 'string' ? (
        <Text as="label" variant="bodySmall">
          {labelDescription}
        </Text>
      ) : (
        labelDescription
      )}
    </Stack>
  ) : (
    <LabelRequiredOrNot />
  )
}
