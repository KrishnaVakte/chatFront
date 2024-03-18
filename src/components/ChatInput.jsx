import React, { useState } from "react";
import "./ChatInput.css";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({ handleSendMessage }) {
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [msg, setmsg] = useState("");

  const handleEmoji = () => {
    setshowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    setmsg((preMsg) => preMsg + event.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setmsg("");
    }
  };

  return (
    <div className="Xontainer">
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmoji} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="Input-Container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="type your message here..."
          value={msg}
          onChange={(e) => setmsg(e.target.value)}
        />

        <button className="Submit">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}
