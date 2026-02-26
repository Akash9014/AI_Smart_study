import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Tasks from "./Tasks";
import Timer from "./Timer";
import Revision from "./Revision";
import Analytics from "./Analytics";
import { Routes, Route } from "react-router-dom";

function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Navbar />
        {user && (
  <div
    style={{
      padding: "20px",
      background: "#f1f5f9",
      borderRadius: "8px",
      marginBottom: "20px",
    }}
  >
    <h2>Welcome, {user.name}!</h2>
    <p>Check your tasks and start studying today.</p>
  </div>
)}
        <Routes>
          <Route path="/" element={<h2>Welcome to Smart Study Assistant</h2>} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/revision" element={<Revision />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;