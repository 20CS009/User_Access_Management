import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestAccess = () => {
  const [softwareList, setSoftwareList] = useState([]);
  const [softwareId, setSoftwareId] = useState('');
  const [accessType, setAccessType] = useState('Read');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/software', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSoftwareList(response.data);
      } catch (err) {
        setError('Error fetching software list');
      }
    };
    fetchSoftware();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/requests',
        { softwareId, accessType, reason },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setSuccess('Access request submitted');
      setSoftwareId('');
      setAccessType('Read');
      setReason('');
    } catch (err) {
      setError('Error submitting request');
    }
  };

  return (
    <div className="card p-4">
      <h2 className="card-title">Request Access</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="software" className="form-label">
            Software
          </label>
          <select
            className="form-select"
            id="software"
            value={softwareId}
            onChange={(e) => setSoftwareId(e.target.value)}
            required
          >
            <option value="">Select Software</option>
            {softwareList.map((software) => (
              <option key={software.id} value={software.id}>
                {software.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="accessType" className="form-label">
            Access Type
          </label>
          <select
            className="form-select"
            id="accessType"
            value={accessType}
            onChange={(e) => setAccessType(e.target.value)}
            required
          >
            <option value="Read">Read</option>
            <option value="Write">Write</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="reason" className="form-label">
            Reason
          </label>
          <textarea
            className="form-control"
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestAccess;