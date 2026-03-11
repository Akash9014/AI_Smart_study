import { useEffect, useState, useRef } from "react";
import API from "../Services/api";
import Chart from "chart.js/auto";

// Move constant outside component
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Analytics() {
  const [sessions, setSessions] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Fetch sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await API.get("/sessions");
        setSessions(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSessions();
  }, []);

  // Total study hours
  const totalMinutes = sessions.reduce(
    (acc, s) => acc + s.duration,
    0
  );
  const totalHours = (totalMinutes / 60).toFixed(2);

  // Chart rendering
  useEffect(() => {
    if (!chartRef.current) return;

    const weekData = Array(7).fill(0);

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(
      startOfWeek.getDate() - startOfWeek.getDay()
    );
console.log("Start of week:", startOfWeek);
console.log("All sessions:", sessions);
   sessions.forEach((s) => {
  const sessionDate = new Date(s.date);

  const sessionDay = new Date(
    sessionDate.getFullYear(),
    sessionDate.getMonth(),
    sessionDate.getDate()
  );

  if (sessionDay >= startOfWeek) {
    const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(startOfWeek.getDate() + 7);

sessions.forEach((s) => {

  const sessionDate = new Date(s.date);

  if (sessionDate >= startOfWeek && sessionDate < endOfWeek) {

    const dayIndex = sessionDate.getDay();
    weekData[dayIndex] += Number((s.duration / 60).toFixed(2)); // convert to hours
  }

});
  }
});
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: DAYS,
        datasets: [
          {
            label: "Study Hours",
            data: weekData,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      },
      options: {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        callback: function(value) {
          if (value < 1) {
            return (value * 60) + "m";
          }
          return value + "h";
        }
      }
    }
  }
}
    });
  }, [sessions]);

  return (
   

        <div style={{ padding: "20px" }}>
          <h2>Study Analytics</h2>
          <h3>Total Study Hours: {totalHours} hrs</h3>

          <div style={{ height: "400px" }}>
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
     
  );
}

export default Analytics;