import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PatientBasicInfo.css';

function PatientBasicInfo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store basic info in localStorage or context if needed
    localStorage.setItem('patientBasicInfo', JSON.stringify(formData));
    // Navigate to patient form
    navigate('/patient-form');
  };

  return (
    <div className="patient-basic-info-container">
      <h2>Basic Patient Information</h2>
      <form onSubmit={handleSubmit} className="basic-info-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">👤 Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">📧 Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">📞 Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">⚥ Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <button type="submit" className="submit-button">Next</button>
      </form>
    </div>
  );
}

export default PatientBasicInfo;
