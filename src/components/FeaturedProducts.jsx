import React, { useState } from "react";
import "../styles/FeaturedProducts.css";

function FeaturedProducts() {
  const ads = [
    {
      id: 1,
      title: " Online Doctor Consultation",
      description: "Get expert medical advice from Doctors.",
      details: "Consult with certified doctors from the comfort of your home, anytime.",
      image: "/images/consult-adver.jpeg",
    },
    {
      id: 2,
      title: "25% Off on Vitamins & Supplements",
      description: "Boost your immunity with our range of vitamins.",
      details: "Exclusive offer on all top vitamin and supplement brands.",
      image: "/images/vitamin-adver.jpeg",
    },
    {
      id: 3,
      title: "Health Checkup Packages",
      description: "Comprehensive health screenings at affordable prices.",
      details: "Includes blood tests, ECG, and more — designed for your wellness.",
      image: "https://via.placeholder.com/200x200/dc3545/ffffff?text=Health+Checkup",
    },
  ];

  const [flippedCards, setFlippedCards] = useState([]);

  const handleFlip = (id) => {
    setFlippedCards((prev) =>
      prev.includes(id)
        ? prev.filter((cardId) => cardId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="featured-products entrance-animation">
      <h2>Featured Advertisements</h2>
      <div className="products-grid">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className={`product-card ${flippedCards.includes(ad.id) ? "flipped" : ""}`}
          >
            <div className="card-inner">
              {/* Front */}
              <div className="card-front">
                <img src={ad.image} alt={ad.title} />
                <h3>{ad.title}</h3>
                <p>{ad.description}</p>
                <button className="ad-link" onClick={() => handleFlip(ad.id)}>
                  Learn More
                </button>
              </div>

              {/* Back */}
              <div className="card-back">
                <h3>{ad.title}</h3>
                <p>{ad.details}</p>
                <button className="ad-link" onClick={() => handleFlip(ad.id)}>
                  Back
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
