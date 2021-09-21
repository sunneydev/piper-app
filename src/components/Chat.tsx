import { Action, Message, User } from "../types";
import { groupByProperty } from "../utils";
import airplane from "../assets/icons/airplane.svg";

const Messages = (props: { messages: Message[] }) => {
  const { messages } = props;
  const user = messages[0].author;

  return (
    <div className="grouped-chat-messages">
      <img src={user?.avatar} className="chat-messages-author-avatar owner" />
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
  if (!props.messages) {
    return <></>;
  }
  console.log("rendered");
  const groupedMessages = groupByProperty(props.messages, "authorId");

  return (
    <div className="chat" style={{ width: "22%" }}>
      <div
        className="grouped-chat-messages-wrapper"
        style={{ overflowY: "auto" }}
      >
        {groupedMessages.map((gm) => (
          <Messages messages={gm} />
        ))}
        <div
          className="ps__rail-y"
          style={{
            top: "182px",
            right: "0px",
            height: "426px",
          }}
        >
          <div
            className="ps__thumb-y"
            tabIndex={0}
            style={{ top: "128px", height: "298px" }}
          ></div>
        </div>
      </div>

      <div className="chat-bar-wrapper">
        <input
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
          <img src={airplane} className="send-button-icon" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
