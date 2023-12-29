import styled from '@emotion/styled'
import { useState } from 'react'
import {
  Submit,
  TextInputField,
  useFieldArray,
  useFormContext,
  useFormState,
  // eslint-disable-next-line import/no-relative-packages
} from '../../../../../../form/src'
import { Button, Row, Stack, Text, Tooltip } from '../../../../components'
import { INITIAL_VALUES, hexadecimalColorRegex } from '../contants'

const CapitalizeText = styled(Text)`
  &::first-letter {
    text-transform: capitalize;
  }
`

const StyledRow = styled(Row)`
  width: 100%;
`

export const FormContent = () => {
  const [confirmResetForm, setConfirmResetForm] = useState(false)
  const { fields, remove } = useFieldArray<typeof INITIAL_VALUES>({
    name: 'sentiments',
  })
  const { errors } = useFormState()
  const { reset } = useFormContext<typeof INITIAL_VALUES>()

  return (
    <Stack gap={6}>
      <Stack gap={1} direction="row">
        <Stack gap={1} flex={1}>
          <CapitalizeText
            variant="bodyStrong"
            as="label"
            htmlFor="sentiment_neutral"
          >
            Neutral sentiment name
          </CapitalizeText>
          <Tooltip text="Neutral sentiment name cannot be changed as it is essential for the theme to work.">
            <Stack flex={1}>
              <TextInputField
                name="sentiment_neutral"
                id="sentiment_neutral"
                placeholder="neutral"
                noTopLabel
                disabled
                required
              />
            </Stack>
          </Tooltip>
        </Stack>
        <Stack gap={1} flex={1}>
          <CapitalizeText
            variant="bodyStrong"
            as="label"
            htmlFor="sentiment_neutral_value"
          >
            Neutral sentiment value
          </CapitalizeText>
          <Tooltip text="Neutral sentiment value cannot be changed as it is essential for the theme to work.">
            <Stack flex={1}>
              <TextInputField
                name="sentiment_neutral_value"
                id="sentiment_neutral_value"
                placeholder="#FFFFFF"
                noTopLabel
                disabled
                required
              />
            </Stack>
          </Tooltip>
        </Stack>
      </Stack>

      {fields.map((field, index) => {
        const isRequiredSentiment = field.required
        const countRequiredSentiments = fields.filter(
          ({ required }) => required,
        ).length
        console.log({ errors })

        return (
          <Stack gap={1} direction="row" key={field.id}>
            <Stack gap={1} flex={1}>
              <CapitalizeText
                variant="bodyStrong"
                as="label"
                htmlFor={`sentiments.${index}.key`}
              >
                {isRequiredSentiment
                  ? `${field.key} sentiment name`
                  : `Additional sentiment ${
                      index - countRequiredSentiments + 1
                    } name`}
              </CapitalizeText>
              <Tooltip
                text={
                  isRequiredSentiment
                    ? 'This sentiment name cannot be changed as it is essential for the theme to work. But you can change the value of it.'
                    : undefined
                }
              >
                <Stack flex={1}>
                  <TextInputField
                    name={`sentiments.${index}.key`}
                    id={`sentiments.${index}.key`}
                    placeholder="neutral"
                    noTopLabel
                    disabled={isRequiredSentiment}
                    required
                  />
                </Stack>
              </Tooltip>
            </Stack>
            <Stack gap={1} flex={1}>
              <CapitalizeText
                variant="bodyStrong"
                as="label"
                htmlFor={`sentiments.${index}.value`}
              >
                {isRequiredSentiment
                  ? `${field.key} sentiment value`
                  : `Additional sentiment ${
                      index - countRequiredSentiments + 1
                    } value`}
              </CapitalizeText>
              <Stack gap={1} alignItems="center" direction="row">
                <StyledRow templateColumns="9fr 1fr" gap={1}>
                  <TextInputField
                    name={`sentiments.${index}.value`}
                    id={`sentiments.${index}.value`}
                    placeholder="#FFFFFF"
                    noTopLabel
                    rules={{
                      pattern: hexadecimalColorRegex,
                    }}
                    valid={
                      // @ts-expect-error get field array error
                      !errors['sentiments']?.[index]
                    }
                  />
                  <TextInputField
                    name={`sentiments.${index}.value`}
                    id={`sentiments.${index}.value`}
                    placeholder="#FFFFFF"
                    noTopLabel
                    type="color"
                    rules={{
                      pattern: hexadecimalColorRegex,
                    }}
                  />
                </StyledRow>
                {!isRequiredSentiment ? (
                  <Button
                    icon="close"
                    variant="filled"
                    sentiment="neutral"
                    size="large"
                    onClick={() => remove(index)}
                  />
                ) : null}
              </Stack>
            </Stack>
          </Stack>
        )
      })}
      <Stack gap={2}>
        <Stack>
          {confirmResetForm ? (
            <Row gap={1} templateColumns="1fr 1fr">
              <Button
                sentiment="danger"
                variant="outlined"
                icon="close"
                onClick={() => {
                  setConfirmResetForm(false)
                }}
              >
                Cancel
              </Button>
              <Button
                sentiment="success"
                variant="outlined"
                icon="check"
                onClick={() => {
                  setConfirmResetForm(false)
                  reset(INITIAL_VALUES)
                }}
              >
                Confirm
              </Button>
            </Row>
          ) : (
            <Button
              sentiment="danger"
              variant="outlined"
              icon="restore"
              onClick={() => {
                setConfirmResetForm(true)
              }}
            >
              Reset
            </Button>
          )}
        </Stack>
        <Submit>Generate</Submit>
      </Stack>
    </Stack>
  )
}
