import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { AvatarV2 } from '..'
import support from '../__stories__/assets/avatar.svg'

describe('AvatarV2', () => {
  describe.each(['circle', 'square'] as const)(
    `renders correctly with shape %s`,
    shape => {
      describe.each(['xsmall', 'small', 'medium', 'large'] as const)(
        `renders correctly with shape ${shape} and size %s`,
        size => {
          it('renders correctly with variant user', () =>
            shouldMatchEmotionSnapshot(
              <AvatarV2 shape={shape} variant="user" size={size} />,
            ))

          it('renders correctly with variant image', () =>
            shouldMatchEmotionSnapshot(
              <AvatarV2
                shape={shape}
                variant="image"
                image={support}
                size={size}
              />,
            ))

          it('renders correctly with variant text', () =>
            shouldMatchEmotionSnapshot(
              <AvatarV2 shape={shape} variant="text" text="UV" size={size} />,
            ))

          it('renders correctly with variant text and sentiment neutral', () =>
            shouldMatchEmotionSnapshot(
              <AvatarV2
                shape={shape}
                variant="text"
                text="UV"
                sentiment="neutral"
                size={size}
              />,
            ))

          it('renders correctly with variant icon', () =>
            shouldMatchEmotionSnapshot(
              <AvatarV2
                shape={shape}
                variant="icon"
                icon="mosaic"
                size={size}
              />,
            ))

          it('renders correctly with variant icon and sentiment neutral', () =>
            shouldMatchEmotionSnapshot(
              <AvatarV2
                shape={shape}
                variant="icon"
                icon="mosaic"
                sentiment="neutral"
                size={size}
              />,
            ))

          it('renders correctly with variant colors', () =>
            shouldMatchEmotionSnapshot(
              <AvatarV2 shape={shape} variant="colors" size={size} />,
            ))

          it('renders correctly with variant text and upload', async () => {
            const onClick = vi.fn()
            const { asFragment } = renderWithTheme(
              <AvatarV2
                shape={shape}
                variant="text"
                text="UV"
                size={size}
                upload
                data-testid="avatar"
                onClick={onClick}
              />,
            )
            const avatar = screen.getByTestId('avatar')

            await userEvent.hover(avatar)
            expect(asFragment()).toMatchSnapshot()

            await userEvent.click(avatar)
            expect(onClick).toHaveBeenCalledOnce()
          })
        },
      )
    },
  )
})
