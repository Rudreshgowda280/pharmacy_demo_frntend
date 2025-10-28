import React from "react";
import { Link } from "react-router-dom";
import { FaHeartbeat, FaTooth, FaLungs, FaUserMd, FaHandHoldingHeart } from "react-icons/fa";
import { GiStomach, GiLiver, GiPerson, GiHealing } from "react-icons/gi";
import { MdOutlineElderly } from "react-icons/md";
import "../styles/HealthConditions.css";

const conditions = [
  { name: "Diabetes Care", icon: <FaHandHoldingHeart />, category: "Diabetes Care" },
  { name: "Cardiac Care", icon: <FaHeartbeat />, category: "Cardiac Care" },
  { name: "Stomach Care", icon: <GiStomach />, category: "Stomach Care" },
  { name: "Pain Relief", icon: <FaUserMd />, category: "Pain Relief" },
  { name: "Liver Care", icon: <GiLiver />, category: "Liver Care" },
  { name: "Oral Care", icon: <FaTooth />, category: "Oral Care" },
  { name: "Respiratory", icon: <FaLungs />, category: "Respiratory" },
  { name: "Sexual Health", icon: <GiHealing />, category: "Sexual Health" },
  { name: "Elderly Care", icon: <MdOutlineElderly />, category: "Elderly Care" },
  { name: "Cold & Immunity", icon: <GiPerson />, category: "Cold & Immunity" },
];

function HealthConditions() {
  const handleConditionClick = (categoryName) => {
    // Navigate to medicines page with the selected category
    window.location.href = `/medicines?category=${encodeURIComponent(categoryName)}`;
  };

  return (
    <div className="health-section">
      <h2>Browse by Health Conditions</h2>
      <div className="conditions-grid">
        {conditions.map((item, index) => (
          <div
            key={index}
            className="condition-card"
            onClick={() => handleConditionClick(item.category)}
            style={{ cursor: 'pointer' }}
          >
            <div className="icon">{item.icon}</div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HealthConditions;
