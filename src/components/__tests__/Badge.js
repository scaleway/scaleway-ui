import React from 'react'
import shouldMatchEmotionSnapshot from 'helpers/shouldMatchEmotionSnapshot'

import { Badge } from '../Badge'

test('Badge renders correctly with default values', () => {
  shouldMatchEmotionSnapshot(<Badge>Sample badge</Badge>)
})
