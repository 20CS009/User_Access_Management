import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ role, setRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setRole(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          User Access Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {role ? (
              <>
                {role === 'Admin' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/create-software">
                      Create Software
                    </Link>
                  </li>
                )}
                {role === 'Employee' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/request-access">
                      Request Access
                    </Link>
                  </li>
                )}
                {role === 'Manager' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/pending-requests">
                      Pending Requests
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;