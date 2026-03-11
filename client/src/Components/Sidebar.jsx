// import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";


function Sidebar() {
  return (
    <div
      style={{
        width: "200px",
        background: "#1e293b",
        color: "white",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ color: "white" }}>StudyAI</h2>

      <nav style={{ marginTop: "30px" }}>
      </nav>
      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link to="/dashboard" style={{ color: "white" }}>Home</Link>
        <Link to="/dashboard/tasks" style={{ color: "white" }}>Tasks</Link>
        <Link to="/dashboard/timer" style={{ color: "white" }}>Focus Timer</Link>
        <Link to="/dashboard/revision" style={{ color: "white" }}>Revision</Link>
        <Link to="/dashboard/analytics" style={{ color: "white" }}>Analytics</Link>
      </div>
    </div>

  );
}

export default Sidebar;