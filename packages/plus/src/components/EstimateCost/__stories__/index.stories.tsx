import type { ComponentMeta } from '@storybook/react'
import { EstimateCost } from '..'
import { Item } from '../Components/Item'
import { LineThrough } from '../Components/LineThrough'
import { NumberInput } from '../Components/NumberInput'
import { Region } from '../Components/Region'
import { Regular } from '../Components/Regular'
import { Strong } from '../Components/Strong'
import { Unit } from '../Components/Unit'

export default {
  component: EstimateCost,
  subcomponents: {
    Item,
    LineThrough,
    Region,
    Regular,
    NumberInput,
    Strong,
    Unit,
  },
  title: 'Plus/Compositions/EstimateCost',
} as ComponentMeta<typeof EstimateCost>

export { Playground } from './Playground.stories'
export { DefaultLocales } from './DefaultLocales.stories'
export { Item } from './Item.stories'
export { Region } from './Region.stories'
export { NumberInput } from './NumberInput.stories'
export { Unit } from './Unit.stories'
export { GlobalDiscount } from './GlobalDiscount.stories'
export { LocalDiscount } from './LocalDiscount.stories'
export { Design } from './Design.stories'
