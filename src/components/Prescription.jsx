import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Prescription.css';

function Prescription() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      setUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        console.log('Uploading file:', file.name);
        alert('Prescription uploaded successfully!');

        // Navigate to medicines page with file info
        navigate('/medicines', { state: { prescriptionFile: file } });

        setUploading(false);
        setFile(null);
      }, 2000);
    } else {
      alert('Please select a file first.');
    }
  };

  return (
    <div className="prescription-page fade-in">
      <div className="upload-container">
        <img src="/images/123456789.jpg" alt="Prescription" />
        <h2>Upload Your Prescription</h2>
        <p>Please select an image or PDF of your prescription to proceed with your order.</p>
        <div className="file-input-container">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            id="file-input"
            className="file-input"
          />
          <label htmlFor="file-input" className="file-label">
            Choose File
          </label>
        </div>
        {file && <p className="file-name">Selected: {file.name}</p>}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="upload-btn"
        >
          {uploading ? 'Uploading...' : 'Upload Prescription'}
        </button>
      </div>
    </div>
  );
}

export default Prescription;
