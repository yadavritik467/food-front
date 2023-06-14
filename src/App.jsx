import React, { useEffect, useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import Home from "./Home";
import Navbar from "./components/Header/navbar";
import Login from "./components/Header/Login";
import Cart from "./components/Header/Cart";
import SignUp from "./components/Header/SignUp";
import Footer from "./components/Footer/Footer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import FoodProducts from "./admin/food-products";
// import Forgot_password from "./components/Header/forgot_password";
import PaymentSuccess from "./components/Header/paymentSuccess";
import Private from "./components/Routes/privateRoute";
import NotFound from "./components/Routes/notFound";
import AllUsers from "./admin/allUsers";
import AdminChart from "./admin/chart";
import Payments from "./admin/payments";
import Dashboard from "./admin/dashboard";
import MayOrder from "./components/Header/mayOrder";
import SearchAllFood from "./components/Header/searchAllFood";
import { useAuth } from "./context/auth";

function App({ state }) {
  const [dark, setDark] = useState( false);
  const [auth] = useAuth();



  //------------------------------------------------------------------------  dakr mode here
  const toggleDarkMode = () => {
    const updatedDarkMode = !dark;
    setDark(updatedDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(updatedDarkMode));
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDark(JSON.parse(savedDarkMode));
    }
  }, []);

   //------------------------------------------------------------------------  dakr mode ends here
  
  return (
    <>
      <Router>
        <div className={`App ${!dark ? "App" : "App_1"}`}>
          <Navbar
            dark={dark}
            setDark={setDark}
            toggleDarkMode={toggleDarkMode}
          />
          <Toaster />

          <Routes>
            {/* -----------------For client-----------------------   */}
            <Route path="/" element={<Home state={state} dark={dark} />} />

            <Route path="/searchFood" element={<SearchAllFood dark={dark} />} />
            {/* <Route path="/Login/forgot_password" element={<Forgot_password  dark={dark}/>} /> */}
            <Route path="/Login" element={<Login dark={dark} />} />
            <Route path="/signUp" element={<SignUp dark={dark} />} />

            <Route path="/" element={<Private />}>
              {/* -----------------For admin-----------------------   */}

              {auth.user && (
                <>
                  {" "}
                  {auth.user.role === "admin" && (
                    <>
                      <Route
                        path="/admin-dashboard"
                        element={<Dashboard dark={dark} />}
                      />
                      <Route
                        path="/admin-users"
                        element={<AllUsers dark={dark} />}
                      />
                      <Route
                        path="/admin-products"
                        element={<FoodProducts dark={dark} />}
                      />
                      <Route
                        path="/admin-chart"
                        element={<AdminChart dark={dark} />}
                      />
                      <Route
                        path="/admin-payment"
                        element={<Payments dark={dark} />}
                      />
                    </>
                  )}
                </>
              )}

              <Route path="/cart" element={<Cart />} />
              <Route path="/user/paymentSuccess" element={<PaymentSuccess />} />
              <Route path="/user/myOrder" element={<MayOrder />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
