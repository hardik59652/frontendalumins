import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [adminName, setAdminName] = useState("Admin");

  const [stats, setStats] = useState({
    totalAlumni: 0,
    activeJobs: 0,
    totalDonations: 0,
    pendingApprovals: 0
  });
  
  const [actionQueue, setActionQueue] = useState([]);
  const [systemLogs, setSystemLogs] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/admin/overview", {
        withCredentials: true
      });

      if (res.data?.data) {
        setStats(res.data.data.stats);
        setActionQueue(res.data.data.actionQueue || []);
        setSystemLogs(res.data.data.systemLogs || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setAdminName(user.name || user.fullName || "System Admin");
    } catch (e) {
      setAdminName("System Admin");
    }

    fetchDashboardData().finally(() => setIsLoading(false));

    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchDashboardData();
      }
    }, 80); 

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <p style={{ fontWeight: 'bold', color: '#666' }}>Loading Dashboard Data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      
      <div style={{ borderBottom: '2px solid #eee', paddingBottom: '15px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ 
  margin: '0 0 5px 0', 
  fontSize: '24px', 
  color: '#0f172a', 
  fontWeight: '500',
  letterSpacing: '-0.5px' 
}}>
  Welcome, {adminName.split(' ')[0]}
</h1>
          </div>
       
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '4px', backgroundColor: '#fff' }}>
          <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', marginBottom: '5px' }}>Total Alumni</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats.totalAlumni.toLocaleString()}</div>
        </div>

        <div style={{ border: stats.pendingApprovals > 0 ? '1px solid #ff9800' : '1px solid #ddd', padding: '20px', borderRadius: '4px', backgroundColor: stats.pendingApprovals > 0 ? '#fffdf5' : '#fff' }}>
          <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', marginBottom: '5px' }}>Pending Approvals</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: stats.pendingApprovals > 0 ? '#d84315' : '#333' }}>{stats.pendingApprovals}</div>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '4px', backgroundColor: '#fff' }}>
          <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', marginBottom: '5px' }}>Donation Volume</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>₹{stats.totalDonations.toLocaleString()}</div>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '4px', backgroundColor: '#fff' }}>
          <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', marginBottom: '5px' }}>Active Jobs</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats.activeJobs}</div>
        </div>

      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        <div style={{ flex: '2', minWidth: '300px', border: '1px solid #ddd', backgroundColor: '#fff', borderRadius: '4px' }}>
          <div style={{ padding: '15px', borderBottom: '1px solid #ddd', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'space-between' }}>
            <strong style={{ fontSize: '14px', color: '#444' }}>Administrative Queue</strong>
            <span style={{ fontSize: '12px', background: '#eee', padding: '2px 6px', borderRadius: '3px' }}>{actionQueue.length} Pending</span>
          </div>
          
          <div style={{ padding: '0', maxHeight: '400px', overflowY: 'auto' }}>
            {actionQueue.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <tbody>
                  {actionQueue.map((item, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '15px', color: '#222' }}>
                        <strong>{item.title}</strong>
                        <div style={{ fontSize: '12px', color: '#777', marginTop: '4px' }}>
                          Type: {item.type.toUpperCase()} | By: {item.user} | {item.time}
                        </div>
                      </td>
                      <td style={{ padding: '15px', textAlign: 'right' }}>
                        <button 
                          onClick={() => navigate(item.path)}
                          style={{ padding: '6px 12px', cursor: 'pointer', background: '#333', color: '#fff', border: 'none', borderRadius: '3px', fontSize: '12px' }}
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                <p>No pending approvals required at this time.</p>
              </div>
            )}
          </div>
        </div>

        <div style={{ flex: '1', minWidth: '250px', border: '1px solid #ddd', backgroundColor: '#fff', borderRadius: '4px' }}>
          <div style={{ padding: '15px', borderBottom: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
            <strong style={{ fontSize: '14px', color: '#444' }}>System Activity</strong>
          </div>
          
          <div style={{ padding: '15px', maxHeight: '400px', overflowY: 'auto' }}>
            {systemLogs.length > 0 ? (
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {systemLogs.map((log, index) => (
                  <li key={index} style={{ marginBottom: '15px', borderLeft: '2px solid #ccc', paddingLeft: '10px' }}>
                    <div style={{ fontSize: '11px', color: '#888', marginBottom: '2px' }}>{log.time}</div>
                    <div style={{ fontSize: '13px', color: '#333' }}>{log.text}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>
                <p>No recent activity logs.</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;