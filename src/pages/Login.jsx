import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.svg";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import "./Register.css";

const Login = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    username: "",
    password: "",
  });

  const handlechange = (event) => {
    setuser({ ...user, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handlesubmit = async (event) => {
    event.preventDefault();
    if (handlevalidation()) {
      const { data } = await axios.post(
        "http://localhost:5000/api/login",
        user
      );

      if (data.status === false) {
        toast.error(data.msg);
      }

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        toast.success("Login Successfully");
        navigate("/");
      }
    }
  };

  const handlevalidation = () => {
    const { username, password } = user;

    if (username.length === "") {
      toast.error("Username and Password required");
      return false;
    } else if (password === "") {
      toast.error("Username and Password required");
      return false;
    }

    return true;
  };

  return (
    <div className="main">
      <form onSubmit={(event) => handlesubmit(event)}>
        <div className="brandlogo">
          <img src={logo} alt="" />
          <h1>Chatify</h1>
        </div>

        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handlechange(e)}
          min={3}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handlechange(e)}
        />

        <button type="submit">Login</button>
        <span>
          Don't have an account ? <Link to={"/register"}>Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
