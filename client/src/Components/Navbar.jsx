import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h3>Smart Study Assistant</h3>
      <div>
        {user && <span>Welcome {user.name}</span>}
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;