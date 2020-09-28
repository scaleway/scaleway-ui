import React from 'react'
import shouldMatchEmotionSnapshot from 'helpers/shouldMatchEmotionSnapshot'

import { Dot } from '../Dot'

test('Button renders correctly', () => {
  shouldMatchEmotionSnapshot(<Dot>This is hotpink.</Dot>)
})
