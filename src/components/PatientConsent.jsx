import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PatientConsent.css';

function PatientConsent() {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/patient-form');
  };

  return (
    <div className="patient-consent-container">
      <h2>Patient Consent Form</h2>
      <div className="consent-content">
        <p>
          Before proceeding with your patient information, please read and acknowledge the following:
        </p>
        <ul>
          <li>I consent to the collection and use of my personal and medical information for the purpose of processing my prescription and providing healthcare services.</li>
          <li>I understand that my information will be handled in accordance with privacy policies and regulations.</li>
          <li>I agree to provide accurate and complete information to ensure safe and effective service.</li>
          <li>I acknowledge that this information may be shared with healthcare providers as necessary.</li>
        </ul>
        <p>
          By clicking "I Agree", you confirm that you have read, understood, and agree to the terms above.
        </p>
      </div>
      <button onClick={handleProceed} className="consent-button">I Agree</button>
    </div>
  );
}

export default PatientConsent;
