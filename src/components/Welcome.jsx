import React from "react";
import robot from "../assets/robot2.gif";
import "./Welcome.css";

export default function Welcome({ currentUser }) {
  // Check if currentUser is defined before rendering
  if (!currentUser) {
    return null; // or render a loading indicator or something else
  }

  return (
    <div className="Nontainer">
      <img src={robot} alt="Robot" />
      <h1>
        Welcome, <span>{currentUser.username}!!</span>
      </h1>
      <h3>Please select a chat to start messaging</h3>
    </div>
  );
}
