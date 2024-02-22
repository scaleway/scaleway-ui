import { Avatar } from '@ultraviolet/ui'
import { Conversation } from '..'
import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.args = {
  children: [
    <>
      <Conversation.Date>2022-03-02</Conversation.Date>
      <Conversation.Message
        avatar={
          <Avatar image="static/media/packages/ui/src/components/Avatar/__stories__/avatar.svg" />
        }
        align="left"
      >
        Message 1
      </Conversation.Message>
      <Conversation.MessageInfos align="left">
        <Conversation.Tag>tag</Conversation.Tag>
        info message
      </Conversation.MessageInfos>
      <Conversation.Message
        avatar={
          <Avatar image="static/media/packages/ui/src/components/Avatar/__stories__/avatar.svg" />
        }
      >
        Message 2
      </Conversation.Message>
      <Conversation.MessageInfos align="right">
        <Conversation.Tag>tag</Conversation.Tag>
        info message
      </Conversation.MessageInfos>
    </>,
  ],
}
