import React from "react";
import { Link } from "react-router-dom";
import "../styles/Hero.css";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Welcome to Hyno Pharmacy</h1>
        <p>Your trusted online pharmacy for all your health needs. Get medicines delivered to your doorstep.</p>
        <div className="buttons-container">
          <button className="cta-button">Shop Now</button>
          <div className="patient-form-box">
            <Link to="/patient-form" className="patient-form-button">Patient Form</Link>
          </div>
        </div>
       
        
      </div>
    </div>
  );
}

export default Hero;
