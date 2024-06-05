import React from "react";
import "../styles/styles.css";
import "../styles/contests.css";
import logo from "../images/logo.jpeg";
export default function contests() {
  return (
    <div className="contestsmain">
      <div className="contestsmenu">
        <div className="menuheader">
          <img src={logo} alt="Logo" />
          <hr />
        </div>
        <div className="menumain">
          <ul>
            <li>Contests</li>
            <li>Chat Support</li>
            <li>Analytics</li>
            <li>Campaigns</li>
            <li>Users</li>
            <li>Settings</li>
            <li>Profile</li>
            <li>Company Logo</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
