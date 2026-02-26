import { NavLink } from "react-router-dom";

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

      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            display: "block",
            margin: "10px 0",
            color: isActive ? "#38bdf8" : "white",
            textDecoration: "none",
          })}
        >
          Home
        </NavLink>

        <NavLink
          to="/tasks"
          style={({ isActive }) => ({
            display: "block",
            margin: "10px 0",
            color: isActive ? "#38bdf8" : "white",
            textDecoration: "none",
          })}
        >
          Tasks
        </NavLink>

        <NavLink
          to="/timer"
          style={({ isActive }) => ({
            display: "block",
            margin: "10px 0",
            color: isActive ? "#38bdf8" : "white",
            textDecoration: "none",
          })}
        >
          Focus Timer
        </NavLink>

        <NavLink
          to="/revision"
          style={({ isActive }) => ({
            display: "block",
            margin: "10px 0",
            color: isActive ? "#38bdf8" : "white",
            textDecoration: "none",
          })}
        >
          Revision
        </NavLink>

        <NavLink
          to="/analytics"
          style={({ isActive }) => ({
            display: "block",
            margin: "10px 0",
            color: isActive ? "#38bdf8" : "white",
            textDecoration: "none",
          })}
        >
          Analytics
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;