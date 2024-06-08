import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import unhide from "../images/icons/unhide.png";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://finark-backend.vercel.app/api/user?phoneNumber=${phoneNumber}`
      );

      if (response.ok) {
        const userData = await response.json();

        if (userData.length > 0 && userData[0].password === password) {
          console.log("User logged in successfully");

          // Pass the user's name to the '/' page
          navigate("/", { state: { name: userData[0].name } });
        } else {
          alert("Invalid phone number or password");
        }
      } else {
        const errorData = await response.json();
        console.error("Failed to log in", errorData);
        alert(`Error: ${errorData.message || "Failed to log in"}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please try again.");
    }
  };

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
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Enter Phone No"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
