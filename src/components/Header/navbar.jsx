import React from "react";

import { toast } from "react-hot-toast";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { MdDarkMode, MdDashboardCustomize } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import img1 from "./img/fish-market-2328964_1920.jpg";
import "../Header/NavbarCo.css";
import ReactGA from 'react-ga';
import { Link, useNavigate,  } from "react-router-dom";
import { CartState } from "../../context/Context";
import { useAuth } from "../../context/auth";

const Navbar = ({ dark, toggleDarkMode }) => {
  const [auth, setAuth] = useAuth();
  let {
    state: { Cart },
    searchDispatch,
  } = CartState();

  // console.log(Cart.length)

  
  // Function to toggle dark mode
  

const navigate = useNavigate()

  const logOut = () => {
    ReactGA.event({
      category: 'User Logout',
      action: 'Logout',
      label: 'Logout',
    });
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("userID");
    // document.cookie = 'userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    toast.success("Logout Successfully");
    navigate("/")
  };
  // console.log(auth.user);

  return (
    <>
      <div
        className="navbar sticky-top"
        expand="lg"
        style={{ maxHeight: "280px", maxWidth: "100%" }}
      >
        <div className="nav1">
          <Link to={"/"}>
            <img src={img1} className="brand-logo pt-2 " alt="Fish Market" />
          </Link>
          <Link href="#location" className=" btn-link">
            <GrLocation /> Raigarh's Store
          </Link>
          {!dark ? (
            <MdDarkMode
              style={{
                margin: "0 0",
                padding: "0 5",
                fontSize: "30px",
                cursor: "pointer",
              }}
              className=""
              onClick={toggleDarkMode }
            />
          ) : (
            <BsSun
              style={{
                margin: "0 0",
                padding: "0 5",
                fontSize: "30px",
                cursor: "pointer",
                color: "black",
              }}
              onClick={toggleDarkMode}
            />
          )}
        </div>

        <Link to={"/searchFood"} className="nav2">
          <input
            onChange={(e) => {
              searchDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
            type="text"
            placeholder="search your food . . . ."
            name="search"
          />
          <Link to={"/searchFood"}>
            <BsSearch />
          </Link>
        </Link>

        <div>
          <Link to={"/"} className="btn-link">
            Home
          </Link>

          {auth.user ? (
            <>
              {(auth.user.role !== "admin") ? (
                <BiLogOut
                  onClick={logOut}
                  style={{
                    fontSize: "30px",
                    color: "white",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <>
                 <Link style={{textDecoration:"none"}} to={"/admin-dashboard"}> <MdDashboardCustomize
                    style={{
                      fontSize: "30px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  /></Link>
                  <BiLogOut
                  onClick={logOut}
                  style={{
                    fontSize: "30px",
                    color: "white",
                    cursor: "pointer",
                  }}
                />
                </>
              )}
            </>
          ) : (
            <Link to={"/login"} className="btn-link link-login  ">
              Login
            </Link>
          )}

          <Link to={"/cart"} className="btn-link ">
            <BsFillCartCheckFill />
            <span style={{ color: "gray" }}>{Cart.length}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
