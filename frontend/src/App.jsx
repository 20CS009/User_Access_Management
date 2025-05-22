import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import CreateSoftware from './components/CreateSoftware';
import RequestAccess from './components/RequestAccess';
import PendingRequests from './components/PendingRequests';

const App = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setRole(payload.role);
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <Router>
      <Navbar role={role} setRole={setRole} />
      <div className="container mt-4">
        <Routes>
          <Route path="/signup" element={<Signup setRole={setRole} />} />
          <Route path="/login" element={<Login setRole={setRole} />} />
          <Route
            path="/create-software"
            element={role === 'Admin' ? <CreateSoftware /> : <Navigate to="/login" />}
          />
          <Route
            path="/request-access"
            element={role === 'Employee' ? <RequestAccess /> : <Navigate to="/login" />}
          />
          <Route
            path="/pending-requests"
            element={role === 'Manager' ? <PendingRequests /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;