import React, { useEffect, useState, useMemo } from "react";
import { useCart } from "../contexts/CartContext";
import "../styles/Medicines.css";

function Medicines() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["Pain Relief", "Antibiotics", "Vitamins", "Skin Care"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");


  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const uniqueCategories = [...new Set(data.map((p) => p.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (sortOption === "high") {
      filtered = [...filtered].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortOption === "low") {
      filtered = [...filtered].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, sortOption]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(selectedCategory === category ? "" : category);
  };

  const handleClear = () => {
    setSelectedCategory("");
    setSearchTerm("");
    setSortOption("");
  };

  return (
    <div className="medicines-page slide-in">
      <div className="medicines-header">
        <h1>Medicines</h1>
        <p>Find and purchase your medicines easily by category.</p>
      </div>

      <div className="filters-section">
        <div className="left-filters">
          <div className="categories-dropdown">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="center-filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="right-filters">
          <div className="sort-dropdown">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="sort-select"
            >
              <option value="">Default</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
          {(selectedCategory || searchTerm || sortOption) && (
            <button onClick={handleClear} className="clear-btn">Clear All</button>
          )}
        </div>
      </div>

      <div className="medicines-content">
        {filteredAndSortedProducts.length > 0 ? (
          <div className="medicines-grid">
            {filteredAndSortedProducts.map((p) => (
              <div className="medicine-card" key={p.id}>
                <h3>{p.name}</h3>
                <p className="description">{p.description}</p>
                <p className="brand"><strong>Brand:</strong> {p.brand}</p>
                <p className="price"><strong>Price:</strong> ₹{p.price}</p>
                <p className="stock"><strong>Stock:</strong> {p.stock}</p>
                <button className="add-to-cart-btn" onClick={() => addToCart(p)}>
                  <span>Add to Cart</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22L9 12L15 12L15 22M3 9L12 0L21 9V22H15V14H9V22H3V9Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">No medicines found matching your criteria.</div>
        )}
      </div>
    </div>
  );
}

export default Medicines;
