import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import "../styles/signup.css";

function SignUp() {
  const [name, setName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      phoneNumber,
      password,
    };

    try {
      const response = await fetch(
        "https://finark-backend.vercel.app/api/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("User signed up successfully");
      } else {
        const errorData = await response.json();
        console.log(response);
        console.log(data);
        console.error("Failed to sign up", errorData);
        alert(`Error: ${errorData.message || "Failed to sign up"}`);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <div className="containersignup">
      <div className="topleft">
        <p>Hello There</p>
        <h1>Sign Up!</h1>
      </div>
      <div className="rightsignup">
        <div className="rightcontainersignup">
          <h5>SIGN UP</h5>
          <form onSubmit={handleSubmit}>
            <div className="fullfields">
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="fullinputfield"
              />
            </div>
            <div className="inputfield">
              <input
                type="number"
                name="phoneNumber"
                placeholder="Enter phone No "
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
                required
                id="password"
              />
            </div>
            <div className="inputfield">
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

            <div className="checkboxfield">
              <input type="checkbox" name="agreement" required id="agreement" />
              <label for="agreement">
                Hereby, I agree to the <a href="#">Terms & Condition</a> and{" "}
                <a href="#">Privacy Policy </a>
              </label>
            </div>
            <div className="submitbutton">
              <input
                type="submit"
                value="Sign Up"
                style={{
                  width: "50%",
                  fontsize: "14px",
                  padding: "10px",
                  background: "#F5363C",
                  color: "#fff",
                  justify: "center",
                  margin: "20px auto 20px auto",
                }}
              />
            </div>
          </form>
          <p>
            Already Have an Account <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
