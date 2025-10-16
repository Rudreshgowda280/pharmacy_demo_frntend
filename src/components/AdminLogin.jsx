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
      // Validate admin credentials
      if (formData.email === 'admin@hynopharmacy.com' && formData.password === 'admin123') {
        const userData = {
          email: formData.email,
          name: 'Admin',
          id: 'admin123',
          isAdmin: true
        };
        login(userData);
        navigate('/admin');
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (error) {
      setError(error.message);
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
          <p>Authorized personnel only. <a href="/" className="admin-link">Return to Store</a></p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
