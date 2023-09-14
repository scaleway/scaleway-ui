import type { Meta } from '@storybook/react'
import { Menu } from '..'

export default {
  component: Menu,
  decorators: [
    StoryComponent => (
      <div style={{ marginBottom: '1em', marginLeft: '2em' }}>
        <StoryComponent />
      </div>
    ),
  ],
  parameters: {
    deprecated: true,
    deprecatedReason:
      'This component is deprecated please do not use it any more.',
    migrationLink: 'migrations-menu-to-menuv2',
    docs: {
      description: {
        component:
          'A menu is a widget that offers a list of choices to the user, such as a set of actions or functions. A menu is usually opened, or made visible, by activating a menu button, choosing an item in a menu that opens a sub menu, or by invoking a command, such as Shift + F10 on Windows, that opens a context specific menu. When a user activates a choice in a menu, the menu usually closes unless the choice opened a submenu.',
      },
    },
  },
  title: 'Components/Overlay/Menu',
  subcomponents: {
    'Menu.Item': Menu.Item,
  },
} as Meta<typeof Menu>

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { Borderless } from './Borderless.stories'
export { WithModal } from './WithModal.stories'
export { FunctionDisclosure } from './FunctionDisclosure.stories'
