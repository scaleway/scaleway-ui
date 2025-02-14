import { Tabs } from '..'
import { Badge } from '../../Badge'
import { Template } from './Template.stories'

export const Showcase = Template.bind({})

Showcase.args = {
  children: [
    <Tabs.Tab key={1} value={1}>
      Choice 1
    </Tabs.Tab>,
    <Tabs.Tab
      key={2}
      value={2}
      as="a"
      href="https://scaleway.com"
      target="_blank"
    >
      Link
    </Tabs.Tab>,
    <Tabs.Tab key={3} value={3} disabled>
      Disabled
    </Tabs.Tab>,
    <Tabs.Tab key={4} value={4} href="https://scaleway.com" as="a" disabled>
      Disabled too
    </Tabs.Tab>,
    <Tabs.Tab
      key={5}
      value={5}
      as="a"
      href="https://scaleway.com"
      target="_blank"
    >
      Link no value
    </Tabs.Tab>,
    <Tabs.Tab key={6} value={6} as="div">
      Choice 6
    </Tabs.Tab>,
    <Tabs.Tab key="six" value="six">
      Choice 6 too but six value
    </Tabs.Tab>,
    <Tabs.Tab key="tooltip" value="tooltip" tooltip="Awesome tooltip">
      With tooltip
    </Tabs.Tab>,
    <Tabs.Tab key="8" value="8" counter={1}>
      Choice 8
    </Tabs.Tab>,
    <Tabs.Tab key="9" value="9" counter={10}>
      Choice 9
    </Tabs.Tab>,
    <Tabs.Tab key="10" value="10">
      Lots of info <Badge>New badge very long</Badge>
    </Tabs.Tab>,
  ],
  selected: 1,
}
