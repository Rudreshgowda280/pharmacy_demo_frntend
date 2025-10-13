import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PatientForm.css';

function PatientForm() {
  const [formData, setFormData] = useState({
    patientId: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    emergencyPhone: ''
  });

  // Load basic info from localStorage if available
  React.useEffect(() => {
    const basicInfo = localStorage.getItem('patientBasicInfo');
    if (basicInfo) {
      const parsed = JSON.parse(basicInfo);
      setFormData(prev => ({
        ...prev,
        name: parsed.name,
        email: parsed.email,
        phone: parsed.phone,
        gender: parsed.gender
      }));
    }
  }, []);

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const alertMessage = `
Patient ID: ${formData.patientId}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Gender: ${formData.gender}
Date of Birth: ${formData.dateOfBirth}
Emergency Contact Phone: ${formData.emergencyPhone}
    `;
    alert(alertMessage.trim());
    // Reset form
    setFormData({
      patientId: '',
      name: '',
      email: '',
      phone: '',
      gender: '',
      dateOfBirth: '',
      emergencyPhone: ''
    });
    // Redirect to prescription page
    navigate('/prescription');
  };

  return (
    <div className="patient-form-container">
      <h2>Patient Information Form</h2>
      <form onSubmit={handleSubmit} className="patient-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="patientId">🆔 Patient ID:</label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
            />
          </div>
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
        </div>
        <div className="form-row">
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
        </div>
        <div className="form-row">
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
          <div className="form-group">
            <label htmlFor="dateOfBirth">📅 Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="emergencyPhone">🚨 Emergency Contact Phone:</label>
            <input
              type="tel"
              id="emergencyPhone"
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleChange}
              placeholder="Emergency contact phone"
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-button">Submit Patient Information</button>
      </form>
    </div>
  );
}

export default PatientForm;
