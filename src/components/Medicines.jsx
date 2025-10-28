



import React from 'react';
import CategoryDropdown from './CategoryDropdown';
import '../styles/Medicines.css';

function Medicines() {
  return (
    <div className="medicines-page slide-in">
      <div className="medicines-header">
        <h1>Medicines</h1>
        <p>Find and purchase your medicines easily with our categorized selection.</p>
      </div>
      <div className="medicines-content">
        <CategoryDropdown />
      </div>
    </div>
  );
}

export default Medicines;