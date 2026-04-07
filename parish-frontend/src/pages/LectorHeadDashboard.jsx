import React, { useState } from "react";
import "./LectorHeadDashboard.css";

const LectorHeadDashboard = () => {

  const [activeTab, setActiveTab] = useState("Announcements");

  const members = [
    "John Johnson",
    "Maria Garcia",
    "Anthony Dsouza",
    "Peter Fernandes",
  ];

  /* =====================
     ASSIGN READINGS STATE
  ====================== */

  const [readingDate, setReadingDate] = useState("");
  const [massTime, setMassTime] = useState("");

  const [assignments, setAssignments] = useState([
    { type: "First Reading", person: "", custom: "", search: "" }
  ]);

  /* ADD NEW READING */
  const addReading = () => {
    setAssignments([
      ...assignments,
      { type: "First Reading", person: "", custom: "", search: "" }
    ]);
  };

  /* UPDATE FIELD */
  const updateAssignment = (index, field, value) => {
    const updated = [...assignments];
    updated[index][field] = value;
    setAssignments(updated);
  };

  /* SELECT PERSON */
  const selectPerson = (index, name) => {
    const updated = [...assignments];
    updated[index].person = name;
    updated[index].search = "";
    setAssignments(updated);
  };

  /* SAVE */
  const handleAssign = () => {
    if (!readingDate || !massTime) {
      alert("Please select date and time");
      return;
    }

    console.log({
      date: readingDate,
      time: massTime,
      readings: assignments
    });

    alert("Readings Assigned Successfully!");
  };

  return (
    <div className="head-container">

      {/* HEADER */}
      <div className="head-header">
        <div>
          <h1>Parish Pastoral Council Portal</h1>
          <p>Lectors Ministry Dashboard</p>
        </div>

        <div className="session">
          Active Session: HEAD_LECTORS
        </div>
      </div>

      {/* STATS */}
      <div className="head-stats">
        <div className="stat-card">
          <p>Total Lectors</p>
          <h2>{members.length}</h2>
        </div>

        <div className="stat-card">
          <p>Upcoming Masses</p>
          <h2>12</h2>
        </div>

        <div className="stat-card">
          <p>Assignments</p>
          <h2>{assignments.length}</h2>
        </div>
      </div>

      {/* TABS */}
      <div className="head-tabs">
        {[
          "Announcements",
          "Parish Gallery",
          "Manage Members",
          "Assign Readings"
        ].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? "active-tab" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ANNOUNCEMENTS */}
      {activeTab === "Announcements" && (
        <div className="head-card">
          <h2>Post Parish Announcement</h2>

          <label>Title</label>
          <input placeholder="e.g., Mandatory Rehearsal" />

          <label>Message</label>
          <textarea placeholder="Details about the announcement..." />

          <button className="primary-btn">
            Send SMS Alerts & Post
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
          <h2>Community Members</h2>

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
              {members.map((member, index) => (
                <tr key={index}>
                  <td>{member}</td>
                  <td>Reader</td>
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

      {/* ASSIGN READINGS */}
      {activeTab === "Assign Readings" && (
        <div className="head-card">

          <h2>Assign Mass Readings</h2>

          <div className="row">
            <div>
              <label>Date</label>
              <input
                type="date"
                value={readingDate}
                onChange={(e) => setReadingDate(e.target.value)}
              />
            </div>

            <div>
              <label>Mass Time</label>
              <select
                value={massTime}
                onChange={(e) => setMassTime(e.target.value)}
              >
                <option value="">Select Time</option>
                <option>7:00 AM</option>
                <option>9:00 AM</option>
                <option>6:00 PM</option>
              </select>
            </div>
          </div>

          <h4>Readings</h4>

          {assignments.map((item, index) => {

            const filteredMembers = members.filter(m =>
              m.toLowerCase().includes(item.search.toLowerCase())
            );

            return (
              <div key={index} className="reading-row">

                {/* Reading Type */}
                <select
                  value={item.type}
                  onChange={(e) =>
                    updateAssignment(index, "type", e.target.value)
                  }
                >
                  <option>First Reading</option>
                  <option>Responsorial Psalm</option>
                  <option>Second Reading</option>
                  <option>Prayer of the Faithful</option>
                  <option>Custom</option>
                </select>

                {/* Custom */}
                {item.type === "Custom" && (
                  <input
                    placeholder="Custom Reading"
                    value={item.custom}
                    onChange={(e) =>
                      updateAssignment(index, "custom", e.target.value)
                    }
                  />
                )}

                {/* SEARCH PERSON */}
                <div className="lector-selector">

                  <input
                    className="search-input"
                    placeholder="Search lector..."
                    value={item.search}
                    onChange={(e) =>
                      updateAssignment(index, "search", e.target.value)
                    }
                  />

                  <div className="server-select-list">
                    {filteredMembers.map(name => (
                      <div
                        key={name}
                        className={`server-item ${
                          item.person === name ? "selected" : ""
                        }`}
                        onClick={() => selectPerson(index, name)}
                      >
                        {name}
                      </div>
                    ))}
                  </div>

                  {item.person && (
                    <div className="selected-chip">
                      Assigned: {item.person}
                    </div>
                  )}

                </div>

              </div>
            );
          })}

          <button className="add-reading-btn" onClick={addReading}>
            + Add Reading
          </button>

          <button className="primary-btn" onClick={handleAssign}>
            Save Assignments
          </button>

        </div>
      )}

    </div>
  );
};

export default LectorHeadDashboard;