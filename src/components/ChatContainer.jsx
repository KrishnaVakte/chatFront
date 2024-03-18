import React, { useEffect, useRef, useState } from "react";
import "./ChatContainer.css";
import Logout from "./Logout.jsx";
import ChatInput from "./ChatInput.jsx";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import { FaArrowLeft } from "react-icons/fa";
import { host } from "../data.js";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setmessages] = useState([]);
  const [arrivalMessage, setarrivalMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        console.log("currentUser is undefined");
        return; // Exit early if currentUser is undefined
      }

      const response = await axios.post(`${host}/api/getallmsg`, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setmessages(response.data);
    };

    fetchData();
  }, [currentChat, currentUser]);

  const handleSendMessage = async (msg) => {
    await axios.post(`${host}/api/addmessage`, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setmessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setarrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setmessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  if (!currentChat) {
    return null; // or render a loading indicator or something else
  }

  const resetButton = document.querySelector(".resetbutton");

  const reload = () => {
    resetButton.addEventListener("click", function () {
      window.location.reload();
    });
  };

  return (
    <>
      {currentChat && (
        <div className="Montainer">
          <div className="chat-header">
            <div className="user-details">
              <FaArrowLeft
                style={{ width: "40px", height: "20px" }}
                color="white"
                size={30}
                mar
                className="resetbutton"
                onClick={() => {
                  reload();
                }}
              />

              <div className="avatar">
                <img src={`${currentChat.AvatarImage}`} alt="" />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content ">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <ChatInput handleSendMessage={handleSendMessage} />
        </div>
      )}
    </>
  );
}
