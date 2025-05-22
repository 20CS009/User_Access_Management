import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/requests', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setRequests(response.data.filter((req) => req.status === 'Pending'));
      } catch (err) {
        setError('Error fetching requests');
      }
    };
    fetchRequests();
  }, []);

  const handleManageRequest = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/requests/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setRequests(requests.filter((req) => req.id !== id));
    } catch (err) {
      setError('Error updating request');
    }
  };

  return (
    <div className="card p-4">
      <h2 className="card-title">Pending Requests</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Software</th>
              <th>Access Type</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.user.username}</td>
                <td>{req.software.name}</td>
                <td>{req.accessType}</td>
                <td>{req.reason}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleManageRequest(req.id, 'Approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleManageRequest(req.id, 'Rejected')}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingRequests;