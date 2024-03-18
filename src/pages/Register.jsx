import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.svg";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";
import axios from "axios";

import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        "http://localhost:5000/api/register",
        user
      );

      if (data.status === false) {
        toast.error(data.msg);
      }

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        toast.success("User Register Successfully");
        navigate("/");
      }
    }
  };

  const handlevalidation = () => {
    const { username, email, password, confirmPassword } = user;

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be same");
      return false;
    } else if (username.length < 3) {
      toast.error("Username must be valid");
      return false;
    } else if (password.length < 5) {
      toast.error("Password must be valid");
      return false;
    } else if (email === "") {
      toast.error("Email is required");
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
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handlechange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handlechange(e)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handlechange(e)}
        />

        <button type="submit">Create User</button>
        <span>
          Already have an account ? <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
