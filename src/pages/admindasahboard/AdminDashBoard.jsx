import { Outlet, Link } from "react-router-dom";

function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>

      {/* Sidebar */}
      <div style={{
        width: "250px",
        background: "#1e293b",
        color: "white",
        padding: "20px",
        height: "100vh"
      }}>
        <h2>Admin Panel</h2>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="overview">Dashboard</Link></li>
          <li><Link to="pending-opportunities">Pending Opportunities</Link></li>
          <li><Link to="pending-achievements">Pending Achievements</Link></li>
          <li><Link to="events">Manage Events</Link></li>
          <li><Link to="news">Manage News</Link></li>
          <li><Link to="users">Manage Users</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;