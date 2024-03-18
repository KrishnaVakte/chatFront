import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "./Contacts.css";
import Logout from "./Logout";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setcurrentUserName] = useState(undefined);
  const [currentUserImage, setcurrentUserImage] = useState(undefined);
  const [currentSeclected, setcurrentSeclected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setcurrentUserImage(currentUser.AvatarImage);
      setcurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setcurrentSeclected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="Bontainer">
          <div className="brand">
            <img src={logo} alt="logo" />
            <h3>Chatify</h3>
          </div>
          <div className="contacts" id="go">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSeclected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img src={`${contact.AvatarImage}`} alt="" />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={`${currentUserImage}`} alt="" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
            <Logout />
          </div>
        </div>
      )}
    </>
  );
}
