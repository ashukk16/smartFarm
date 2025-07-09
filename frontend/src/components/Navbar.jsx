import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "../CSS/Navbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [role, setRole] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);

    if (storedRole === "FARMER") {
      fetchNotifications();
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await API.get("/notifications/farmer");
      const data = response.data || [];

      if (data.length > notifications.length) {
        toast.info("📢 New notification received!", { autoClose: 3000 });
      }

      setNotifications(data);
    } catch (err) {
      console.error("Notification fetch failed", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await API.put("/notifications/FARMER/mark-read");
      setNotifications([]);
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };

  if (!token) return null;

  return (
    <>
      <ToastContainer position="top-right" />
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top px-3">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/dashboard">
            🌱 SmartFarm
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`collapse navbar-collapse ${showMenu ? "show" : ""}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>

              {role === "FARMER" && (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/farms">Farms</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/soil/1">Soils</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/crops">Crops</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/farmerqueries">Queries</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/cropguideview">Guide</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/farmernotificationViewer">Alert</Link></li>
                </>
              )}

              {role === "EXPERT" && (
                <li className="nav-item"><Link className="nav-link" to="/expert">Expert Panel</Link></li>
              )}

              <li className="nav-item"><Link className="nav-link" to="/schemes">Schemes</Link></li>

              {role === "ADMIN" && (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/adminDashboard">Stats</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/schemes/add">Add Schemes</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/cropguide">Crop Guide</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/adminNotificationManager">AlertForFarmer</Link></li>
                </>
              )}
            </ul>

            <div className="d-flex align-items-center gap-3">
              {/* 🔔 Notification Bell */}
              {role === "FARMER" && (
                <div
                  className="dropdown"
                  onMouseEnter={() => {
                    if (!hovered && notifications.length > 0) {
                      setHovered(true);
                      markAllAsRead();
                    }
                  }}
                >
                  <button
                    className="btn btn-light position-relative"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    🔔
                    {notifications.length > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill">
                        {notifications.length}
                      </span>
                    )}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    {notifications.length === 0 ? (
                      <li className="dropdown-item text-muted">No new notifications</li>
                    ) : (
                      notifications.map((note, index) => (
                        <li key={index} className="dropdown-item small">
                          <strong>{note.title}</strong><br />
                          <span>{note.message}</span><br />
                          <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                            {formatDate(note.timestamp)}
                          </span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}

              {/* User Dropdown */}
              <div className="dropdown">
                <button
                  className="btn btn-outline-dark dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  {username} <span className="badge bg-warning text-dark ms-1">{role}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><span className="dropdown-item-text"><strong>ID:</strong> {username}</span></li>
                  <li><span className="dropdown-item-text"><strong>Role:</strong> {role}</span></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;