import type { StoryFn } from '@storybook/react'
import { Drawer } from '..'
import { Button } from '../../Button'
import { Stack } from '../../Stack'

export const FunctionChildren: StoryFn = props => (
  <Stack direction="row" gap={2}>
    <Drawer
      {...props}
      disclosure={<Button>Function children</Button>}
      title="Function children"
      footer="Footer"
    >
      {({ close }) => (
        <Button onClick={close}>
          A custom button that can close the drawer
        </Button>
      )}
    </Drawer>

    <Drawer
      {...props}
      disclosure={<Button>Function footer</Button>}
      title="Function footer"
      footer={({ close }) => (
        <Button onClick={close}>
          A custom button that can close the drawer
        </Button>
      )}
    >
      Children
    </Drawer>
  </Stack>
)

FunctionChildren.parameters = {
  docs: {
    description: {
      story:
        '`disclosure`, `footer` and `children` can all be functions that can get the Drawer state',
    },
  },
}
