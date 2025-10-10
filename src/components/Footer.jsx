import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Medical Services</h3>
          <ul>
            <li><button className="link-button" onClick={() => alert('Coming soon!')}>Online Doctor Consultation</button></li>
            <li><button className="link-button" onClick={() => alert('Coming soon!')}>Health Checkup Packages</button></li>
            <li><button className="link-button" onClick={() => navigate('/prescription')}>Prescription Upload</button></li>
            <li><button className="link-button" onClick={() => alert('Coming soon!')}>Emergency Medical Kit</button></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><button className="link-button" onClick={() => navigate('/')}>Home</button></li>
            <li><button className="link-button" onClick={() => navigate('/about-us')}>About Us</button></li>
            <li><button className="link-button" onClick={() => navigate('/faqs')}>FAQs</button></li>
            <li><button className="link-button" onClick={() => navigate('/privacy-policy')}>Privacy Policy</button></li>
            <li><button className="link-button" onClick={() => navigate('/patient-form')}>Patient Form</button></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Shop</h3>
          <ul>
            <li><button className="link-button" onClick={() => navigate('/medicines')}>Medicines</button></li>
            <li><button className="link-button" onClick={() => navigate('/prescription')}>Prescription Upload</button></li>
            <li><button className="link-button" onClick={() => navigate('/cart')}>Cart</button></li>
            <li><button className="link-button" onClick={() => navigate('/checkout')}>Checkout</button></li>
            <li><button className="link-button" onClick={() => navigate('/order-history')}>Order History</button></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Account</h3>
          <ul>
            <li><button className="link-button" onClick={() => navigate('/login')}>Login</button></li>
            <li><button className="link-button" onClick={() => navigate('/register')}>Register</button></li>
            <li><button className="link-button" onClick={() => navigate('/profile')}>Profile</button></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li><button className="link-button" onClick={() => navigate('/consultation')}>Doctor Consultation</button></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Phone: 9666989458</p>
          <p>Email: info@hynopharmacy.com</p>
          <p>Address:Near Kadugodi Tree Park,Prashanth Extension,Whitefield,Banglore-560066</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 HynoPharmacy | All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
