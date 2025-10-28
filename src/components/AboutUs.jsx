import React from "react";
import "../styles/AboutUs.css";

function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-header">
        <h1>About Hyno Pharma</h1>
        <p>Your trusted partner in health and wellness.</p>
        <div className="image-container">
          <img src="/images/about us.jpg" alt="Pharmacy" className="header-image" />
          <div className="overlay-text">
            We make healthcare<br />Understandable, Accessible and Affordable.
          </div>
        </div>
      </div>
      <div className="about-content">
        <div className="section-card mission">
          <div className="icon"></div>
          <h2>Our Mission</h2>
          <p>
            At Hyno Pharmacy, our mission is to provide accessible, affordable, and high-quality healthcare solutions to our community.
            We are committed to delivering medicines and health products with integrity, ensuring the well-being of every customer.
          </p>
        </div>
        <div className="section-card history">
          <div className="icon"></div>
          <h2>Our History</h2>
          <p>
            Founded in 2020, Hyno Pharmacy started as a small local store with a vision to revolutionize online pharmacy services.
            Over the years, we have grown into a trusted online platform, serving thousands of customers nationwide with fast and reliable delivery.
          </p>
        </div>
        <div className="section-card team">
          <div className="icon"></div>
          <h2>Our Team</h2>
          
          <p>
            Our dedicated team of pharmacists, healthcare professionals, and customer service experts work tirelessly to ensure that you receive
            the best care possible. We prioritize safety, accuracy, and personalized service in everything we do.
          </p>
        </div>
        <div className="section-card values">
          <div className="icon"></div>
          <h2>Our Values</h2>
          <ul>
            <li><strong>Quality:</strong> We source only the highest quality medicines and products.</li>
            <li><strong>Trust:</strong> Building long-term relationships through transparency and reliability.</li>
            <li><strong>Innovation:</strong> Embracing technology to improve healthcare accessibility.</li>
            <li><strong>Community:</strong> Supporting local health initiatives and customer education.</li>
          </ul>
        </div>
        <div className="section-card medical-info">
          <div className="icon"></div>
          <h2>Medical Information</h2>
          <p>
            At Hyno Pharmacy, we are committed to providing accurate and reliable medical information to support your health journey.
            Our platform offers detailed product descriptions, usage guidelines, and potential side effects for all medications.
            We partner with licensed healthcare professionals to ensure that all information is up-to-date and compliant with medical standards.
          </p>
          <p>
            For personalized medical advice, we recommend consulting with qualified healthcare providers. Our services include prescription verification,
            medication counseling, and access to health resources. Remember, while we provide information, it is not a substitute for professional medical advice.
          </p>
        </div>
        <div className="section-card our-story">
          <div className="icon"></div>
          <h2>Our Story</h2>
          <h3>The idea</h3>
          <p>
            In healthcare, the information around our medicines and lab tests is either unavailable or incomprehensible to us.
            So we decided to create a platform that stood for transparent, authentic and accessible information for all.
            This idea grew into a company and Tata 1mg was created in 2015.
          </p>
          <h3>What we offer</h3>
          <p>
            We provide accurate, authoritative & trustworthy information on medicines and help people use their medicines effectively and safely.
            We get medicines and other health products delivered at home in 1000+ cities across India from licensed and verified pharmacies.
            We also provide diagnostic services from certified labs and online doctor consults at any time, from anywhere.
          </p>
          <h3>The journey so far</h3>
          <p>
            We’ve made health care accessible to millions by giving them quality care at affordable prices.
            We continue to expand our rich and extensive medical content and are working hard to make this information available in multiple local languages.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
