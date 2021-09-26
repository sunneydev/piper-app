import { Message, User } from "../types";
import { groupByProperty } from "../utils";
import airplane from "../assets/icons/airplane.svg";
import { useEffect, useRef } from "react";

const Messages = (props: { messages: Message[] }) => {
  const { messages } = props;
  const user = messages[0].author;

  return (
    <div className="grouped-chat-messages">
      <img
        src={user?.avatar}
        className="chat-messages-author-avatar owner"
        alt={`Avatar of ${user.name}`}
      />
      <div className="chat-messages">
        <div className="grouped-chat-messages-meta">
          <p className="chat-messages-author-name">{messages[0].author.name}</p>
        </div>
        {messages.map((message) => (
          <div className="chat-message">
            <p className="chat-message-content">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Chat = (props: {
  user: User;
  sendMessage: (message: Message) => void;
  messages?: Message[];
}) => {
  const groupChatDiv = useRef<HTMLDivElement>(null);
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (groupChatDiv.current) {
      groupChatDiv.current.scrollTop = groupChatDiv.current.scrollHeight;
    }
  });

  if (!props.messages) {
    return <></>;
  }

  const groupedMessages = groupByProperty(props.messages, "authorId");

  return (
    <div className="chat">
      <div
        className="grouped-chat-messages-wrapper"
        style={{ overflowY: "auto" }}
        ref={groupChatDiv}
      >
        {groupedMessages.map((gm) => (
          <Messages messages={gm} />
        ))}
      </div>

      <div className="chat-bar-wrapper">
        <input
          ref={inputElement}
          type="text"
          placeholder="Say something cool..."
          className="chat-bar"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value) {
              const content = e.currentTarget.value;
              e.currentTarget.value = "";
              props.sendMessage({
                authorId: props.user.id,
                author: props.user,
                content,
              });
            }
          }}
        />
        <div title="Send Message" className="send-button">
          <img
            src={airplane}
            className="send-button-icon"
            alt={"Send Message"}
            onClick={(e) => {
              if (!inputElement.current) {
                return;
              }

              const content = inputElement.current?.value;
              inputElement.current.value = "";
              props.sendMessage({
                authorId: props.user.id,
                author: props.user,
                content,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
