import React from "react";
import "../styles/AboutUs.css";

function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-header">
        <h1>About Hyno Pharma</h1>
        <p>Your trusted partner in health and wellness.</p>
        <img src="/images/medicines-category.jpeg" alt="Pharmacy" className="header-image" />
      </div>
      <div className="about-content">
        <div className="section-card mission">
          <div className="icon">🎯</div>
          <h2>Our Mission</h2>
          <p>
            At Hyno Pharmacy, our mission is to provide accessible, affordable, and high-quality healthcare solutions to our community.
            We are committed to delivering medicines and health products with integrity, ensuring the well-being of every customer.
          </p>
        </div>
        <div className="section-card history">
          <div className="icon">📜</div>
          <h2>Our History</h2>
          <p>
            Founded in 2020, Hyno Pharmacy started as a small local store with a vision to revolutionize online pharmacy services.
            Over the years, we have grown into a trusted online platform, serving thousands of customers nationwide with fast and reliable delivery.
          </p>
        </div>
        <div className="section-card team">
          <div className="icon">👥</div>
          <h2>Our Team</h2>
          <img src="/images/1234.jpg" alt="Our Team" className="section-image" />
          <p>
            Our dedicated team of pharmacists, healthcare professionals, and customer service experts work tirelessly to ensure that you receive
            the best care possible. We prioritize safety, accuracy, and personalized service in everything we do.
          </p>
        </div>
        <div className="section-card values">
          <div className="icon">⭐</div>
          <h2>Our Values</h2>
          <ul>
            <li><strong>Quality:</strong> We source only the highest quality medicines and products.</li>
            <li><strong>Trust:</strong> Building long-term relationships through transparency and reliability.</li>
            <li><strong>Innovation:</strong> Embracing technology to improve healthcare accessibility.</li>
            <li><strong>Community:</strong> Supporting local health initiatives and customer education.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
