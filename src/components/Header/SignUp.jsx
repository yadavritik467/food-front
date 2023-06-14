import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {FcGoogle} from "react-icons/fc"
import "./NavbarCo.css"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function SignUp({ dark, setDark }) {
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState("")
  const [address, setAddress] = useState("")
  
   const navigate  =  useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();
    
     const {data}=  await axios.post("https://food-backend-lime.vercel.app/auth/register", {
        name,
        number,
        email,
        password,
        cpassword,
        address,
      },);
      if(data){

        navigate("/login");
        toast.success("register succesfully !! now login")
      }
      else{
        toast.success(data.message)
      }
     
    }
  return (
    <div
      className={`modal_background ${
        !dark ? "modal_background" : "modal_background_1"
      }`}
    >
      <Form
        className={`form_sign ${!dark ? "form_sign" : "form_sign_1"}  my-1`}
        onSubmit={handleSignUp}
      >
        <h4>
          Register{" "}
          
        </h4>

        
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            placeholder="Enter your name.."
            required
          />
       
       
          <input
            type="number"
            name="number"
            value={number}
            onChange={(e)=> setNumber(e.target.value)}
            placeholder="Enter your number"
            required
          />
        
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
       
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="Password"
            required
          />
       
        
          <input
            type="password"
            name="cpassword"
            value={cpassword}
            onChange={(e)=> setCpassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
       
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e)=> setAddress(e.target.value)}
            placeholder="Enter your address"
            required
          />
        <br />

        <Button className="btn_sign" type="submit" >
          Sign Up
        </Button>
        
         <p > Create your Account with  <FcGoogle style={{justifyContent:"center", fontSize:"25px", cursor:"pointer",  }} /> </p>
        
        <p>
          Have an accout ?<Link to={"/login"}>Login</Link>
        </p>
      </Form>
    </div>
  );
}

export default SignUp;
