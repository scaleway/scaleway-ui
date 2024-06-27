import { screen, waitFor } from '@testing-library/react'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import type { ComponentProps } from 'react'
import { describe, expect, test } from 'vitest'
import { Navigation, NavigationProvider } from '..'

type BasicNavigationProps = Pick<
  ComponentProps<typeof NavigationProvider>,
  'pinnedFeature'
>

const BasicNavigation = ({ pinnedFeature = true }: BasicNavigationProps) => (
  <NavigationProvider pinnedFeature={pinnedFeature}>
    <Navigation logo={<p>Logo</p>}>
      <Navigation.PinnedItems />
      <Navigation.Separator />
      <Navigation.Group label="Products">
        <Navigation.Item
          label="item1"
          id="item1"
          categoryIcon="useCase"
          categoryIconVariant="neutral"
          noPinButton
          active
        />
        <Navigation.Item
          label="item1"
          id="item1"
          categoryIcon="useCase"
          categoryIconVariant="neutral"
        />
      </Navigation.Group>
      {/* @ts-expect-error we try to test whe no children is provided */}
      <Navigation.Group label="Empty Group" />
    </Navigation>
  </NavigationProvider>
)

describe('Navigation', () => {
  test('render with basic content', () =>
    shouldMatchEmotionSnapshot(<BasicNavigation />))

  test('render without pinnedFeature', () =>
    shouldMatchEmotionSnapshot(<BasicNavigation pinnedFeature={false} />))

  test('click on expand / collapse button', () => {
    const { asFragment } = renderWithTheme(<BasicNavigation />)

    expect(asFragment()).toMatchSnapshot()

    const expandButton = screen.getByRole('button', {
      name: 'Toggle navigation expand/collapse',
    })
    expandButton.click()

    expect(asFragment()).toMatchSnapshot()
  })

  test('resize manually the navigation using slider', () => {
    const { asFragment } = renderWithTheme(<BasicNavigation />)

    const slider = screen.getByTestId('slider')

    const mouseEventExtend = new MouseEvent('mousedown', {
      clientX: 100,
    })

    slider.dispatchEvent(mouseEventExtend)

    expect(asFragment()).toMatchSnapshot()
  })

  test('pin and unpin an item', async () => {
    const { asFragment } = renderWithTheme(<BasicNavigation />)

    expect(screen.getByText('You have no pinned items.')).toBeInTheDocument()

    const pinButton = screen.getAllByRole('button', {
      name: 'pin',
    })[0]

    pinButton.click()
    expect(asFragment()).toMatchSnapshot()

    const pinnedGroup = screen.getByTestId('pinned-group')
    pinnedGroup.click()

    expect(asFragment()).toMatchSnapshot()

    await waitFor(() => {
      expect(
        screen.getAllByRole('button', {
          name: 'unpin',
        })[0],
      ).toBeInTheDocument()
    })

    const unpinButton = screen.getAllByRole('button', {
      name: 'unpin',
    })[0]

    unpinButton.click()
    expect(asFragment()).toMatchSnapshot()
  })
})
