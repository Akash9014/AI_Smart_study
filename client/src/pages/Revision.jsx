import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
function Revision() {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <div style={{ flex: 1, padding: "20px" }}>
                <Navbar />
                <h3>Revision System Placeholder</h3>
            </div>
        </div>
    );
}
export default Revision;