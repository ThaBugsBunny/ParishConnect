import { useNavigate } from "react-router-dom";
import "./CommunityChats.css";

function CommunityChats() {

  const navigate = useNavigate();

  // Later comes from backend
  const userCommunities = [
    "Parish ",
    "Lectors Ministry",
   
  ];

  const openChat = (community) => {
    navigate(`/community-chat/${community}`);
  };

  return (
    <div className="community-page">

      <h1>Community Chats</h1>
      <p>Select a community to enter chat</p>

      <div className="community-list">
        {userCommunities.map((community) => (
          <div
            key={community}
            className="community-card"
            onClick={() => openChat(community)}
          >
            <h3>{community}</h3>
            <span>Enter Chat →</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default CommunityChats;