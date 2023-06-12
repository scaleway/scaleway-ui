import type { StoryFn } from '@storybook/react'
import { BarChart } from '..'
import { barChartSimpleData } from './mockData'

export const Template: StoryFn<typeof BarChart> = ({ ...props }) => (
  <BarChart data={barChartSimpleData} {...props} />
)
