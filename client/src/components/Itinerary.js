import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Itinerary() {
  const [tripDetails, setTripDetails] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    interests: '',
    budget: '',
    travelers: 1,
  });
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setItinerary(null);

    if (!token) {
      setError('Please log in to generate an itinerary.');
      return;
    }

    if (!tripDetails.destination || !tripDetails.startDate || !tripDetails.endDate || !tripDetails.interests) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/itineraries/generate',
        tripDetails,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItinerary(response.data.itinerary);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate itinerary.');
    }
  };

  return (
    <div style={styles.container}>
      {/* Embed the CSS with keyframes here */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <h1 style={styles.title}>Plan Your Itinerary</h1>

      {token ? (
        <section style={styles.formSection}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="destination"
              placeholder="Destination"
              value={tripDetails.destination}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="date"
              name="startDate"
              value={tripDetails.startDate}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="date"
              name="endDate"
              value={tripDetails.endDate}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="text"
              name="interests"
              placeholder="Interests (e.g., culture, adventure, food)"
              value={tripDetails.interests}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="number"
              name="budget"
              placeholder="Budget (USD)"
              value={tripDetails.budget}
              onChange={handleChange}
              style={styles.input}
              min="0"
            />
            <input
              type="number"
              name="travelers"
              placeholder="Number of Travelers"
              value={tripDetails.travelers}
              onChange={handleChange}
              style={styles.input}
              min="1"
            />
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#78909C')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#B2DFDB')}
            >
              Generate Itinerary
            </button>
          </form>
          {error && <p style={styles.error}>{error}</p>}
          {itinerary && (
            <div style={styles.itinerarySection}>
              <h2 style={styles.sectionTitle}>Your Itinerary</h2>
              <div style={styles.itineraryCard}>
                <h3 style={styles.itineraryTitle}>{itinerary.title}</h3>
                <p style={styles.itineraryText}>Destination: {itinerary.destination}</p>
                <p style={styles.itineraryText}>
                  Dates: {new Date(itinerary.startDate).toLocaleDateString()} -{' '}
                  {new Date(itinerary.endDate).toLocaleDateString()}
                </p>
                <h4 style={styles.itinerarySubtitle}>Daily Plan:</h4>
                {itinerary.days.map((day, index) => (
                  <div key={index} style={styles.dayCard}>
                    <p style={styles.dayText}>
                      <strong>Day {index + 1} ({new Date(day.date).toLocaleDateString()}):</strong>{' '}
                      {day.activity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ) : (
        <section style={styles.messageSection}>
          <p style={styles.message}>
            Please log in to access the itinerary planner.{' '}
            <Link
              to="/login"
              style={styles.loginLink}
              onMouseOver={(e) => (e.target.style.color = '#78909C')}
              onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
            >
              Login here
            </Link>
          </p>
        </section>
      )}

      {/* Enhanced Footer */}
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
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Stay Connected</h3>
            <p style={styles.footerText}>Follow us for travel inspiration:</p>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.footerLink}
              onMouseOver={(e) => (e.target.style.color = '#FFCCBC')}
              onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.footerLink}
              onMouseOver={(e) => (e.target.style.color = '#FFCCBC')}
              onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.footerLink}
              onMouseOver={(e) => (e.target.style.color = '#FFCCBC')}
              onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
            >
              Instagram
            </a>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.footerText}>
            © {new Date().getFullYear()} TravelPlanner. All rights reserved.
          </p>
          <div style={styles.footerBottomLinks}>
            <Link
              to="/privacy"
              style={styles.footerLink}
              onMouseOver={(e) => (e.target.style.color = '#FFCCBC')}
              onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              style={styles.footerLink}
              onMouseOver={(e) => (e.target.style.color = '#FFCCBC')}
              onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, #F5F7FA 0%, #E0F2F1 100%)',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
  },
  title: {
    color: '#37474F',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2.5rem',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 1s ease-in', // Reference the embedded keyframes
  },
  formSection: {
    maxWidth: '700px',
    margin: '0 auto',
    background: 'linear-gradient(135deg, rgba(255, 204, 188, 0.3), rgba(255, 235, 238, 0.3))',
    padding: '30px',
    borderRadius: '15px',
    border: '2px solid #B2DFDB',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    width: '100%',
    padding: '1rem',
    borderRadius: '8px',
    border: '2px solid #B2DFDB',
    backgroundColor: '#FFCCBC',
    color: '#37474F',
    fontSize: '1.1rem',
    outline: 'none',
  },
  button: {
    background: 'linear-gradient(90deg, #B2DFDB, #A7C4BC)',
    color: '#37474F',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
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
  itinerarySection: {
    marginTop: '50px',
    animation: 'fadeIn 1.5s ease-in', // Reference the embedded keyframes
  },
  sectionTitle: {
    color: '#37474F',
    fontSize: '2.2rem',
    textAlign: 'center',
    marginBottom: '2rem',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  itineraryCard: {
    background: 'linear-gradient(135deg, #F5F7FA, #E0F2F1)',
    border: '2px solid #B2DFDB',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  },
  itineraryTitle: {
    color: '#37474F',
    fontSize: '2rem',
    marginBottom: '1.5rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  itineraryText: {
    color: '#37474F',
    fontSize: '1.1rem',
    margin: '0.75rem 0',
    lineHeight: '1.6',
  },
  itinerarySubtitle: {
    color: '#37474F',
    fontSize: '1.7rem',
    marginTop: '1.5rem',
    marginBottom: '1rem',
    borderBottom: '1px solid #B2DFDB',
    paddingBottom: '5px',
  },
  dayCard: {
    borderTop: '1px dashed #B2DFDB',
    paddingTop: '1rem',
    marginTop: '1rem',
  },
  dayText: {
    color: '#37474F',
    fontSize: '1.1rem',
    lineHeight: '1.6',
  },
  messageSection: {
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'rgba(255, 235, 238, 0.3)',
    borderRadius: '10px',
    border: '1px solid #B2DFDB',
  },
  message: {
    color: '#37474F',
    fontSize: '1.3rem',
    fontWeight: '500',
  },
  loginLink: {
    color: '#B2DFDB',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  footer: {
    background: 'linear-gradient(135deg, #607D8B, #455A64)',
    padding: '50px 20px',
    color: '#F5F7FA',
    borderTop: '3px solid #B2DFDB',
    marginTop: '50px',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '30px',
    marginBottom: '30px',
  },
  footerSection: {
    textAlign: 'center',
    maxWidth: '300px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
  },
  footerTitle: {
    color: '#FFCCBC',
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  footerText: {
    color: '#F5F7FA',
    fontSize: '1rem',
    margin: '0.75rem 0',
    lineHeight: '1.6',
  },
  footerLink: {
    color: '#B2DFDB',
    textDecoration: 'none',
    display: 'block',
    margin: '0.75rem 0',
  },
  footerBottom: {
    textAlign: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #B2DFDB',
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    marginTop: '20px',
  },
  footerBottomLinks: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'center',
    gap: '25px',
    flexWrap: 'wrap',
  },
};

export default Itinerary;