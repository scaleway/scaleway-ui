import { beforeAll, describe, jest, test } from '@jest/globals'
import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PieChart } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'
import {
  data,
  dataWithLegends,
  dataWithLegendsAndDetails,
  dataWithLegendsDetailsAndDiscount,
} from '../__stories__/mockData'

describe('PieChart', () => {
  beforeAll(() => {
    // Have to mock ResizeObserver as Nivo doesn't add automatically ResizeObserver polyfill anymore (v0.79.0)
    global.ResizeObserver = jest.fn<any>().mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    }))
  })

  test('renders correctly with no props', () =>
    shouldMatchEmotionSnapshot(<PieChart />))

  test('renders correctly with data', () =>
    shouldMatchEmotionSnapshot(<PieChart data={data} />))

  test('renders correctly with data and content', () =>
    shouldMatchEmotionSnapshot(<PieChart data={data} content="Test" />))

  test('renders correctly with legend', () =>
    shouldMatchEmotionSnapshot(<PieChart data={dataWithLegends} withLegend />))

  test('renders correctly with detailed legend', () =>
    shouldMatchEmotionSnapshot(
      <PieChart data={dataWithLegendsAndDetails} withLegend />,
    ))

  test('renders correctly with detailed legend and discount', () =>
    shouldMatchEmotionSnapshot(
      <PieChart data={dataWithLegendsDetailsAndDiscount} withLegend />,
    ))

  test('renders correctly with empty legend placeholder', () =>
    shouldMatchEmotionSnapshot(
      <PieChart withLegend emptyLegend="I am a legend" />,
    ))

  test('renders correctly when chart is hovered', async () => {
    const { container } = renderWithTheme(
      <PieChart data={dataWithLegendsAndDetails} withLegend />,
    )
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const slice = container.querySelector('svg g path')
    if (!slice) throw new Error('PieChart slice path not found')
    await userEvent.unhover(slice)
    await userEvent.hover(slice)
  })

  test('renders correctly when legend is hovered', () =>
    shouldMatchEmotionSnapshot(
      <PieChart data={dataWithLegendsAndDetails} withLegend />,
      {
        transform: async () => {
          const id = `chart-legend-${dataWithLegendsAndDetails[0].id}`
          await userEvent.unhover(screen.getByTestId(id))
          await userEvent.hover(screen.getByTestId(id))
        },
      },
    ))

  test('renders correctly when legend is focused', () =>
    shouldMatchEmotionSnapshot(
      <PieChart data={dataWithLegendsAndDetails} withLegend />,
      {
        transform: () => {
          const id = `chart-legend-${dataWithLegendsAndDetails[0].id}`
          fireEvent.blur(screen.getByTestId(id))
          fireEvent.focus(screen.getByTestId(id))
        },
      },
    ))
})
