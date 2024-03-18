import React, { useState, useEffect } from "react";
import io from "socket.io-client"; // Import socket.io-client library
import ChatContainer from "./ChatContainer";
import Contacts from "./Contacts";

const socket = io("http://localhost:3000"); // Initialize socket connection

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("chat");

  useEffect(() => {
    // Clean up socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const changePage = () => {
    setCurrentPage(currentPage === "chat" ? "contacts" : "chat");
  };

  return (
    <div>
      {currentPage === "chat" ? (
        <ChatContainer changePage={changePage} socket={socket} />
      ) : (
        <Contacts changePage={changePage} socket={socket} />
      )}
      <button onClick={changePage}>Change Page</button>
    </div>
  );
}
