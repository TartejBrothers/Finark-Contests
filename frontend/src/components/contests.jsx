import React from "react";
import "../styles/styles.css";
import "../styles/contests.css";
import logo from "../images/logo.jpeg";
import wallet from "../images/icons/wallet.png";
import profile from "../images/icons/profile.png";
import filter from "../images/icons/filter.png";
import exportimg from "../images/icons/export.png";
import plus from "../images/icons/plus.png";
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
      <div className="contestsbody">
        <div className="headerbody">
          <div className="headerelement">
            <img src={wallet} alt="Wallet" />
            <p>99889</p>
          </div>
          <div className="headerelement">
            <img src={profile} alt="Profile" />
            <p>Admin</p>
          </div>
        </div>
        <div className="queryheader">
          <div className="queryleft">
            <h1>Contests</h1>
          </div>
          <div className="queryright">
            <input type="text" placeholder="Search Contests" />
            <div className="actionsleft">
              <img src={filter} alt="Filter" />
              Filter
            </div>
            <div className="actionsleft">
              <img src={exportimg} alt="Export" />
              Export
            </div>
            <div className="actionsright">
              <img src={plus} alt="Plus" />
              Create Contest
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
