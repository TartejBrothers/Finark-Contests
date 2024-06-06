import React, { useState } from "react";
import "../styles/form.css";

export default function Form({ onClose, onSubmitSuccess }) {
  const [contestId, setContestId] = useState("");
  const [contestName, setContestName] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [contestStatus, setContestStatus] = useState("active");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isoDate = new Date(createdDate).toISOString();
    if (isNaN(Date.parse(isoDate))) {
      alert("Invalid date format. Please enter a valid date.");
      return;
    }

    const data = {
      contestId,
      contestName,
      createdDate: isoDate,
      contestStatus,
    };

    try {
      const response = await fetch(
        "https://finark-backend.vercel.app/api/contest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Form submitted successfully");
        onClose();
        onSubmitSuccess(); // Call the callback to refresh the data
      } else {
        const errorData = await response.json();
        console.error("Failed to submit form", errorData);
        alert(`Error: ${errorData.message || "Failed to submit form"}`);
        console.log(data);
        console.log(response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="formbody">
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Contest ID"
          value={contestId}
          onChange={(e) => setContestId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contest Name"
          value={contestName}
          onChange={(e) => setContestName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Created Date"
          value={createdDate}
          onChange={(e) => setCreatedDate(e.target.value)}
        />
        <select
          name="contestStatus"
          value={contestStatus}
          onChange={(e) => setContestStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="ended">Ended</option>
        </select>
        <input type="submit" value="Submit" />
        <button type="button" className="closebutton" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
}
