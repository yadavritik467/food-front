import React, { useState } from "react";
import { GoDashboard } from "react-icons/go";
import { MdPayment } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import "./admin.css";
import {  NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
const SideNav = () => {
  const [activate, setActivate] = useState(false);
  
  
  const [auth ] = useAuth();

  // const activated = ()=>{
  //   setActivate()
  // }

  return (
    <div className="side-nav">
      <NavLink
        className={({ isActive, isPending }) =>
          isPending ? "link" : isActive ? "activeLink" : "link"
        }
        to={"/admin-dashboard"}
      >
        <GoDashboard />
        Dashboard
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isPending ? "link" : isActive ? "activeLink" : "link"
        }
        to={"/admin-payment"}
      >
        <MdPayment />
        payments
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isPending ? "link" : isActive ? "activeLink" : "link"
        }
        to={"/admin-chart"}
      >
        <BsBarChartFill />
        Chart
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isPending ? "link" : isActive ? "activeLink" : "link"
        }
        to={"/admin-products"}
      >
        <MdOutlineProductionQuantityLimits />
        products
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isPending ? "link" : isActive ? "activeLink" : "link"
        }
        to={"/admin-users"}
      >
        <FaUserFriends />
        Users
      </NavLink>
      
    </div>
  );
};

export default SideNav;
