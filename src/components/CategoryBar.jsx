import React, { useState } from "react";
import { useProducts } from "../contexts/ProductsContext";
import "../styles/CategoryBar.css";

function CategoryBar() {
  const { categories: productsCategories } = useProducts();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleMouseEnter = (category) => {
    setExpandedCategory(category);
  };

  const handleMouseLeave = () => {
    setExpandedCategory(null);
  };

  const categoryBarItems = [
    "HYNO Products",
    "Baby Care",
    "Nutritional Drinks & Supplements",
    "Women Care",
    "Personal Care",
    "Health Condition",
    "Home Essentials",
  ];

  // Mapping from CategoryBar items to ProductsContext categories
  const categoryMapping = {
    "Apollo Products": "Medicines",
    "Baby Care": "Baby Care",
    "Nutritional Drinks & Supplements": "Health & Nutrition",
    "Women Care": "Medicines",
    "Personal Care": "Personal Care",
    "Health Devices": "Medicines",
    "Home Essentials": "Medicines",
  };

  const getMedicinesForCategory = (categoryName) => {
    if (categoryName === "Nutritional Drinks & Supplements") {
      return [
        "Adult Nutrition",
        "Kids Nutrition",
        "Specialty Nutrition",
        "Rehydration Drinks",
        "Green Tea"
      ];
    }
    if (categoryName === "Women Care") {
      return [
        "Feminine Hygiene",
        "Sanitary Pads",
        "Menstrual Cups",
        "Tampons",
        "Panty Liners",
        "Intimate Care"
      ];
    }
    if (categoryName === "Home Essentials") {
      return [
        "Respiratory",
        "Eye care",
        "Cold & Cough",
        "Wound Care",
        "Sleep Aids",
        "Bone, Joint"
      ];
    }
    if (categoryName === "Health Condition") {
      return [
        "Stomach Care",
        "Respiratory",
        "Eye care",
        "Cold & Cough",
        "Wound Care",
        "Sleep Aids",
        "Bone, Joint & Muscle"
      ];
    }
    if (categoryName === "Baby Care") {
      return [
        "Diapering",
        "Diapers",
        "Wipes",
        "Diaper By Weight",
        "0 to 7 Kg",
        "7 to 14 Kg",
        "14 to 18 Kg",
        "Above 18 Kg"
      ];
    }
    if (categoryName === "Personal Care") {
      return [
        "Skin Care",
        "Bath & Body",
        "Face Care",
        "Beauty",
        "Lip Care",
        "Foot & Hand Care",
        "Facial Wipes",
        "Massage & Essential Oils",
        "Hand Wash & Sanitizers",
        "Hair Care"
      ];
    }
    const mappedCategory = categoryMapping[categoryName];
    const category = productsCategories.find(cat => cat.name === mappedCategory);
    return category ? category.medicines.slice(0, 5) : []; // Show top 5 medicines
  };

  return (
    <div className="category-bar">
      {categoryBarItems.map((category, index) => (
        <div
          key={index}
          className="category-item"
          onMouseEnter={() => handleMouseEnter(category)}
          onMouseLeave={handleMouseLeave}
        >
          {category}
          {expandedCategory === category && (
            <div className="category-dropdown">
              {getMedicinesForCategory(category).map((item, idx) => (
                <div key={idx} className="dropdown-item">
                  {typeof item === 'string' ? (
                    <span className="medicine-name">{item}</span>
                  ) : (
                    <>
                      <span className="medicine-name">{item.name}</span>
                      <span className="medicine-price">{item.price}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CategoryBar;
