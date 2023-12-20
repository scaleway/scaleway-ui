import styled from '@emotion/styled'
import { TextInput } from '@ultraviolet/ui'
import { useEffect, useState } from 'react'
import { useOverlay } from '../OverlayContext'
import { ItemResourceName } from '../componentStyle'
import { Regular } from './Regular'

const StyledTextInput = styled(TextInput)`
  /* Removes arrows for an input type number */
  /* Chrome, Safari, Edge, Opera */

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */

  input[type='number'] {
    -moz-appearance: textfield;
  }
`

type UnitProps = {
  amount?: number
  itemCallback?: (amount?: number, isVariant?: boolean) => void
  getAmountValue?: (amount?: number) => void
  unit?: string
}

export const Unit = ({
  amount,
  itemCallback,
  getAmountValue,
  unit,
}: UnitProps) => {
  const { isOverlay } = useOverlay()
  const [capacity, setCapacity] = useState(amount === 0 ? undefined : amount)

  useEffect(() => {
    itemCallback?.(capacity, true)
    getAmountValue?.(capacity)
  }, [getAmountValue, itemCallback, capacity])

  return isOverlay ? (
    <ItemResourceName animated={false}>
      <Regular>{capacity}</Regular>
    </ItemResourceName>
  ) : (
    <div style={{ width: '150px' }}>
      <StyledTextInput
        type="number"
        size="small"
        unit={unit}
        placeholder="00"
        name="capacity"
        value={capacity?.toString()}
        onChange={capacityText => {
          setCapacity(Number(capacityText) < 0 ? 0 : Number(capacityText))
          getAmountValue?.(capacity)
        }}
      />
    </div>
  )
}
