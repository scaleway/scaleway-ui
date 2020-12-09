import React from 'react'
import { Separator } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Separator', () => {
  test(`renders correctly with default props`, () => {
    shouldMatchEmotionSnapshot(<Separator />)
  })
  test(`renders correctly with custom thickness`, () => {
    shouldMatchEmotionSnapshot(<Separator thickness={3} />)
  })
  test(`renders correctly vertically`, () => {
    shouldMatchEmotionSnapshot(<Separator direction="vertical" />)
  })
  test(`renders correctly with custom color`, () => {
    shouldMatchEmotionSnapshot(<Separator color="primary" />)
  })
  test(`renders correctly with custom icon`, () => {
    shouldMatchEmotionSnapshot(<Separator icon="ray-top-arrow" />)
  })
  test(`renders correctly with custom icon vertically`, () => {
    shouldMatchEmotionSnapshot(
      <Separator direction="vertical" icon="ray-top-arrow" />,
    )
  })
})
