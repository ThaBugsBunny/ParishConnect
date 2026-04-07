import { useNavigate } from "react-router-dom";
import "./FamilyProfiles.css";

function FamilyProfiles() {

  const navigate = useNavigate();

  // Temporary family data (later from backend)
  const familyName = "Johnson Family";

  const members = [
    { name: "David Johnson", role: "Parish Member" },
    { name: "Sarah Johnson", role: "Parish Member" }
  ];

  const openProfile = (member) => {
    console.log("Logged in as:", member.name);

    // 🔥 THIS IS THE FIX
   localStorage.setItem("userName", member.name);
    navigate("/member-dashboard");
  };

  return (
    <div className="family-page">

      <div className="family-header">
        <h1>ParishConnect</h1>
        <p>Welcome, {familyName}</p>
      </div>

      <h3>Select Profile to Continue</h3>

      <div className="profile-list">
        {members.map((member, index) => (
          <div
            key={index}
            className="profile-card"
            onClick={() => openProfile(member)}
          >
            <div className="profile-left">
              <div className="avatar">👤</div>

              <div>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            </div>

            <span className="arrow">›</span>
          </div>
        ))}
      </div>

      <p
        className="signout"
        onClick={() => {
          localStorage.removeItem("user"); // optional but smart
          navigate("/login");
        }}
      >
        Sign Out Family Account
      </p>

    </div>
  );
}

export default FamilyProfiles;