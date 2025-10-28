import React from "react";
import "../styles/Advertisement.css";

function Advertisement() {
  const ads = [
    {
      id: 1,
      title: "Free Online Doctor Consultation",
      description: "Get expert medical advice from home. Our certified doctors are available 24/7 to provide personalized consultations via video call or chat. No need to visit a clinic; get prescriptions and health tips from the comfort of your home.",
      image: "https://via.placeholder.com/300x150/28a745/ffffff?text=Free+Consultation",
      link: "#"
    },
    {
      id: 2,
      title: "20% Off on Vitamins & Supplements",
      description: "Boost your immunity with our range of vitamins. Enjoy 20% discount on all vitamin supplements including Vitamin C, D, and multivitamins. Limited time offer - stock up on essential nutrients for better health.",
      image: "https://via.placeholder.com/300x150/ffc107/000000?text=20%25+Off+Vitamins",
      link: "#"
    },
    {
      id: 3,
      title: "Health Checkup Packages",
      description: "Comprehensive health screenings at affordable prices. Our packages include blood tests, ECG, X-rays, and doctor consultations. Early detection is key to prevention - book your checkup today and stay healthy.",
      image: "https://via.placeholder.com/300x150/dc3545/ffffff?text=helthcheck.jpg",
      link: "#"
    },
    {
      id: 4,
      title: "Personal Care Products",
      description: "Discover our wide range of personal care products including skincare, haircare, and hygiene essentials. Enjoy exclusive discounts on top brands and maintain your beauty routine with quality products.",
      image: "https://via.placeholder.com/300x150/17a2b8/ffffff?text=Personal+Care",
      link: "#"
    }
  ];

  return (
    <div className="advertisement">
      <h2>Featured Advertisements</h2>
      <div className="ads-grid">
        {ads.map(ad => (
          <div className="ad-card" key={ad.id}>
            <img src={ad.image} alt={ad.title} />
            <h3>{ad.title}</h3>
            <p>{ad.description}</p>
            <button>View Offer</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Advertisement;
