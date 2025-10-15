import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductsContext";
import "../styles/CategoryDropdown.css";

function CategoryDropdown() {
  const { addToCart } = useCart();
  const { categories } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      const exactMatch = categories.find(category =>
        category.name.toLowerCase() === searchTerm.toLowerCase()
      );
      if (exactMatch) {
        setSelectedCategory(exactMatch);
        setIsOpen(false);
        setSearchTerm("");
      }
    }
  }, [searchTerm, categories]);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const handleSelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = () => {
    setSelectedCategory(null);
    setSearchTerm("");
  };

  return (
    <div className="category-dropdown">
      <div className="dropdown-header">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        <button onClick={() => setIsOpen(!isOpen)}>
          {selectedCategory ? selectedCategory.name : "Select Category"} ▼
        </button>
        {selectedCategory && (
          <button onClick={handleClear} style={{ marginLeft: '5px' }}>Clear</button>
        )}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleSelect(category)}
              >
                <img src={category.image} alt={category.name} />
                <div>
                  <h4>{category.name}</h4>
                  <p>{category.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No categories found</div>
          )}
        </div>
      )}
      <div className="medicines-list">
        {selectedCategory ? (
          <>
            <h3>{selectedCategory.name} Medicines</h3>
            <div className="medicines-grid">
              {selectedCategory.medicines.length > 0 ? (
                selectedCategory.medicines.map((medicine, index) => (
                  <div key={index} className="medicine-card">
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
                <div className="no-results">No medicines found</div>
              )}
            </div>
          </>
        ) : (
          <div className="no-results">Please select a category to see medicines.</div>
        )}
      </div>
    </div>
  );
}

export default CategoryDropdown;
