import { Avatar, Input, Spacer } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { groupByProperty } from "../lib/utils";
import { IMessage, User } from "../typings";

const GroupedMessages = (props: { messages: IMessage[]; author: User }) => {
  const { messages, author } = props;

  return (
    <div className="flex">
      <Avatar src={author.avatar} size="xl" color={"gradient"} bordered />
      <Spacer x={0.5} />
      <div>
        <span className="font-bold">{author.name}</span>
        {messages.map((message, index) => (
          <div key={index} className="flex-1 break-all">
            {message.content}
          </div>
        ))}
      </div>
    </div>
  );
};

const Messages = (props: { messages: IMessage[] }) => {
  const groupChatDiv = useRef<HTMLDivElement>(null);
  const { messages } = props;

  useEffect(() => {
    if (groupChatDiv.current) {
      groupChatDiv.current.scrollTop = groupChatDiv.current.scrollHeight;
    }
  }, [messages]);

  const groupedMessages = groupByProperty(messages, "authorId");

  return (
    <div className="overflow-y-auto h-56  md:h-full" ref={groupChatDiv}>
      {groupedMessages.map((groupedMessages, index) => (
        <div key={index}>
          <GroupedMessages messages={groupedMessages} author={groupedMessages[0].author} />
          <Spacer />
        </div>
      ))}
    </div>
  );
};

const SendMessage = (props: { onSubmit: (message: string) => void }) => {
  const inputElement = useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-2 items-center">
      <Input
        aria-label="Send message"
        ref={inputElement}
        fullWidth
        size="xl"
        placeholder="Type your message"
        onKeyDown={(k) => {
          const msg = k.currentTarget.value;
          if (k.key === "Enter" && msg !== "") {
            k.currentTarget.value = "";
            props.onSubmit(msg);
          }
        }}
      />
    </div>
  );
};

const Chat = (
  props: { messages: IMessage[] } & {
    onMessageSubmit: (message: string) => void;
  }
) => {
  return (
    <div className="w-full md:w-96 md:h-full flex flex-col justify-between border border-solid border-gray-100/20 border-x p-2">
      <Messages messages={props.messages} />
      <SendMessage onSubmit={props.onMessageSubmit} />
    </div>
  );
};

export default Chat;
