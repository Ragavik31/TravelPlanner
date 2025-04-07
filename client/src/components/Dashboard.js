import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [userData, setUserData] = useState({ username: '', email: '', joinedDate: '' });
  const [travelHistory, setTravelHistory] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError('Please log in to view your dashboard.');
        return;
      }

      try {
        // Fetch user details
        const userResponse = await axios.get('http://localhost:5000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { username, email, joinedDate } = userResponse.data;
        setUserData({ username, email, joinedDate });

        // Fetch travel history
        const itinerariesResponse = await axios.get('http://localhost:5000/api/itineraries', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTravelHistory(itinerariesResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data.');
      }
    };

    fetchData();
  }, [token]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        {userData.username ? `Welcome, ${userData.username} to Dashboard!!` : 'Dashboard'}
      </h1>

      {error ? (
        <p style={styles.error}>
          {error} <Link to="/login" style={styles.loginLink}>Login here</Link>
        </p>
      ) : (
        <>
          <section style={styles.userSection}>
            <h2 style={styles.sectionTitle}>User Details</h2>
            <div style={styles.userCard}>
              <p style={styles.userText}><strong>Username:</strong> {userData.username}</p>
              <p style={styles.userText}><strong>Email:</strong> {userData.email}</p>
              <p style={styles.userText}><strong>Joined Date:</strong> {new Date(userData.joinedDate).toLocaleDateString()}</p>
            </div>
          </section>

          <section style={styles.historySection}>
            <h2 style={styles.sectionTitle}>Travel History</h2>
            {travelHistory.length > 0 ? (
              <div style={styles.historyGrid}>
                {travelHistory.map((itinerary) => (
                  <div key={itinerary._id} style={styles.itineraryCard}>
                    <h3 style={styles.itineraryTitle}>{itinerary.title}</h3>
                    <p style={styles.itineraryText}>
                      Destination: {itinerary.destination}
                    </p>
                    <p style={styles.itineraryText}>
                      Dates: {new Date(itinerary.startDate).toLocaleDateString()} -{' '}
                      {new Date(itinerary.endDate).toLocaleDateString()}
                    </p>
                    <p style={styles.itineraryText}>Budget: ${itinerary.budget}</p>
                    <p style={styles.itineraryText}>Travelers: {itinerary.travelers}</p>
                    <button
                      style={styles.viewButton}
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#78909C')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#B2DFDB')}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p style={styles.noHistory}>No travel history yet. Start planning your first trip!</p>
            )}
          </section>

          <footer style={styles.footer}>
            <div style={styles.footerContent}>
              <div style={styles.footerSection}>
                <h3 style={styles.footerTitle}>TravelPlanner</h3>
                <p style={styles.footerText}>
                  Your ultimate companion for crafting unforgettable journeys with style and ease.
                </p>
              </div>
              <div style={styles.footerSection}>
                <h3 style={styles.footerTitle}>Quick Links</h3>
                <Link
                  to="/"
                  style={styles.footerLink}
                  onMouseOver={(e) => (e.target.style.color = '#FFCCBC')}
                  onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
                >
                  Home
                </Link>
                <Link
                  to="/itinerary"
                  style={styles.footerLink}
                  onMouseOver={(e) => (e.target.style.color = '#FFCCBC')}
                  onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
                >
                  Itinerary
                </Link>
                <Link
                  to="/login"
                  style={styles.footerLink}
                  onMouseOver={(e) => (e.target.style.color = '#FFCCBC')}
                  onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
                >
                  Login
                </Link>
              </div>
              <div style={styles.footerSection}>
                <h3 style={styles.footerTitle}>Contact Us</h3>
                <p style={styles.footerText}>
                  Email:{' '}
                  <a
                    href="mailto:tripplanner@gmail.com"
                    style={styles.footerLink}
                    onMouseOver={(e) => (e.target.style.color = '#FFCCBC')}
                    onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
                  >
                    tripplanner@gmail.com
                  </a>
                </p>
                <p style={styles.footerText}>Phone: +1-800-TRAVEL (Demo)</p>
                <p style={styles.footerText}>Address: 123 Wanderlust Lane, Globe City</p>
              </div>
            </div>
            <div style={styles.footerBottom}>
              <p style={styles.footerText}>
                © {new Date().getFullYear()} TravelPlanner. All rights reserved.
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, #F5F7FA 0%, #E0F2F1 100%)',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    color: '#37474F',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2.5rem',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  userSection: {
    maxWidth: '600px',
    margin: '0 auto 40px',
    padding: '20px',
  },
  sectionTitle: {
    color: '#37474F',
    fontSize: '2.2rem',
    textAlign: 'center',
    marginBottom: '1.5rem',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  userCard: {
    background: 'linear-gradient(135deg, #F5F7FA, #E0F2F1)',
    border: '2px solid #B2DFDB',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  userText: {
    color: '#37474F',
    fontSize: '1.1rem',
    margin: '0.75rem 0',
    lineHeight: '1.6',
  },
  historySection: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  historyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
  },
  itineraryCard: {
    background: 'linear-gradient(135deg, #F5F7FA, #E0F2F1)',
    border: '2px solid #B2DFDB',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.03)',
    },
  },
  itineraryTitle: {
    color: '#37474F',
    fontSize: '1.8rem',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  itineraryText: {
    color: '#37474F',
    fontSize: '1.1rem',
    margin: '0.5rem 0',
    lineHeight: '1.6',
  },
  viewButton: {
    backgroundColor: '#B2DFDB',
    color: '#37474F',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background-color 0.3s ease',
    width: '100%',
  },
  noHistory: {
    color: '#37474F',
    fontSize: '1.2rem',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'rgba(255, 235, 238, 0.3)',
    borderRadius: '10px',
    border: '1px solid #B2DFDB',
  },
  error: {
    color: '#D32F2F',
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '1.1rem',
    backgroundColor: '#FFEBEE',
    padding: '10px',
    borderRadius: '5px',
  },
  loginLink: {
    color: '#B2DFDB',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#FFCCBC',
      textDecoration: 'underline',
    },
  },
  footer: {
    background: 'linear-gradient(135deg, #607D8B, #455A64)',
    padding: '30px 20px',
    color: '#F5F7FA',
    borderTop: '2px solid #B2DFDB',
    marginTop: '40px',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '20px',
  },
  footerSection: {
    textAlign: 'center',
    maxWidth: '250px',
    padding: '15px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    backdropFilter: 'blur(5px)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  footerTitle: {
    color: '#FFCCBC',
    fontSize: '1.3rem',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  footerText: {
    color: '#F5F7FA',
    fontSize: '0.9rem',
    margin: '0.5rem 0',
    lineHeight: '1.5',
  },
  footerLink: {
    color: '#B2DFDB',
    textDecoration: 'none',
    display: 'block',
    margin: '0.5rem 0',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#FFCCBC',
    },
  },
  footerBottom: {
    textAlign: 'center',
    paddingTop: '15px',
    borderTop: '1px solid #B2DFDB',
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    marginTop: '15px',
  },
};

export default Dashboard;