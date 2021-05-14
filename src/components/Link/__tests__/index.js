import React from 'react'
import Link, { linkVariants } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Link', () => {
  test(`render correctly with no variant`, () => {
    shouldMatchEmotionSnapshot(<Link href="/">Hello</Link>)
  })

  describe('variant', () => {
    test.each(linkVariants.map(variant => [`render ${variant}`, variant]))(
      '%s',
      (_, variant) => {
        shouldMatchEmotionSnapshot(
          <Link to="/" variant={variant}>
            Hello
          </Link>,
        )
      },
    )
  })

  test(`render correctly with target blank`, () => {
    shouldMatchEmotionSnapshot(
      <Link to="/" variant="primary" target="_blank">
        Hello
      </Link>,
    )
  })

  test(`render correctly with to props`, () => {
    shouldMatchEmotionSnapshot(
      <Link variant="primary" to="/">
        Hello
      </Link>,
    )
  })
})
