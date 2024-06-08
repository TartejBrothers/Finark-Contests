import React, { useState, useEffect, useCallback } from "react";
import Form from "./form";
import Filter from "./filter";
import "../styles/styles.css";
import "../styles/contests.css";
import logo from "../images/logo.jpeg";
import wallet from "../images/icons/wallet.png";
import profile from "../images/icons/profile.png";
import filter from "../images/icons/filter.png";
import plus from "../images/icons/plus.png";

export default function Contests() {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const Api_url = "https://finark-backend.vercel.app/api/";

  const refreshList = useCallback(async () => {
    try {
      const response = await fetch(Api_url + "contest");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setContests(data);
      applyFilters(data, filters, searchQuery);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [filters, searchQuery]);

  useEffect(() => {
    refreshList();
  }, [refreshList]); // Include refreshList as a dependency

  const applyFilters = (data, filters, searchQuery) => {
    let filteredData = data;
    if (filters.contestStatus) {
      filteredData = filteredData.filter(
        (contest) => contest.contestStatus === filters.contestStatus
      );
    }
    if (filters.startDate) {
      filteredData = filteredData.filter(
        (contest) =>
          new Date(contest.createdDate) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filteredData = filteredData.filter(
        (contest) => new Date(contest.createdDate) <= new Date(filters.endDate)
      );
    }
    if (searchQuery) {
      filteredData = filteredData.filter(
        (contest) =>
          contest.contestName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          contest.contestId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredContests(filteredData);
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const openFilter = () => {
    setIsFilterOpen(true);
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  const handleFormSubmitSuccess = () => {
    refreshList();
  };

  const handleFilterApply = (appliedFilters) => {
    setFilters(appliedFilters);
    applyFilters(contests, appliedFilters, searchQuery);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
            <li>Logout</li>
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
            <input
              type="text"
              placeholder="Search Contests"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <div className="actionsleft" onClick={openFilter}>
              <img src={filter} alt="Filter" />
              Filter
            </div>

            <div className="actionsright" onClick={openForm}>
              <img src={plus} alt="Plus" />
              Create Contest
            </div>
          </div>
        </div>
        <table className="contestsTable">
          <thead>
            <tr>
              <th>Contest Id</th>
              <th>Contest Name</th>
              <th>Contest Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredContests.map((contest) => (
              <tr key={contest._id}>
                <td>{contest.contestId}</td>
                <td>{contest.contestName}</td>
                <td>{contest.createdDate}</td>
                <td>{contest.contestStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <Form
              onClose={closeForm}
              onSubmitSuccess={handleFormSubmitSuccess}
            />
          </div>
        </div>
      )}
      {isFilterOpen && (
        <div className="modal">
          <div className="modal-content">
            <Filter onClose={closeFilter} onApply={handleFilterApply} />
          </div>
        </div>
      )}
    </div>
  );
}
