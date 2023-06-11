import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

import axios from "axios";

import "./NavbarCo.css";
// import Loader from "../UI/Loader";
import { Link, useNavigate, useLocation } from "react-router-dom";


function Login({ dark  }) {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const navigate = useNavigate();
  const location = useLocation();
  
 

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://food-backend-amber.vercel.app/auth/login", {
        email,
        password,
      });
      setAuth({
        ...auth,
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem("userID", JSON.stringify(response.data));
      navigate(location.state || "/");
      toast.success("Login succesfully");
    } catch (error) {
      console.log(error);
      toast.error("user not found !!!");
      navigate("/signUp");
    }
  };
  return (
    <div
      className={`modal_background ${
        !dark ? " modal_background " : "modal_background_1 "
      }`}
    >
      <Form
        className={`form_login ${!dark ? "form_login" : "form_login_1"} `}
        onSubmit={onLogin}
      >
        <h4>Login</h4>
        <input
          type="email"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <input
          type="password"
          name="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder=" Enter your Password"
        />{" "}
        <br />
        <Link to={"/forgot_password"}>Forgot password</Link>
        <br />
        <Button className="btn_login" type="submit">
          Login
        </Button>
        <br />
        
        <p>
          if you Don't have any accout.
          <Link to={"/signUp"}>Sign Up</Link>
        </p>
      </Form>
    </div>
  );
}

export default Login;
