import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css'; // Reuse same CSS

function AdminRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const { name, email, password, confirmPassword } = formData;

    // Password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // ✅ Send registration request to backend API
      const response = await fetch('http://localhost:8080/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setSuccess('Admin registered successfully!');
        setTimeout(() => navigate('/admin-login'), 1500); // Redirect after success
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-logo">
          <img src="/images/logoupdate.jpg" alt="Hyno Pharmacy Logo" />
          <h2>Admin Registration</h2>
        </div>
        <p className="admin-subtitle">Register as an administrator</p>

        {error && <div className="admin-error-message">{error}</div>}
        {success && <div className="admin-success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="name">Full Name</label>
            <div className="admin-input-wrapper">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
              <span className="input-icon">👤</span>
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="email">Email Address</label>
            <div className="admin-input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter admin email"
                required
              />
              <span className="input-icon">📧</span>
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <div className="admin-input-wrapper">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
              <span className="input-icon">🔒</span>
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="admin-input-wrapper">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
              <span className="input-icon">🔒</span>
            </div>
          </div>

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register Admin'}
          </button>
        </form>

        <div className="admin-footer">
          <p>
            Already have an account?{' '}
            <a href="/admin-login" className="admin-link">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
