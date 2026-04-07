import React, { useState } from "react";
import "./AltarHeadDashboard.css";

const AltarHeadDashboard = () => {

  const [activeTab, setActiveTab] = useState("Announcements");

  const altarServers = [
    "Michael Fernandes",
    "David Dsouza",
    "Kevin Pereira",
    "Ryan Lopes",
    "Samuel Rodrigues",
  ];

  const [altarDate, setAltarDate] = useState("");
  const [altarTime, setAltarTime] = useState("");
  const [assignedServers, setAssignedServers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /* =====================
      SEARCH FILTER
  ====================== */
  const filteredServers = altarServers.filter(server =>
    server.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* =====================
      SELECT SERVER
  ====================== */
  const toggleServer = (name) => {
    if (assignedServers.includes(name)) {
      setAssignedServers(
        assignedServers.filter((s) => s !== name)
      );
    } else {
      setAssignedServers([...assignedServers, name]);
    }
  };

  /* =====================
      ASSIGN ACTION
  ====================== */
  const handleAltarAssign = () => {
    if (!altarDate || !altarTime || assignedServers.length < 2) {
      alert("Assign at least 2 altar servers with date & time");
      return;
    }

    alert(
`Altar Servers Assigned

Date: ${altarDate}
Time: ${altarTime}

Servers:
${assignedServers.join(", ")}`
    );
  };

  return (
    <div className="head-container">

      {/* HEADER */}
      <div className="head-header">
        <div>
          <h1>Parish Pastoral Council Portal</h1>
          <p>Altar Servers Management</p>
        </div>

        <div className="session">
          Active Session: HEAD_ALTAR
        </div>
      </div>

      {/* STATS */}
      <div className="head-stats">
        <div className="stat-card">
          <p>Active Servers</p>
          <h2>{altarServers.length}</h2>
        </div>

        <div className="stat-card">
          <p>Upcoming Masses</p>
          <h2>8</h2>
        </div>

        <div className="stat-card">
          <p>Assigned Duties</p>
          <h2>3</h2>
        </div>
      </div>

      {/* TABS */}
      <div className="head-tabs">
        {["Announcements", "Parish Gallery", "Manage Members"].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? "active-tab" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ========================= */}
      {/* ANNOUNCEMENTS + ASSIGNMENT */}
      {/* ========================= */}
      {activeTab === "Announcements" && (
        <div className="head-card">

          {/* ANNOUNCEMENT */}
          <h2>Post Announcement</h2>

          <label>Title</label>
          <input placeholder="e.g., Sunday Preparation Meeting" />

          <label>Message</label>
          <textarea placeholder="Details about the announcement..." />

          <button className="primary-btn">
            Send SMS Alerts & Post
          </button>

          <hr className="section-divider" />

          {/* ALTAR ASSIGNMENT */}
          <h2>Assign Altar Servers for Mass</h2>

          <div className="row">
            <div>
              <label>Date</label>
              <input
                type="date"
                value={altarDate}
                onChange={(e) => setAltarDate(e.target.value)}
              />
            </div>

            <div>
              <label>Mass Time</label>
              <input
                type="text"
                placeholder="e.g., 6:30 PM"
                value={altarTime}
                onChange={(e) => setAltarTime(e.target.value)}
              />
            </div>
          </div>

          <h4>Select Altar Servers (Minimum 2)</h4>

          {/* SEARCH BOX */}
          <input
            className="search-input"
            placeholder="Search altar servers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* SERVER LIST */}
          <div className="server-select-list">
            {filteredServers.map(server => (
              <div
                key={server}
                className={`server-item ${
                  assignedServers.includes(server) ? "selected" : ""
                }`}
                onClick={() => toggleServer(server)}
              >
                {server}
              </div>
            ))}
          </div>

          {/* SELECTED PREVIEW */}
          <div className="selected-preview">
            {assignedServers.map(server => (
              <span key={server} className="selected-chip">
                {server}
              </span>
            ))}
          </div>

          <button className="primary-btn" onClick={handleAltarAssign}>
            Assign Servers
          </button>

        </div>
      )}

      {/* GALLERY */}
      {activeTab === "Parish Gallery" && (
        <div className="head-card">
          <h2>Upload Parish Photos</h2>
          <input type="file" />
          <button className="primary-btn">Upload Photo</button>
        </div>
      )}

      {/* MEMBERS */}
      {activeTab === "Manage Members" && (
        <div className="head-card">
          <h2>Altar Servers</h2>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {altarServers.map((member, index) => (
                <tr key={index}>
                  <td>{member}</td>
                  <td>Altar Server</td>
                  <td>+91 98765432{index}</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
};

export default AltarHeadDashboard;