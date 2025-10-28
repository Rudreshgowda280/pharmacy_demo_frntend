import React from "react";
import { Link } from "react-router-dom";
import "../styles/Hero.css";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Hyno Pharma</h1>
        <p className="hero-description">
          Your trusted online pharmacy for all your health needs. Get medicines delivered to your doorstep with fast, reliable service.
        </p>
        <div className="features">
          <div className="feature">
            <span className="feature-icon"></span>
            <span>Fast Delivery</span>
          </div>
          <div className="feature">
            <span className="feature-icon"></span>
            <span>Secure & Safe</span>
          </div>
          <div className="feature">
            <span className="feature-icon"></span>
            <span>24/7 Support</span>
          </div>
        </div>
        <div className="buttons-container">
          <Link to="/medicines" className="cta-link">
            <button className="cta-button">Shop Now</button>
          </Link>
          <div className="patient-form-box">
            <Link to="/patient-form" className="patient-form-button">Patient Form</Link>
          </div>
        </div>
      </div>
      <div className="hero-image">
        <img src="/images/medicines-category.jpeg" alt="Pharmacy Medicines" />
      </div>
    </div>
  );
}

export default Hero;
