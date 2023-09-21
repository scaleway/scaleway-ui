import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { DatumValue } from '@nivo/core'
import type { Serie } from '@nivo/line'
import type { ComponentProps } from 'react'
import { getLegendColor } from '../../helpers/legend'
import { Checkbox } from '../Checkbox'
import { Text } from '../Text'
import { getAverage, getCurrent, getMax, getMin, getSelected } from './helpers'

const styles = {
  body: (theme: Theme) => css`
    > :not(:last-child) {
      border-bottom: 1px solid ${theme.colors.neutral.backgroundStrong};
    }
  `,
  head: (theme: Theme) => css`
    display: flex;
    padding-bottom: 8px;
    border-bottom: 1px solid ${theme.colors.neutral.backgroundStrong};

    > :not(:last-child) {
      margin-right: 8px;
    }
  `,
  legend: (index: number) => (theme: Theme) => css`
    margin-left: 16px;
    width: 32px;
    height: 2px;
    background-color: ${getLegendColor(theme)[index]};
  `,
  row: css`
    display: flex;
    padding: 4px 0;
    > :not(:last-child) {
      margin-right: 8px;
    }
  `,
}

type CellProps = {
  value?: DatumValue
  variant: ComponentProps<typeof Text>['variant']
}

const StyledText = styled(Text)`
  text-align: right;
  flex: 1;
  min-width: 72px;
  align-self: center;
`

const Cell = ({ value, variant }: CellProps) => (
  <StyledText variant={variant} color="neutral" as="span">
    {value as string | number}
  </StyledText>
)

const CellValueContainer = styled.div`
  display: flex;
  align-items: center;
`

const LongContainer = styled.div`
  display: flex;
  flex: 6;
`

type Transformer = (value: DatumValue) => string

const noop: Transformer = value => value.toString()

type CustomLegendProps = {
  axisTransformer?: Transformer
  data?: Serie[]
  selected: string[]
  setSelected: (selected: string[]) => void
  className?: string
  'data-testid'?: string
}

const StyledContainer = styled.div`
  margin-top: ${({ theme }) => theme.space[2]};
`

export const CustomLegend = ({
  axisTransformer = noop,
  data,
  selected,
  setSelected,
  className,
  'data-testid': dataTestId,
}: CustomLegendProps) => (
  <StyledContainer className={className} data-testid={dataTestId}>
    {/* @ts-expect-error todo */}
    <div css={styles.head}>
      <LongContainer>Legend</LongContainer>
      <Cell variant="body" value="Minimum" />
      <Cell variant="body" value="Maximum" />
      <Cell variant="body" value="Average" />
      <Cell variant="body" value="Current" />
    </div>
    {/* @ts-expect-error todo */}
    <div css={styles.body}>
      {data?.map((row, index) => {
        const values = row.data.map(val => val.y as number)
        const labelIndexed = `${row.id}${index}`
        const id = row.id.toString()

        return (
          <div key={labelIndexed} css={styles.row}>
            <LongContainer>
              <Checkbox
                checked={selected.includes(labelIndexed)}
                name={id}
                onChange={() =>
                  setSelected([...getSelected(id, index, selected)])
                }
              >
                <CellValueContainer>
                  <Text as="span" variant="bodySmall" color="neutral">
                    {row?.['label']}
                  </Text>
                  {/* @ts-expect-error todo */}
                  <div data-testid={`label-${id}`} css={styles.legend(index)} />
                </CellValueContainer>
              </Checkbox>
            </LongContainer>
            <Cell variant="bodySmall" value={axisTransformer(getMin(values))} />
            <Cell variant="bodySmall" value={axisTransformer(getMax(values))} />
            <Cell
              variant="bodySmall"
              value={axisTransformer(getAverage(values))}
            />
            <Cell
              variant="bodySmall"
              value={axisTransformer(getCurrent(values))}
            />
          </div>
        )
      })}
    </div>
  </StyledContainer>
)
