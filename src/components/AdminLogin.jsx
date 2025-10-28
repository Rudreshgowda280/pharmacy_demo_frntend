import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/AdminLogin.css';

function AdminLogin() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ✅ Send login request to backend
      const response = await fetch('http://localhost:8080/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Invalid admin credentials');
      }

      const admin = await response.json();

      // ✅ Store logged-in admin in context + localStorage
      const userData = {
        email: admin.email,
        name: admin.name,
        id: admin.id,
        isAdmin: true
      };
      login(userData);

      // ✅ Redirect to admin dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-logo">
          <img src="/images/logoupdate.jpg" alt="Hyno Pharmacy Logo" />
          <h2>Admin Portal</h2>
        </div>
        <p className="admin-subtitle">Secure access for administrators only</p>

        {error && <div className="admin-error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Access Admin Panel'}
          </button>
        </form>

        <div className="admin-footer">
          <p>
            Authorized personnel only.{' '}
            <a href="/admin-register" className="admin-link">
              Register as Admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
