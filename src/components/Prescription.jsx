import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Prescription.css';

function Prescription() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // ✅ Upload file to Spring Boot backend
      const response = await fetch('http://localhost:8080/api/prescriptions/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert('Prescription uploaded successfully!');

        // ✅ Navigate to medicines page after successful upload
        navigate('/medicines', { state: { prescriptionId: data.id } });
      } else {
        const err = await response.json();
        alert('Upload failed: ' + (err.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Something went wrong during upload.');
    } finally {
      setUploading(false);
      setFile(null);
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
