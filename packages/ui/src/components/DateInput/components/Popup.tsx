import styled from '@emotion/styled'
import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import { useContext, useEffect, useRef } from 'react'
import { Button } from '../../Button'
import { Popup } from '../../Popup'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { DateInputContext } from '../Context'
import { POPUP_WIDTH } from '../constants'
import { getNextMonth, getPreviousMonth } from '../helpers'
import { Daily } from './CalendarDaily'
import { Monthly } from './CalendarMonthly'

const CapitalizedText = styled(Text)`
  display: inline-block;
  text-transform: lowercase;

  &::first-letter {
    text-transform: uppercase;
  }
`
type PopupProps = {
  children: ReactNode
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  refInput: RefObject<HTMLInputElement | null>
}

const StyledPopup = styled(Popup)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.other.elevation.background.raised};
  color: ${({ theme }) => theme.colors.neutral.text};
  box-shadow: ${({ theme }) => `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`};
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.radii.default};
`

const handleClickOutside = (
  event: MouseEvent,
  ref: RefObject<HTMLDivElement | null>,
  setVisible: Dispatch<SetStateAction<boolean>>,
  refInput: RefObject<HTMLInputElement | null>,
) => {
  if (
    ref.current &&
    !ref.current.contains(event.target as Node) &&
    !refInput.current?.contains(event.target as Node)
  ) {
    setVisible(false)
  }
}

const PopupContent = () => {
  const {
    showMonthYearPicker,
    disabled,
    monthToShow,
    yearToShow,
    setMonthToShow,
    setYearToShow,
    maxDate,
    minDate,
    MONTHS_ARR,
  } = useContext(DateInputContext)

  return (
    <Stack gap={2}>
      <Stack direction="row" width="100%" justifyContent="space-between">
        <Button
          icon="arrow-left"
          data-testid="previous-month"
          variant="ghost"
          sentiment="neutral"
          size="xsmall"
          onClick={() => {
            if (
              !minDate ||
              minDate <= new Date(yearToShow, monthToShow - 1, 0)
            ) {
              if (!showMonthYearPicker) {
                const [prevMonth, year] = getPreviousMonth(
                  monthToShow,
                  yearToShow,
                )
                setMonthToShow(prevMonth)
                setYearToShow(year)
              } else {
                setYearToShow(yearToShow - 1)
              }
            }
          }}
          disabled={
            !!(minDate && minDate > new Date(yearToShow, monthToShow - 1, 0))
          }
        />
        <CapitalizedText as="span" variant="bodyStrong" sentiment="neutral">
          {!showMonthYearPicker ? MONTHS_ARR[monthToShow - 1] : null}{' '}
          {yearToShow}
        </CapitalizedText>
        <Button
          icon="arrow-right"
          data-testid="next-month"
          variant="ghost"
          sentiment="neutral"
          size="xsmall"
          onClick={() => {
            if (!maxDate || maxDate >= new Date(yearToShow, monthToShow, 1)) {
              if (!showMonthYearPicker) {
                const [monthNext, year] = getNextMonth(monthToShow, yearToShow)
                setMonthToShow(monthNext)
                setYearToShow(year)
              } else {
                setYearToShow(yearToShow + 1)
              }
            }
          }}
          disabled={
            !!(maxDate && maxDate < new Date(yearToShow, monthToShow, 1))
          }
        />
      </Stack>
      {showMonthYearPicker ? (
        <Monthly disabled={disabled} />
      ) : (
        <Daily disabled={disabled} />
      )}
    </Stack>
  )
}

export const CalendarPopup = ({
  children,
  visible,
  setVisible,
  refInput,
}: PopupProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener('mousedown', event =>
      handleClickOutside(event, ref, setVisible, refInput),
    )

    return () =>
      document.removeEventListener('mousedown', event =>
        handleClickOutside(event, ref, setVisible, refInput),
      )
  }, [ref, setVisible, refInput])

  return (
    <StyledPopup
      visible={visible}
      text={<PopupContent />}
      placement="bottom"
      ref={ref}
      hasArrow={false}
      tabIndex={0}
      role="dialog"
      debounceDelay={0}
      maxWidth={POPUP_WIDTH}
      disableAnimation
      align="start"
    >
      {children}
    </StyledPopup>
  )
}
