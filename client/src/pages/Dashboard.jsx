import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Tasks from "./Tasks";
import Timer from "./Timer";
import Revision from "./Revision";
import Analytics from "./Analytics";
import { Routes, Route } from "react-router-dom";
import Chart from "chart.js/auto";
import API from "../Services/api";
import axios from "axios";

// ---------------- STUDY CHART COMPONENT ----------------

function StudyChart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);


  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Study Minutes",
            data: data,
            backgroundColor: "rgba(75,192,192,0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [data]);

  return (
    <div style={{ height: "300px" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}


// ---------------- HOME CONTENT ----------------

function HomeContent({ user, tasks }) {

  const totalTasks = tasks.length;
  const [todayRevisions, setTodayRevisions] = useState([]);
  
  const fetchTodayRevisions = async () => {
  try {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/revisions/today",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setTodayRevisions(res.data);

  } catch (err) {
    console.log(err);
  }
};
const markRevised = async (id) => {
  try {

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/revisions/revise/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchTodayRevisions();

  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  fetchTodayRevisions();
}, []);

  const completedTasks = tasks.filter(
    t => t.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    t => t.status === "pending"
  ).length;

  const overdueTasks = tasks.filter(
    t =>
      t.deadline &&
      new Date(t.deadline) < new Date() &&
      t.status !== "completed"
  ).length;
  const previewTasks = tasks.slice(0, 3);

  const totalHours = 12;

  return (
    <>
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

      <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
  <div>Total Tasks: {totalTasks}</div>
  <div>Completed: {completedTasks}</div>
  <div>Pending: {pendingTasks}</div>
  <div>Total Study Hours: {totalHours}</div>
</div>
<h3 style={{ marginTop: "30px" }}>Revision Reminder</h3>

{todayRevisions.length === 0 ? (
  <p>No revisions today 🎉</p>
) : (
  todayRevisions.map((rev) => (
    <div
      key={rev._id}
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        marginBottom: "10px",
        background: "#fff"
      }}
    >
      <strong>{rev.topic}</strong> ({rev.subject})

      <button
        onClick={() => markRevised(rev._id)}
        style={{
          marginLeft: "10px",
          padding: "4px 8px",
          cursor: "pointer"
        }}
      >
        Mark Revised
      </button>
    </div>
  ))
)}
<h3 style={{ marginTop: "30px" }}>Upcoming Tasks</h3>

<div
  style={{
    display: "flex",
    gap: "15px",
    flexWrap: "wrap"
  }}
>
  {previewTasks.length === 0 ? (
    <p>No tasks yet</p>
  ) : (
    previewTasks.map((task) => (
      <div
        key={task._id}
        style={{
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          background: "#fff",
          minWidth: "180px",
          maxWidth: "220px"
        }}
      >
        <strong>{task.title}</strong>

        <div>Status: {task.status}</div>

        {task.deadline && (
          <div>
            Deadline: {new Date(task.deadline).toLocaleDateString()}
          </div>
        )}
      </div>
    ))
  )}
</div>
      {overdueTasks > 0 && (
        <div
          style={{
            background: "#fee2e2",
            padding: "12px",
            borderRadius: "6px",
            marginTop: "15px",
            color: "#991b1b",
            fontWeight: "bold"
          }}
        >
          ⚠ You have {overdueTasks} overdue task(s)
        </div>
      )}

      <div style={{ display: "flex", gap: "40px", marginTop: "30px" }}>
        <div style={{ flex: 1 }}>
          <Timer />
        </div>

        <div style={{ flex: 1 }}>
          <StudyChart data={[10, 20, 15, 30, 25, 0, 40]} />
        </div>
      </div>
    </>
  );
}


// ---------------- DASHBOARD ----------------

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  // FETCH TASKS
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        <Navbar />

        <Routes>

          {/* HOME */}
          <Route
            index
            element={<HomeContent user={user} tasks={tasks} />}
          />

          <Route path="tasks" element={<Tasks />} />
          <Route path="timer" element={<Timer />} />
          <Route path="revision" element={<Revision />} />
          <Route path="analytics" element={<Analytics />} />

        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;