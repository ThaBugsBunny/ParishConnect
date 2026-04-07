import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Donation from "./pages/Donation";
import MassBooking from "./pages/MassBooking";
import AdminDashboard from "./pages/AdminDashboard";
import LectorHeadDashboard from "./pages/LectorHeadDashboard";
import AltarHeadDashboard from "./pages/AlterHeadDashboard";
import FamilyProfiles from "./pages/FamilyProfiles";
import MemberDashboard from "./pages/MemberDashboard";
import CommunityChat from "./pages/CommunityChat";
import CommunityChats from "./pages/CommunityChats";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/donate" element={<Donation />} />
      <Route path="/mass-booking" element={<MassBooking />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/altar-head-dashboard" element={<AltarHeadDashboard />} />
      <Route path="/lector-head-dashboard" element={<LectorHeadDashboard />} />
      <Route path="/family-profiles" element={<FamilyProfiles />} />
      <Route path="/member-dashboard" element={<MemberDashboard />} />
      <Route path="/community-chat/:community" element={<CommunityChat />} />
      <Route path="/community-chats" element={<CommunityChats />} />
    </Routes>
  );
} 

export default App;