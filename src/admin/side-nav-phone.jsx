import React from "react";
import { GoDashboard } from "react-icons/go";
import { MdPayment } from "react-icons/md";
// import { BsBarChartFill } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import "./admin.css";
import { useAuth } from "../context/auth";


const Side_nav_phone = () => {
  const [auth] = useAuth();
  

 

  return (
    <>
    
      {/* {load && <Loader />} */}
      {auth.user.role === "admin" && (
      <> 
        <div className="side-nav-phone">
        {/* <a  style={{float:"right",margin:"0 150px",position:"absolute"}}> side menu</a> */}
          <a style={{color:"white"}} href="#dashboard">
            <GoDashboard /> <br />
            Dashboard
          </a>
          {/* <a style={{color:"white"}} href="#payment">
            <MdPayment /> <br />
            payments
          </a> */}
          {/* <a style={{color:"white"}} href="#chart">
            <BsBarChartFill /> <br />
            Chart
          </a> */}
          <a style={{color:"white"}} href="#food_creator">
            <MdOutlineProductionQuantityLimits /> <br />
            products
          </a>
          <a style={{color:"white"}} href="#user">
            <FaUserFriends /> <br />
            Users
          </a>
        </div> </>
      )}
    </>
  );
};

export default Side_nav_phone;
