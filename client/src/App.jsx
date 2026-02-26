import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Revision from "./pages/Revision";
import Analytics from "./pages/Analytics";
import Timer from "./pages/Timer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Tasks" element={<Tasks />} />
      <Route path="/Revision" element={<Revision />} />
      <Route path="/Analytics" element={<Analytics />} />
      <Route path="/Timer" element={<Timer />} />
    </Routes>
  );
}
export default App;