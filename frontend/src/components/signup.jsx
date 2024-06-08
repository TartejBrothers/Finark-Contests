import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import "../styles/signup.css";

function SignUp() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumberExists, setPhoneNumberExists] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      phoneNumber,
      password,
    };

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain at least one capital letter, one number, and be at least 6 characters long."
      );
      return;
    }

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
        // Redirect to login page
        window.location.href = "/login";
      } else {
        const errorData = await response.json();
        console.error("Failed to sign up", errorData);
        alert(`Error: ${errorData.message || "Failed to sign up"}`);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up. Please try again.");
    }
  };

  const checkPhoneNumber = async () => {
    try {
      if (phoneNumber.length === 10) {
        const response = await fetch(
          `https://finark-backend.vercel.app/api/user?phoneNumber=${phoneNumber}`
        );
        if (response.ok) {
          const userData = await response.json();
          if (userData.length > 0) {
            setPhoneNumberExists(true);
            alert("User with this phone number already exists.");
          } else {
            setPhoneNumberExists(false);
          }
        } else {
          alert("Failed to check phone number.");
        }
      }
    } catch (error) {
      console.error("Error checking phone number:", error);
      alert("Error checking phone number. Please try again.");
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
                placeholder="Enter Phone No "
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={checkPhoneNumber}
                required
                id="phoneNumber"
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
              <label htmlFor="agreement">
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
                  fontSize: "14px",
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
