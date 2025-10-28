import React from "react";
import "../styles/MedicineOffers.css";

function MedicineOffers() {
  const offers = [
    {
      title: "20% Off on All Medicines",
      description: "Get 20% discount on all prescription and over-the-counter medicines. Valid on orders above ₹500.",
      icon: ""
    },
    {
      title: "Buy 1 Get 1 Free on Vitamins",
      description: "Purchase one vitamin supplement and get another free. Boost your health with our vitamin range.",
      icon: ""
    },
    {
      title: "Exclusive Discounts on Baby Care",
      description: "Special 15% off on baby care products including diapers, lotions, and baby food. Limited time offer.",
      icon: ""
    },
    {
      title: "Free Delivery on Orders Above ₹1000",
      description: "Enjoy free home delivery on all orders above ₹1000. No delivery charges, no hidden fees.",
      icon: ""
    }
  ];

  return (
    <div className="medicine-offers entrance-animation">
      <h2>Medicine Offers & Advantages</h2>
      <div className="offers-grid">
        {offers.map((offer, index) => (
          <div className="offer-card" key={index}>
            <div className="offer-icon">{offer.icon}</div>
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicineOffers;
