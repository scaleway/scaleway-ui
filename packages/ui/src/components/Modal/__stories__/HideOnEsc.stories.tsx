import type { StoryFn } from '@storybook/react'
import { Modal } from '..'
import { Button } from '../../Button'

export const HideOnEsc: StoryFn = props => (
  <Modal
    {...props}
    disclosure={<Button>hideOnEsc</Button>}
    width="medium"
    hideOnEsc={false}
  >
    <div style={{ padding: 32 }}>try to ESCAPE</div>
  </Modal>
)
HideOnEsc.parameters = {
  docs: {
    storyDescription:
      'To hide or keep modal on ESC key, specify `hideOnEsc`Here is a list of all the HideOnEsc values we support',
  },
}
