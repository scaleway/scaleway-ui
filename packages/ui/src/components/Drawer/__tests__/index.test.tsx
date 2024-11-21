import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { consoleLightTheme } from '@ultraviolet/themes'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshotWithPortal,
} from '@utils/test'
import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { Drawer } from '..'

const mockOnClick = vi.fn()

describe('Drawer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  test(`renders with default Props`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer disclosure={<button type="button">Test</button>} title="title">
        <div>test</div>
      </Drawer>,
    ))

  test(`renders without disclosure`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer disclosure={undefined} title="title">
        <div>test</div>
      </Drawer>,
    ))

  test(`renders with default Props and function children`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer title="title">{() => <div>test</div>}</Drawer>,
    ))

  test(`renders with default Props and function children open`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer title="title" open>
        {() => <div>test</div>}
      </Drawer>,
    ))

  test(`renders with open={true}`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer open title="title">
        <div>test</div>
      </Drawer>,
    ))

  test(`renders custom size=medium`, async () => {
    const { asFragment } = renderWithTheme(
      <Drawer
        title="title"
        size="medium"
        disclosure={<button type="button">button</button>}
      >
        <div>test</div>
      </Drawer>,
    )

    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(asFragment()).toMatchSnapshot()
  })
  test(`renders custom size=large`, async () => {
    const { asFragment } = renderWithTheme(
      <Drawer
        title="title"
        size="large"
        disclosure={<button type="button">button</button>}
      >
        <div>test</div>
      </Drawer>,
    )

    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(asFragment()).toMatchSnapshot()
  })

  test(`renders custom size=small`, async () => {
    const { asFragment } = renderWithTheme(
      <Drawer
        title="title"
        size="small"
        disclosure={<button type="button">button</button>}
      >
        <div>test</div>
      </Drawer>,
    )

    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(asFragment()).toMatchSnapshot()
  })

  test(`renders with custom classNames`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer open title="title" className="test">
        <div>test</div>
      </Drawer>,
    ))

  test(`renders with disclosure`, () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer
        ariaLabel="drawer-test"
        id="drawer-test"
        title="title"
        disclosure={<button type="button">Test</button>}
      >
        <div>modal</div>
      </Drawer>,
    ))

  test(`renders with disclosure and onClose`, async () => {
    let count = 0
    const { asFragment } = renderWithTheme(
      <Drawer
        ariaLabel="modal-test"
        id="modal-test"
        title="title"
        disclosure={<button type="button">Open modal</button>}
        data-testid="test"
        onClose={() => {
          count += 1
        }}
      >
        <div>modal</div>
      </Drawer>,
      consoleLightTheme,
      {
        container: document.body,
      },
    )

    await userEvent.click(screen.getByText('Open modal'))
    const closeButton = screen.getByTestId('test-close-button')
    await userEvent.click(closeButton)
    expect(count).toBe(1)
    expect(asFragment()).toMatchSnapshot()
  })

  test(`disclosure function render onClick props is called`, async () => {
    renderWithTheme(
      <Drawer
        ariaLabel="modal-test"
        id="modal-test"
        title="title"
        disclosure={() => (
          <button type="button" onClick={mockOnClick}>
            Open
          </button>
        )}
      >
        <div> test</div>
      </Drawer>,
    )
    const modalButton = screen.getByRole('button')
    await userEvent.click(modalButton)
    expect(mockOnClick).toBeCalledTimes(1)
  })

  test(`disclosure function render onClick props is call with toggle`, async () => {
    renderWithTheme(
      <Drawer
        title="title"
        ariaLabel="modal-test"
        id="modal-test"
        disclosure={({ toggle }) => (
          <button
            type="button"
            onClick={() => {
              toggle()
              mockOnClick()
            }}
          >
            Open
          </button>
        )}
      >
        <div> test</div>
      </Drawer>,
    )
    const modalButton = screen.getByRole('button')
    await userEvent.click(modalButton)
    expect(mockOnClick).toBeCalledTimes(1)
  })

  test(`should call 'close' prop from render props`, async () => {
    renderWithTheme(
      <Drawer ariaLabel="modal-test" id="modal-test" open title="title">
        {({ close }) => (
          <button
            type="button"
            onClick={() => {
              mockOnClick()
              close()
            }}
          >
            Close
          </button>
        )}
      </Drawer>,
    )
    const modalButton = screen.getByRole('button', { name: 'Close' })
    await userEvent.click(modalButton)
    expect(mockOnClick).toBeCalledTimes(1)
  })

  test(`disclosure Component render onClick props is call`, async () => {
    renderWithTheme(
      <Drawer
        title="title"
        ariaLabel="modal-test"
        id="modal-test"
        disclosure={
          <button type="button" onClick={mockOnClick}>
            Open
          </button>
        }
      >
        <div> test</div>
      </Drawer>,
    )
    const modalButton = screen.getByRole('button')
    await userEvent.click(modalButton)

    expect(mockOnClick).toBeCalledTimes(1)
  })

  test(`test hideOnEsc is true`, async () => {
    const mockOnClose = vi.fn(() => {})
    renderWithTheme(
      <Drawer
        title="title"
        ariaLabel="modal-test"
        id="modal-test"
        hideOnEsc
        open
        onClose={mockOnClose}
      >
        <div> test</div>
      </Drawer>,
    )
    await userEvent.click(screen.getByRole('dialog'))
    await userEvent.keyboard('{Escape}')

    expect(mockOnClose).toBeCalledTimes(1)
  })

  test(`function footer`, () => {
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer
        ariaLabel="modal-test"
        id="modal-test"
        title="title"
        disclosure={<button type="button">Open</button>}
        footer={({ close }) => (
          <button
            onClick={() => {
              close()
              mockOnClick()
            }}
            type="button"
            data-testid="buttonClose"
          >
            A custom button that can close the modal
          </button>
        )}
      >
        <div> test</div>
      </Drawer>,
    )
  })

  test(`with footer`, () => {
    shouldMatchEmotionSnapshotWithPortal(
      <Drawer
        ariaLabel="modal-test"
        id="modal-test"
        title="title"
        disclosure={<button type="button">Open</button>}
        footer={
          <button type="button">
            A custom button that can close the modal
          </button>
        }
      >
        <div> test</div>
      </Drawer>,
    )
  })
})
