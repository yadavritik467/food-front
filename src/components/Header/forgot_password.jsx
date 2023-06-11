import React, { useState } from "react";

const Forgot_password = ({ dark, setDark }) => {
    const [email, setEmail] = useState("");
    return (
        <div
          className={`modal_background ${
            !dark ? " modal_background " : "modal_background_1 "
          }`}
        >
          <form
            className={`form_login ${!dark ? "form_login" : "form_login_1"} `}
        
          >
            
              <h4>
                Reset password
              </h4> 
              <input
                type="email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            <button className="btn_login" type="submit">
              send link
            </button>
            <br />
          </form>
        </div>
      );
}

export default Forgot_password
