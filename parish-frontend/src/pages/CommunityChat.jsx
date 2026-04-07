import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./CommunityChat.css";
import { Link, useParams } from "react-router-dom";

const socket = io("http://localhost:5000");

function CommunityChat() {

  const { community } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // 🔥 Now user is OBJECT (id + name)
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: ""
  });

  const bottomRef = useRef(null);

  // ✅ Load user from localStorage
  useEffect(() => {
    const id = localStorage.getItem("familyId") || "Guest";
    const name = localStorage.getItem("userName") || "Guest";

    setCurrentUser({ id, name });
  }, []);

  // 🔹 Load old messages
  useEffect(() => {
    fetchMessages();
  }, [community]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/messages/${community}`
      );
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  // 🔥 Real-time listener
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      if (data.community === community) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === data.id)) return prev;
          return [...prev, data];
        });
      }
    });

    return () => socket.off("receiveMessage");
  }, [community]);

  // 🔹 Send message
  const sendMessage = () => {
    if (!message.trim()) return;

    const data = {
      id: Date.now() + Math.random(),
      text: message,
      user: {
        id: currentUser.id,
        name: currentUser.name
      },
      community: community,
      time: Date.now(),
    };

    socket.emit("sendMessage", data);
    setMessage("");
  };

  // 🔽 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">

      {/* HEADER */}
      <div className="chat-header">
        <Link to="/community-chats">← Back</Link>
        <h3>{community}</h3>
      </div>

      {/* MESSAGES */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={msg.id || index}
            className={`chat-bubble ${
              msg.user?.id === currentUser.id ? "my-msg" : ""
            }`}
          >
            <div style={{ fontSize: "12px", color: "gray" }}>
              {new Date(msg.time).toLocaleTimeString()}
            </div>

            <strong>
              {msg.user?.id === currentUser.id ? "You" : msg.user?.name}
            </strong>

            <p>{msg.text}</p>
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      {/* INPUT */}
      <div className="chat-input">
        <input
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendMessage}>Send</button>
      </div>

    </div>
  );
}

export default CommunityChat;