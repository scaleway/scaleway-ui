import React from 'react'
import { ActivityIndicator } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

test('ActivityIndicator renders correctly ', () => {
  shouldMatchEmotionSnapshot(<ActivityIndicator />)
})

test('Action renders with width=40px height=40px ', () => {
  shouldMatchEmotionSnapshot(<ActivityIndicator size={40} />)
})
