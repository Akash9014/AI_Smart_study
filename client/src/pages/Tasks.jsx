import { useState, useEffect } from "react";
import API from "../Services/api";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

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

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", {
        title,
        description,
        priority,
      });

      setTitle("");
      setDescription("");
      setPriority("medium");

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleComplete = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        status: task.status === "completed" ? "pending" : "completed",
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        <Navbar />

        <h2>Task Manager</h2>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginLeft: "10px" }}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button type="submit" style={{ marginLeft: "10px" }}>
            Add Task
          </button>
        </form>

        {/* Task List */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task._id}
              style={{
                margin: "10px 0",
                padding: "10px",
                border: "1px solid #ccc",
                background:
                  task.status === "completed" ? "#d1fae5" : "#fff",
              }}
            >
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>Status: {task.status}</p>

              <button onClick={() => handleComplete(task)}>
                Toggle Complete
              </button>

              <button
                onClick={() => handleDelete(task._id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tasks;