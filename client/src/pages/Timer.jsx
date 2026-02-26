import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
function Timer() { 
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1, padding: "20px" }}>
                <Navbar />
                <h3>Focus Timer Placeholder</h3>
            </div>
        </div>
    );
 } 
 export default Timer;