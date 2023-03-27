import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Carousel } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'

describe('Carousel', () => {
  test(`renders correctly with default props`, () =>
    shouldMatchEmotionSnapshot(
      <Carousel>
        <Carousel.Item>Item 1</Carousel.Item>
        <Carousel.Item>Item 2</Carousel.Item>
        <Carousel.Item>Item 3</Carousel.Item>
        <Carousel.Item>Item 4</Carousel.Item>
        <Carousel.Item>Item 5</Carousel.Item>
        <Carousel.Item>Item 6</Carousel.Item>
      </Carousel>,
    ))

  test('check hover state on scrollbar', async () => {
    renderWithTheme(
      <Carousel>
        <Carousel.Item>Item 1</Carousel.Item>
        <Carousel.Item>Item 2</Carousel.Item>
        <Carousel.Item>Item 3</Carousel.Item>
        <Carousel.Item>Item 4</Carousel.Item>
        <Carousel.Item>Item 5</Carousel.Item>
        <Carousel.Item>Item 6</Carousel.Item>
      </Carousel>,
    )

    const scrollbarBefore =
      screen.getByTestId<HTMLInputElement>('scrollbar-before')
    const scrollbarAfter =
      screen.getByTestId<HTMLInputElement>('scrollbar-after')
    await userEvent.hover(scrollbarBefore)
    await userEvent.hover(scrollbarAfter)
  })
})
