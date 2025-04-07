import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.brand}>TravelPlanner</Link>
      </div>
      <div style={styles.right}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/itinerary" style={styles.link}>Itinerary</Link>
        {token && (
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        )}
        {token ? (
          <button
            onClick={handleLogout}
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#78909C')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#B2DFDB')}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#607D8B', // Soft Slate Gray
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  left: { flex: '1' },
  right: { display: 'flex', alignItems: 'center' },
  brand: {
    color: '#F5F7FA', // Off-White
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  link: {
    color: '#F5F7FA', // Off-White
    textDecoration: 'none',
    margin: '0 15px',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#B2DFDB', // Pale Teal
    color: '#37474F', // Dark Charcoal
    border: 'none',
    padding: '5px 15px',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default Navbar;