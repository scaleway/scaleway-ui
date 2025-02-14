import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import type { Color } from '../../theme'
import { Label } from '../Label'
import { Stack } from '../Stack'
import { Text } from '../Text'

const shineAnimation = keyframes`
  from {
    left: -25%;
  }

  to {
    left: 100%;
  }
`

export const progressBarSentiments = [
  'primary',
  'success',
  'warning',
  'info',
  'danger',
] as const

const StyledProgressContainer = styled.div`
  overflow: hidden;
  position: relative;
  height: ${({ theme }) => theme.sizing['050']};
  margin-left: 0;
  margin-right: 0;
  border-radius: ${({ theme }) => theme.radii.default};
  background-color: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  width: 100%;
`
const StyledStack = styled(Stack)`
  width: fit-content;
`
const StyledText = styled(Text)`
  width: max-content;
`
const StyledProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 25%;
  opacity: 0.8;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  animation: ${shineAnimation} 1s linear infinite;
`

const StyledFilled = styled('div', {
  shouldForwardProp: prop => !['sentiment', 'percentageValue'].includes(prop),
})<{ sentiment: string; percentageValue: number }>`
  border-radius: ${({ theme }) => theme.radii.default};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: ${({ theme, sentiment }) =>
    theme.colors[sentiment as Color].backgroundStrong ?? 'inherit'};
  transition: 0.3s width;
  width: ${({ percentageValue }) => percentageValue}%;
`

type ProgressBarProps = {
  sentiment?: (typeof progressBarSentiments)[number]
  value?: number
  showProgress?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  max?: number
  label?: string
  labelDescription?: ReactNode
  direction?: 'column' | 'row'
  /** Put ProgressBar in a loading state */
  progress?: boolean
  className?: string
  'data-testid'?: string
  'aria-labelledby'?: string
  'aria-label'?: string
}

/**
 * Progress bar component to display progress of a task. Can be used to display progress of a form or a loading state.
 */
export const ProgressBar = ({
  progress = false,
  value = 0,
  sentiment = 'primary',
  className,
  'data-testid': dataTestId,
  showProgress = false,
  prefix,
  suffix = '%',
  max = 100,
  label,
  labelDescription,
  direction = 'column',
  'aria-labelledby': ariaLabelledBy,
  'aria-label': ariaLabel,
}: ProgressBarProps) => (
  <Stack
    gap={direction === 'column' ? 1 : 2}
    direction={direction}
    alignItems="center"
  >
    {direction === 'column' && (label || showProgress) ? (
      <Stack
        direction="row"
        justifyContent={!label && showProgress ? 'right' : 'space-between'}
        width="100%"
      >
        <Label labelDescription={labelDescription} size="medium">
          {label}
        </Label>
        {showProgress ? (
          <Text
            as="label"
            variant="bodySmall"
            sentiment="neutral"
            placement="right"
          >
            {prefix}
            {suffix === '%'
              ? (100 * Math.max(0, Math.min(max, value))) / max
              : Math.max(0, Math.min(max, value))}
            {suffix}
          </Text>
        ) : null}
      </Stack>
    ) : null}
    <Label labelDescription={labelDescription} size="medium">
      {label}
    </Label>

    <StyledProgressContainer
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={className}
      data-testid={dataTestId}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
    >
      {progress ? (
        <StyledProgress />
      ) : (
        <StyledFilled
          sentiment={sentiment}
          percentageValue={(100 * Math.max(0, Math.min(max, value))) / max}
        />
      )}
    </StyledProgressContainer>
    {showProgress && direction === 'row' ? (
      <StyledStack direction="row" gap={1}>
        <StyledText as="label" variant="bodySmall" sentiment="neutral">
          {prefix}
          {suffix === '%'
            ? (100 * Math.max(0, Math.min(max, value))) / max
            : Math.max(0, Math.min(max, value))}
          {suffix}
        </StyledText>
      </StyledStack>
    ) : null}
  </Stack>
)
