import React from "react";
import "../styles/Categories.css";

function Categories() {
  const categories = [
    {
      name: "Medicines",
      image: "images/8418259.jpg",
      description: "Over-the-counter and prescription medicines"
    },
    {
      name: "Health & Nutrition",
      image: "images/vitamin-category.jpeg",
      description: "Vitamins, supplements, and nutritional products"
    },
    {
      name: "Personal Care",
      image: "/images/pc-category.jpg",
      description: "Skincare, haircare, and hygiene products"
    },
    {
      name: "Baby Care",
      image: "/images/babycare-category.jpg",
      description: "Diapers, baby food, and infant care products"
    }
  ];

  return (
    <div className="categories entrance-animation" id="categories">
      <h2>Shop by Category</h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <button>Explore</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
