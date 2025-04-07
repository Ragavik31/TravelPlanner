import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState(''); // Changed to email only
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email, // Using email only
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', error.response?.data || error.message); // Debug log
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(245, 247, 250, 0.9)', // Off-White (#F5F7FA)
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
          border: '1px solid #B2DFDB', // Pale Teal
        }}
      >
        <h1
          style={{
            color: '#37474F', // Dark Charcoal
            textAlign: 'center',
            marginBottom: '1.5rem',
            fontSize: '2rem',
          }}
        >
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1.5rem',
              borderRadius: '5px',
              border: '1px solid #B2DFDB', // Pale Teal
              backgroundColor: '#FFCCBC', // Light Peach
              color: '#37474F', // Dark Charcoal
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#78909C')}
            onBlur={(e) => (e.target.style.borderColor = '#B2DFDB')}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1.5rem',
              borderRadius: '5px',
              border: '1px solid #B2DFDB', // Pale Teal
              backgroundColor: '#FFCCBC', // Light Peach
              color: '#37474F', // Dark Charcoal
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#78909C')}
            onBlur={(e) => (e.target.style.borderColor = '#B2DFDB')}
          />
          {error && (
            <p
              style={{
                color: '#D32F2F', // Red
                fontSize: '0.9rem',
                textAlign: 'center',
                marginBottom: '1rem',
              }}
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#B2DFDB', // Pale Teal
              color: '#37474F', // Dark Charcoal
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#78909C')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#B2DFDB')}
          >
            Login
          </button>
        </form>
        <p
          style={{
            color: '#37474F', // Dark Charcoal
            textAlign: 'center',
            marginTop: '1rem',
            fontSize: '0.9rem',
          }}
        >
          Not registered?{' '}
          <Link
            to="/signup"
            style={{
              color: '#B2DFDB', // Pale Teal
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.color = '#78909C')}
            onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;