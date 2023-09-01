import { describe, test } from '@jest/globals'
import type { ProminenceProps } from '..'
import { Link, PROMINENCES } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
import type { Color} from '../../../theme';
import { SENTIMENTS } from '../../../theme'

describe('Link', () => {
  test(`render correctly with no sentiment`, () =>
    shouldMatchEmotionSnapshot(<Link href="/">Hello</Link>))

  describe('sentiment', () => {
    test.each(SENTIMENTS.map(sentiment => [`render ${sentiment}`, sentiment]))(
      '%s',
      (_, sentiment) =>
        shouldMatchEmotionSnapshot(
          <Link href="/" sentiment={sentiment as Color}>
            Hello
          </Link>,
        ),
    )
  })

  describe('prominence', () => {
    test.each(
      Object.keys(PROMINENCES).map(prominence => [
        `render prominence ${prominence}`,
        prominence,
      ]),
    )('%s', (_, prominence) =>
      shouldMatchEmotionSnapshot(
        <Link href="/" prominence={prominence as ProminenceProps}>
          Hello
        </Link>,
      ),
    )
  })

  test(`render correctly with target blank`, () =>
    shouldMatchEmotionSnapshot(
      <Link href="/" sentiment="primary" target="_blank">
        Hello
      </Link>,
    ))

  test(`render correctly with href props`, () =>
    shouldMatchEmotionSnapshot(
      <Link sentiment="primary" href="/">
        Hello
      </Link>,
    ))

  test(`render correctly with href props`, () =>
    shouldMatchEmotionSnapshot(
      <>
        <Link sentiment="primary" href="/" iconPosition="left">
          Hello
        </Link>
        <Link sentiment="primary" href="/" iconPosition="right">
          Hello
        </Link>
        <Link sentiment="primary" href="/" iconPosition="right" target="_blank">
          Hello
        </Link>
        <Link sentiment="primary" href="/" iconPosition="left" target="_blank">
          Hello
        </Link>
      </>,
    ))

  test(`render correctly with bad sentiment`, () =>
    shouldMatchEmotionSnapshot(
      // @ts-expect-error Use a wrong sentiment
      <Link sentiment="wrong" href="/">
        Hello
      </Link>,
    ))

  test(`render correctly with sizes`, () =>
    shouldMatchEmotionSnapshot(
      <>
        <Link size="large" href="/">
          Hello
        </Link>
        ,
        <Link size="small" href="/">
          Hello
        </Link>
        ,
      </>,
    ))

  test(`render correctly with oneLine`, () =>
    shouldMatchEmotionSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 200 }}>
        <Link href="/" oneLine>
          Hello this is a very long text that should be truncated
        </Link>
      </div>,
    ))
})
