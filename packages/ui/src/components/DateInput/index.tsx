import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { ReactDatePickerProps } from 'react-datepicker'
import DatePicker, { registerLocale } from 'react-datepicker'
import style from 'react-datepicker/dist/react-datepicker.min.css'
import { Button } from '../Button'
import { Separator } from '../Separator'
import { Text } from '../Text'
import { TextInput } from '../TextInput'

const PREFIX = '.react-datepicker'

const StyledSeparator = styled(Separator)`
  margin: 0 ${({ theme }) => theme.space['1']};
  height: 100%;
`

const StyledWrapper = styled.div`
  width: 100%;

  div${PREFIX}-wrapper {
    display: block;
  }
  div${PREFIX}__input-container {
    display: block;
  }
  div${PREFIX}__triangle {
    display: none;
  }
  div${PREFIX}__month-container {
    padding: 16px;
  }

  ${PREFIX}-popper {
    z-index: 1000;
  }
  .calendar {
    font-family: 'Asap';
    border-color: ${({ theme }) => theme.colors.neutral.borderWeak};
    background-color: ${({ theme }) =>
      theme.colors.neutral.backgroundWeakElevated};

    ${PREFIX}__header {
      color: ${({ theme }) => theme.colors.neutral.text};
      background-color: ${({ theme }) =>
        theme.colors.neutral.backgroundWeakElevated};
      border-bottom: none;
      text-align: inherit;
      display: block;
      padding-top: 0;
      position: inherit;
    }

    ${PREFIX}__triangle {
      border-bottom-color: ${({ theme }) =>
        theme.colors.neutral.backgroundWeak};
    }
    ${PREFIX}__month {
      margin: 0;
    }

    ${PREFIX}__day-names {
      margin-top: 8px;
    }

    ${PREFIX}__day-name {
      font-family: 'Asap';
      color: ${({ theme }) => theme.colors.neutral.text};
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      margin: 3px;
      text-transform: capitalize;
    }

    ${PREFIX}__day {
      color: ${({ theme }) => theme.colors.neutral.textWeak};
      font-size: 16px;
      width: 1.7rem;
      height: 1.7rem;
      margin-left: 3px;
      margin-right: 3px;
    }

    ${PREFIX}__day--selected {
      color: ${({ theme }) => theme.colors.primary.text};
      background-color: ${({ theme }) => theme.colors.primary.background};
      border-radius: ${({ theme }) => theme.radii.circle};
    }
    ${PREFIX}__day--keyboard-selected {
      color: ${({ theme }) => theme.colors.primary.text};
      background-color: ${({ theme }) => theme.colors.primary.background};
      border-radius: ${({ theme }) => theme.radii.circle};
    }

    ${PREFIX}__day: hover {
      color: ${({ theme }) => theme.colors.primary.text};
      border-radius: ${({ theme }) => theme.radii.circle};
      background-color: ${({ theme }) => theme.colors.primary.background};
    }

    ${PREFIX}__day--disabled {
      color: ${({ theme }) => theme.colors.primary.textStrongDisabled};
    }

    ${PREFIX}__day--disabled: hover {
      color: ${({ theme }) => theme.colors.primary.textStrongDisabled};
      background-color: transparent;
    }
  }
`

const StyledSpan = styled.span`
  position: absolute;
  right: 16px;
  top: 16px;
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
`

const StyledIconContainer = styled.div`
  padding: ${({ theme }) => theme.space['1']};
  position: absolute;
  display: flex;
  align-items: center;
  right: 0;
  top: 0;
  height: 48px;
`

const TopHeaderDiv = styled.div`
  margin-bottom: 8px;
  margin-left: 8px;
  display: inline-block;
  background-color: ${({ theme }) =>
    theme.colors.neutral.backgroundWeakElevated};
`

const StyledText = styled(Text)`
  text-transform: capitalize;
  margin-right: ${({ theme }) => theme.space['1']};
`

type DateInputProps = Pick<
  ReactDatePickerProps<string>,
  | 'autoFocus'
  | 'disabled'
  | 'locale'
  | 'maxDate'
  | 'minDate'
  | 'name'
  | 'onBlur'
  | 'onChange'
  | 'onFocus'
  | 'required'
> & {
  error?: string
  format?: (value?: Date | string) => string | undefined
  /**
   * Label of the field
   */
  label?: string
  value?: Date | string
  className?: string
  'data-testid'?: string
}

const DEFAULT_FORMAT: DateInputProps['format'] = value =>
  value instanceof Date ? value.toISOString() : value

export const DateInput = ({
  autoFocus = false,
  disabled = false,
  error,
  format = DEFAULT_FORMAT,
  label,
  locale,
  maxDate,
  minDate,
  name,
  onBlur,
  onChange,
  onFocus,
  required = false,
  value,
  className,
  'data-testid': dataTestId,
}: DateInputProps) => {
  // Linked to: https://github.com/Hacker0x01/react-datepicker/issues/3834
  const ReactDatePicker =
    (DatePicker as unknown as { default: typeof DatePicker }).default ??
    DatePicker

  const localeCode =
    (typeof locale === 'string' ? locale : locale?.code) ?? 'en-GB'

  if (typeof locale === 'object') {
    registerLocale(localeCode, locale)
  }

  return (
    <>
      <Global styles={style} />
      <StyledWrapper>
        <ReactDatePicker
          data-testid={dataTestId}
          className={className}
          autoFocus={autoFocus}
          fixedHeight
          name={name}
          locale={localeCode}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          selected={value ? new Date(value) : undefined}
          customInput={
            <div>
              <TextInput
                error={error ? `${error}` : undefined}
                id={`date-input${name ? `-${name}` : ''}`}
                label={label}
                value={format(value) || ''}
                disabled={disabled}
              />
              <StyledIconContainer>
                {required ? (
                  <Icon name="asterisk" color="danger" size={8} />
                ) : null}
                <StyledSeparator direction="vertical" />
                <Icon
                  name="calendar-range"
                  color={error ? 'danger' : 'neutral'}
                  size={24}
                />
              </StyledIconContainer>
            </div>
          }
          disabled={disabled}
          calendarClassName="calendar"
          minDate={minDate}
          maxDate={maxDate}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <>
              <TopHeaderDiv>
                <StyledText variant="body" as="p">
                  {new Date(date).toLocaleString(localeCode, {
                    month: 'long',
                    year: 'numeric',
                  })}
                </StyledText>
              </TopHeaderDiv>
              <StyledSpan>
                <Button
                  size="small"
                  icon="arrow-left"
                  sentiment="neutral"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                />
                <Button
                  size="small"
                  icon="arrow-right"
                  sentiment="neutral"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                />
              </StyledSpan>
            </>
          )}
        />
      </StyledWrapper>
    </>
  )
}
