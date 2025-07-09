import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [farmId, setFarmId] = useState(null);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.get('/api/user/role', config)
      .then((res) => {
        const fetchedRole = res.data.role;
        setRole(fetchedRole);
        setUsername(userId);

        if (fetchedRole === 'FARMER') {
          axios.get(`/api/farms/user/${userId}`, config)
            .then((res) => {
              if (res.data.length > 0) {
                setFarmId(res.data[0].id);
              }
            });
        }
      });
  }, [token, userId]);

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h2>Welcome to SmartFarm</h2>
        <p className="text-muted">Your Agriculture Companion</p>
      </div>

      <div className="row text-center mb-4">
        <div className="col-md-4">
          <div className="card p-3">
            <h6>Username</h6>
            <p>{username}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h6>Role</h6>
            <p>{role}</p>
          </div>
        </div>
        {role === 'FARMER' && farmId && (
          <div className="col-md-4">
            <div className="card p-3">
              <h6>Farm ID</h6>
              <p>{farmId}</p>
            </div>
          </div>
        )}
      </div>

      {role === 'FARMER' && (
        <>
          <h4 className="mb-3">Farmer Actions</h4>
          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <div className="card p-3" onClick={() => navigate("/farms")} style={{ cursor: "pointer" }}>
                <h5>Manage Farms</h5>
                <p>View or update your land data</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card p-3" onClick={() => navigate("/crops")} style={{ cursor: "pointer" }}>
                <h5>Track Crops</h5>
                <p>Monitor crop details</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card p-3" onClick={() => navigate("/soil/1")} style={{ cursor: "pointer" }}>
                <h5>Soil Data</h5>
                <p>Check or add soil quality</p>
              </div>
            </div>
          </div>
        </>
      )}

      {role === 'EXPERT' && (
        <>
          <h4 className="mb-3">Expert Actions</h4>
          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <div className="card p-3" onClick={() => navigate("/expert")} style={{ cursor: "pointer" }}>
                <h5>Answer Queries</h5>
                <p>Provide advice to farmers</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;