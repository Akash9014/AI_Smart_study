const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config();
const express = require("express");

// Load environment variables

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));
app.use('/api/auth', require('./routes/auth'));
app.use("/api/tasks", require("./routes/task"));

app.get("/", (req, res) => {
  res.send("Backend running");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});