import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordHint, setPasswordHint] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!username || username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long.';
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      newErrors.username = 'Username must contain only letters and numbers.';
    }

    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Password validation
    if (!password || password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) {
      newErrors.password =
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }

    // Confirm Password validation
    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // Password Hint validation
    if (!passwordHint || passwordHint.length < 3) {
      newErrors.passwordHint = 'Password hint must be at least 3 characters long.';
    } else if (passwordHint.toLowerCase() === password.toLowerCase()) {
      newErrors.passwordHint = 'Password hint cannot be the same as the password.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await axios.post('/api/auth/signup', {
        username,
        email,
        password,
        passwordHint,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ server: error.response?.data.message || 'Signup failed. Please try again.' });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Join TravelPlanner</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#78909C')}
              onBlur={(e) => (e.target.style.borderColor = '#B2DFDB')}
            />
            {errors.username && <span style={styles.error}>{errors.username}</span>}
          </div>
          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#78909C')}
              onBlur={(e) => (e.target.style.borderColor = '#B2DFDB')}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>
          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#78909C')}
              onBlur={(e) => (e.target.style.borderColor = '#B2DFDB')}
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>
          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#78909C')}
              onBlur={(e) => (e.target.style.borderColor = '#B2DFDB')}
            />
            {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}
          </div>
          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Password Hint (e.g., 'First pet’s name')"
              value={passwordHint}
              onChange={(e) => setPasswordHint(e.target.value)}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#78909C')}
              onBlur={(e) => (e.target.style.borderColor = '#B2DFDB')}
            />
            {errors.passwordHint && <span style={styles.error}>{errors.passwordHint}</span>}
          </div>
          {errors.server && <span style={styles.errorServer}>{errors.server}</span>}
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#78909C')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#B2DFDB')}
          >
            Signup
          </button>
        </form>
        <p style={styles.linkText}>
          Already registered?{' '}
          <Link
            to="/login"
            style={styles.link}
            onMouseOver={(e) => (e.target.style.color = '#78909C')}
            onMouseOut={(e) => (e.target.style.color = '#B2DFDB')}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  formContainer: {
    backgroundColor: 'rgba(245, 247, 250, 0.9)', // Off-White with transparency
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid #B2DFDB', // Pale Teal
  },
  title: {
    color: '#37474F', // Dark Charcoal
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '5px',
    border: '1px solid #B2DFDB', // Pale Teal
    backgroundColor: '#FFCCBC', // Light Peach
    color: '#37474F', // Dark Charcoal
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  error: {
    color: '#D32F2F', // Red for errors
    fontSize: '0.8rem',
    marginTop: '0.25rem',
  },
  errorServer: {
    color: '#D32F2F', // Red for errors
    fontSize: '0.9rem',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  button: {
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
  },
  linkText: {
    color: '#37474F', // Dark Charcoal
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.9rem',
  },
  link: {
    color: '#B2DFDB', // Pale Teal
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
};

export default Signup;