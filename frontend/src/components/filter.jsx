import React, { useState } from "react";
import "../styles/form.css";
export default function Filter({ onClose, onApply }) {
  const [contestStatus, setContestStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApply = () => {
    onApply({ contestStatus, startDate, endDate });
    onClose();
  };

  return (
    <div className="formbody">
      <form className="form-container">
        <select
          name="contestStatus"
          value={contestStatus}
          onChange={(e) => setContestStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="ended">Ended</option>
        </select>
        <label>Start Date</label>
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date</label>
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button type="button" className="applybutton" onClick={handleApply}>
          Apply
        </button>
        <button type="button" className="closebutton" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
}
