import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
function Analytics() {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1, padding: "20px" }}>
                <Navbar />
                <h3>Analytics Dashboard Placeholder</h3>
            </div>
        </div>
    );
}
export default Analytics;