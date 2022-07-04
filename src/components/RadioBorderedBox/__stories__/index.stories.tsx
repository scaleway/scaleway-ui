import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import RadioBorderedBox from '..'
import ControlValue from '../../../__stories__/components/ControlValue'

export default {
  args: {
    badgeText: 'Badge',
    checked: false,
    label: 'Choice 1',
    labelDescription: '(choice details)',
    name: 'choice-1',
    value: 'choice-1',
  },
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'checked',
      name: 'checked',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { name: 'boolean', required: false },
    },
  },
  component: RadioBorderedBox,
  parameters: {
    docs: {
      description: {
        component:
          'RadioBorderedBox only work as [controlled component](https://reactjs.org/docs/forms.html).',
      },
    },
  },
  title: 'Components/Data Entry/RadioBorderedBox',
} as Meta

const Template: Story<ComponentProps<typeof RadioBorderedBox>> = args => (
  <RadioBorderedBox {...args} />
)

export const Default = Template.bind({})

export const Controlled = Template.bind({})
Controlled.parameters = {
  docs: {
    storyDescription: 'Control the component using `onChange` callback.',
  },
}
Controlled.decorators = [
  () => (
    <ControlValue value="basic-1">
      {({ value, onChange }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <RadioBorderedBox
            name="basic-1"
            checked={value === 'basic-1' ? true : undefined}
            value="basic-1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(e.currentTarget.value)
            }
            label="Choice 1"
            labelDescription="(choice details)"
            badgeText="Badge"
            sideText="0.99€"
          >
            Description content
          </RadioBorderedBox>
          <RadioBorderedBox
            name="basic-2"
            checked={value === 'basic-2' ? true : undefined}
            value="basic-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(e.currentTarget.value)
            }
            label="Choice 2"
            sideText="Free"
          >
            Description content choice 2
          </RadioBorderedBox>
        </div>
      )}
    </ControlValue>
  ),
]

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'Description content',
  disabled: true,
  labelDescription: '(choice details)',
}

export const Error = Template.bind({})
Error.args = {
  error: 'Invalid value',
}

export const Label = Template.bind({})
Label.parameters = {
  docs: {
    storyDescription:
      'Set the content at the right of the button with `label` prop. You can set the content at the right of the label with `labelDescription`.',
  },
}
Label.decorators = [
  () => (
    <RadioBorderedBox
      value="label"
      name="radio-label"
      label="Lorem Ipsum"
      labelDescription="Do nostrud labore aliquip nostrud excepteur laboris laborum. 🤔"
      onChange={() => {}}
    >
      <div>
        Fugiat nulla Lorem elit Lorem labore exercitation ipsum et. Excepteur
        incididunt nulla non enim duis cillum deserunt. Sint voluptate deserunt
        labore consequat duis qui. Anim consequat laborum velit officia.
        Deserunt in Lorem est laborum officia culpa laboris pariatur nulla Lorem
        occaecat ex id. Non excepteur occaecat nisi eiusmod qui excepteur esse
        id.
      </div>
    </RadioBorderedBox>
  ),
]

export const Badge = Template.bind({})
Badge.parameters = {
  docs: {
    storyDescription:
      'You can add a badge next to the label by using `badgeText`, `badgeVariant` and `badgeSize`.',
  },
}
Badge.decorators = [
  () => (
    <ControlValue value="badge-1">
      {({ value, onChange }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <RadioBorderedBox
            name="badge-1"
            checked={value === 'badge-1'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(e.currentTarget.value)
            }
            value="badge-1"
            label="Choice 1"
            labelDescription="(details)"
            badgeText="Badge"
            badgeVariant="warning"
            badgeSize="medium"
          >
            All Badge props
          </RadioBorderedBox>
          <RadioBorderedBox
            name="badge-2"
            checked={value === 'badge-2'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(e.currentTarget.value)
            }
            value="badge-2"
            label="Choice 2"
            labelDescription="(details)"
            badgeText="Badge"
            badgeSize="medium"
          >
            Badge Text and Size
          </RadioBorderedBox>
          <RadioBorderedBox
            name="badge-3"
            checked={value === 'badge-3'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(e.currentTarget.value)
            }
            value="badge-3"
            label="Choice 3"
            labelDescription="(details)"
            badgeText="Badge"
            badgeVariant="success"
          >
            Badge Text and Variant
          </RadioBorderedBox>
        </div>
      )}
    </ControlValue>
  ),
]
