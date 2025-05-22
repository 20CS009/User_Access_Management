import React, { useState } from 'react';
import axios from 'axios';

const CreateSoftware = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessLevels, setAccessLevels] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAccessLevelChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setAccessLevels([...accessLevels, value]);
    } else {
      setAccessLevels(accessLevels.filter((level) => level !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/software',
        { name, description, accessLevels },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setSuccess('Software created successfully');
      setName('');
      setDescription('');
      setAccessLevels([]);
    } catch (err) {
      setError('Error creating software');
    }
  };

  return (
    <div className="card p-4">
      <h2 className="card-title">Create Software</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Software Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Access Levels</label>
          <div>
            {['Read', 'Write', 'Admin'].map((level) => (
              <div className="form-check" key={level}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={level}
                  onChange={handleAccessLevelChange}
                  checked={accessLevels.includes(level)}
                />
                <label className="form-check-label">{level}</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Software
        </button>
      </form>
    </div>
  );
};

export default CreateSoftware;