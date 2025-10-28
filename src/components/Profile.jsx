import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Profile.css';

function Profile() {
  const { user } = useAuth();
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '123 Main St, City, State 12345',
    dateOfBirth: user?.dateOfBirth || '1990-01-01',
    gender: user?.gender || 'Not specified'
  });

  // Get real order history from localStorage, filtered by user
  const orders = ((JSON.parse(localStorage.getItem('orders') || '[]') || [])
    .filter(order => order.userId === user?.id)
    .map(order => ({
      id: `ORD${order.id}`,
      date: new Date(order.date).toLocaleDateString(),
      status: 'Processing', // In a real app, this would come from backend
      total: `$${order.total}`
    })));

  const prescriptions = [
    { id: 'RX001', date: '2024-04-20', fileName: 'prescription1.pdf' },
    { id: 'RX002', date: '2024-05-10', fileName: 'prescription2.jpg' }
  ];

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSavePersonalInfo = () => {
    // Here you would typically save to backend or context
    console.log('Saving personal info:', personalInfo);
    setIsEditingPersonalInfo(false);
  };

  const handleCancelEdit = () => {
    setPersonalInfo({
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '123 Main St, City, State 12345',
      dateOfBirth: user?.dateOfBirth || '1990-01-01',
      gender: user?.gender || 'Not specified'
    });
    setIsEditingPersonalInfo(false);
  };

  return (
    <div className="profile-container fade-in">
      <h2>Welcome, {user?.name || 'User'}</h2>
      <div className="profile-info">
        <div className="profile-section">
          <h3>Personal Information</h3>
          {isEditingPersonalInfo ? (
            <div className="edit-form">
              <p><strong>Email:</strong> <input type="email" value={personalInfo.email} onChange={(e) => handlePersonalInfoChange('email', e.target.value)} /></p>
              <p><strong>Phone:</strong> <input type="tel" value={personalInfo.phone} onChange={(e) => handlePersonalInfoChange('phone', e.target.value)} /></p>
              <p><strong>Address:</strong> <input type="text" value={personalInfo.address} onChange={(e) => handlePersonalInfoChange('address', e.target.value)} /></p>
              <p><strong>Date of Birth:</strong> <input type="date" value={personalInfo.dateOfBirth} onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)} /></p>
              <p><strong>Gender:</strong> <select value={personalInfo.gender} onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}>
                <option value="Not specified">Not specified</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select></p>
              <button onClick={handleSavePersonalInfo}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <>
              <p><strong>Email:</strong> {personalInfo.email || 'N/A'}</p>
              <p><strong>Phone:</strong> {personalInfo.phone || 'N/A'}</p>
              <p><strong>Address:</strong> {personalInfo.address}</p>
              <p><strong>Date of Birth:</strong> {personalInfo.dateOfBirth}</p>
              <p><strong>Gender:</strong> {personalInfo.gender}</p>
              <button onClick={() => setIsEditingPersonalInfo(true)}>Edit</button>
            </>
          )}
        </div>



        <div className="profile-section">
          <h3>Order History</h3>
          {orders.length > 0 ? (
            <ul className="order-list">
              {orders.map(order => (
                <li key={order.id} className="order-item">
                  <span>Order ID: {order.id}</span>
                  <span>Date: {order.date}</span>
                  <span>Status: {order.status}</span>
                  <span>Total: {order.total}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found.</p>
          )}
        </div>

        <div className="profile-section">
          <h3>Prescriptions</h3>
          {prescriptions.length > 0 ? (
            <ul className="prescription-list">
              {prescriptions.map(rx => (
                <li key={rx.id} className="prescription-item">
                  <span>ID: {rx.id}</span>
                  <span>Date: {rx.date}</span>
                  <button className="download-link" onClick={() => alert('Download functionality would be implemented here')}>{rx.fileName}</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No prescriptions uploaded.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
