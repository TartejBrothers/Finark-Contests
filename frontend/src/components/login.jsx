import { Link } from "react-router-dom";
import React from "react";

import "../styles/login.css";
import unhide from "../images/icons/unhide.png";

function Login() {
  const changeType = () => {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  return (
    <div className="container">
      <div className="topleft">
        <p>Welcome Back</p>
        <h1>Log In!</h1>
      </div>
      <div className="right">
        <div className="rightcontainer">
          <form method="post" action="/#">
            <input
              type="number"
              name="name"
              placeholder="Enter Phone No "
              style={{ marginBottom: "20px" }}
              required
            />
            <br />
            <div className="inputfield">
              <img
                src={unhide}
                alt="password"
                className="passwordicon"
                onClick={changeType}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                id="password"
              />
            </div>
            <div className="forgottext">
              <p>Forgot Password?</p>
            </div>
            <div className="submitbutton">
              <input
                type="submit"
                value="Login"
                style={{
                  width: "50%",
                  fontSize: "14px",
                  padding: "10px",
                  background: "#FA604B",
                  color: "#fff",
                  justifyContent: "center",
                  margin: "20px auto 20px auto",
                }}
              />
            </div>
          </form>

          <p>
            Create a new account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
