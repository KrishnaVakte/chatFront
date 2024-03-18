import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Chat.css";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
import { host } from "../data";

const Chat = () => {
  const socket = useRef();

  const [contacts, setcontacts] = useState([]);
  const [currentUser, setcurrentUser] = useState(undefined);
  const [currentChat, setcurrentChat] = useState(undefined);
  const [isLoaded, setisLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setcurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
      setisLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(
            `${host}/api/allusers/${currentUser._id}`
          );

          setcontacts(data.data);
        } else {
          navigate("/setavatar");
        }
      }
    };
    fetchData();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setcurrentChat(chat);
  };

  return (
    <div className="Vontainer">
      <div className="vontainer">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
