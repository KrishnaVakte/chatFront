import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Chat from "./pages/Chat.jsx";
import SetAvatar from "./pages/SetAvatar.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/setavatar"} element={<SetAvatar />} />
          <Route path={"/"} element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
