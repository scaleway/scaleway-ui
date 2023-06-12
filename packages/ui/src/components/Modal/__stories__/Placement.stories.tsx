import type { StoryFn } from '@storybook/react'
import { MODAL_PLACEMENT, Modal } from '..'
import { Button } from '../../Button'

export const Placement: StoryFn = props => (
  <>
    {Object.keys(MODAL_PLACEMENT).map(placement => (
      <div style={{ display: 'inline-block', padding: 16 }} key={placement}>
        <Modal
          {...props}
          placement={placement as keyof typeof MODAL_PLACEMENT}
          disclosure={<Button>{placement}</Button>}
        >
          <div style={{ padding: 32 }}>Content of the {placement} modal</div>
        </Modal>
      </div>
    ))}
  </>
)

Placement.parameters = {
  docs: {
    storyDescription: 'Here is a list of all the placement values we support',
  },
}
