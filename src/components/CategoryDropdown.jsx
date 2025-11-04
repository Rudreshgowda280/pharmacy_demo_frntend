import React, { useState, useEffect, useMemo } from "react";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductsContext";
import "../styles/CategoryDropdown.css";

function CategoryDropdown() {
  const { addToCart } = useCart();
  const { categories } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromUrl = urlParams.get('category');

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Flatten all medicines from all categories
  const allMedicines = useMemo(() => {
    return categories.flatMap(category =>
      category.medicines.map(medicine => ({
        ...medicine,
        categoryName: category.name
      }))
    );
  }, [categories]);

  // Filter and sort medicines
  const filteredAndSortedMedicines = useMemo(() => {
    let filtered = allMedicines;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(medicine =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected category
    if (selectedCategory) {
      filtered = filtered.filter(medicine =>
        medicine.categoryName === selectedCategory
      );
    }

    // Sort by price
    if (sortOption === "high") {
      filtered = filtered.sort((a, b) => {
        const priceA = parseFloat(a.price.replace('₹', '').replace(',', ''));
        const priceB = parseFloat(b.price.replace('₹', '').replace(',', ''));
        return priceB - priceA;
      });
    } else if (sortOption === "low") {
      filtered = filtered.sort((a, b) => {
        const priceA = parseFloat(a.price.replace('₹', '').replace(',', ''));
        const priceB = parseFloat(b.price.replace('₹', '').replace(',', ''));
        return priceA - priceB;
      });
    }

    return filtered;
  }, [allMedicines, searchTerm, selectedCategory, sortOption]);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
  };



  const handleClear = () => {
    setSelectedCategory(null);
    setSearchTerm("");
    setSortOption("");
  };

  return (
    <div className="category-dropdown">
      <div className="search-header">
        <div className="dropdown-container">
          <div className="dropdown-toggle">
            Categories ▼
          </div>
          <div className="dropdown-menu">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`dropdown-item ${selectedCategory === category.name ? 'active' : ''}`}
                onClick={() => handleCategorySelect(category.name)}
              >
                <img src={category.image} alt={category.name} />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
        <input
          type="text"
          placeholder="Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="sort-select"
        >
          <option value="">Sort by Price</option>
          <option value="high">High Price</option>
          <option value="low">Low Price</option>
        </select>
        {(selectedCategory || searchTerm || sortOption) && (
          <button onClick={handleClear} className="clear-btn">Clear All</button>
        )}

      </div>
        <div className="medicines-list">
        <h3>{selectedCategory || "All Medicines"}</h3>
        <div className="medicines-grid">
          {filteredAndSortedMedicines.length > 0 ? (
            filteredAndSortedMedicines.map((medicine, index) => (
              <div
                key={medicine.id}
                className="medicine-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="medicine-header">
                  <h4>{medicine.name}</h4>
                  <span className="brand">{medicine.brand}</span>
                </div>
                <p className="description">{medicine.description}</p>
                <div className="medicine-details">
                  <span className="detail">Strength: {medicine.strength}</span>
                  <span className="detail">Pack Size: {medicine.packSize}</span>
                  <span className="detail">Stock: {medicine.stock}</span>
                </div>
                <div className="medicine-footer">
                  <span className="price">{medicine.price}</span>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(medicine)}
                    disabled={medicine.stock <= 0}
                  >
                    {medicine.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>No medicines found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryDropdown;
