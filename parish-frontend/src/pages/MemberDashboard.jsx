import { useState } from "react";
import { Link } from "react-router-dom";
import "./MemberDashboard.css";

function MemberDashboard() {

  const [activeTab, setActiveTab] = useState("Dashboard");

  /* =========================
     MEMBER COMMUNITIES DATA
  ========================= */

  const communities = [
    {
      name: "Lectors Ministry",
      announcements: [
        "Sunday roster updated",
        "Practice on Friday evening"
      ],
      members: [
        "Maria Garcia",
        "John Johnson",
        "Anthony Dsouza"
      ]
    },
    
  ];

  return (
    <div className="member-container">

      {/* HEADER */}
      <div className="member-header">
        <div>
          <h1>Parish Home</h1>
          <p>| Maria Garcia</p>
        </div>

        {/* COMMUNITY CHAT LINK */}
        <Link to="/community-chats">
          <button className="chat-btn">
            💬 Community Chat
          </button>
        </Link>
      </div>

      {/* TABS */}
      <div className="member-tabs">
        {["Communities", "Parish Gallery"].map(tab => (
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
      {/* COMMUNITIES TAB */}
      {/* ========================= */}
      {activeTab === "Communities" && (
        <div>

          <h2>Your Communities</h2>

          {communities.map((community, index) => (
            <div key={index} className="community-card">

              {/* COMMUNITY NAME */}
              <h3>{community.name}</h3>

              {/* ANNOUNCEMENTS */}
              <div className="community-section">
                <h4>Recent Announcements</h4>
                {community.announcements.map((a, i) => (
                  <p key={i} className="announcement-item">
                    • {a}
                  </p>
                ))}
              </div>

              {/* MEMBERS LIST */}
              <div className="community-section">
                <h4>Members</h4>
                <div className="member-list">
                  {community.members.map((m, i) => (
                    <span key={i} className="member-chip">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* ========================= */}
      {/* PARISH GALLERY TAB */}
      {/* ========================= */}
      {activeTab === "Parish Gallery" && (
        <div className="placeholder">
          <h2>Parish Gallery</h2>
          <p>Photos uploaded by parish admins.</p>
        </div>
      )}

    </div>
  );
}

export default MemberDashboard;