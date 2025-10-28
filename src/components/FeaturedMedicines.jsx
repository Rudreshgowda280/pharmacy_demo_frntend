import React, { useMemo } from "react";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductsContext";
import "../styles/FeaturedMedicines.css";

function FeaturedMedicines() {
  const { addToCart } = useCart();
  const { categories } = useProducts();

  // Flatten all medicines from all categories
  const allMedicines = useMemo(() => {
    return categories.flatMap(category =>
      category.medicines.map(medicine => ({
        ...medicine,
        categoryName: category.name
      }))
    );
  }, [categories]);

  // Limit to first 8 medicines for featured display
  const featuredMedicines = allMedicines.slice(0, 8);

  return (
    <div className="category-dropdown">
      <div className="medicines-list">
        <h3>Featured Medicines</h3>
        <div className="medicines-grid">
          {featuredMedicines.length > 0 ? (
            featuredMedicines.map((medicine, index) => (
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
            <div className="no-results">No medicines available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeaturedMedicines;
