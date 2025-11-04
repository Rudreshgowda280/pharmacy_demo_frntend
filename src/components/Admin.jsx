import React, { useState, useEffect } from "react";
import "../styles/Admin.css";

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    brand: "",
    strength: "",
    packSize: "",
    stock: 0,
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // 🔹 Fetch all products from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // 🔹 Add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const savedProduct = await response.json();
        setProducts([...products, savedProduct]);
        alert("✅ Product added successfully!");
        setNewProduct({
          name: "",
          category: "",
          price: "",
          description: "",
          brand: "",
          strength: "",
          packSize: "",
          stock: 0,
        });
      } else {
        alert("❌ Failed to add product.");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Error connecting to backend.");
    }
  };

  // 🔹 Update product
  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${editingProduct.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingProduct),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setProducts(
          products.map((p) => (p.id === updated.id ? updated : p))
        );
        alert("✅ Product updated successfully!");
        setEditingProduct(null);
      } else {
        alert("❌ Error updating product!");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Failed to connect to backend.");
    }
  };

  // 🔹 Delete product
  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id));
        alert("🗑️ Product deleted successfully!");
      } else {
        alert("❌ Error deleting product.");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Failed to connect to backend.");
    }
  };

  // ✅ Group products by category (to avoid meds.map error)
  const groupedProducts = Array.isArray(products)
    ? products.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
      }, {})
    : {};

  const renderDashboard = () => (
    <div className="dashboard">
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <span className="card-value">$12,345</span>
          <div className="card-icon">💰</div>
        </div>
        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <span className="card-value">1,234</span>
          <div className="card-icon">📦</div>
        </div>
        <div className="dashboard-card">
          <h3>Total Products</h3>
          <span className="card-value">{products.length}</span>
          <div className="card-icon">🛒</div>
        </div>
        <div className="dashboard-card">
          <h3>Active Users</h3>
          <span className="card-value">567</span>
          <div className="card-icon">👥</div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3>Sales Overview</h3>
          <p>Chart placeholder - Integrate Chart.js for actual charts</p>
        </div>
        <div className="chart-container">
          <h3>Product Categories</h3>
          <p>Chart placeholder - Integrate Chart.js for actual charts</p>
        </div>
      </div>

      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <div className="recent-order-item">
          <div className="order-info">
            <div className="order-id">Order #12345</div>
            <div className="order-date">2023-10-01</div>
          </div>
          <div className="order-amount">$99.99</div>
        </div>
        <div className="recent-order-item">
          <div className="order-info">
            <div className="order-id">Order #12346</div>
            <div className="order-date">2023-10-02</div>
          </div>
          <div className="order-amount">$149.99</div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="product-management">
      <div className="add-product-section">
        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
          />
          <input
            type="text"
            placeholder="Strength"
            value={newProduct.strength}
            onChange={(e) =>
              setNewProduct({ ...newProduct, strength: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Pack Size"
            value={newProduct.packSize}
            onChange={(e) =>
              setNewProduct({ ...newProduct, packSize: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: Number(e.target.value) })
            }
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          ></textarea>
          <button type="submit">Add Product</button>
        </form>
      </div>

      <div className="product-list">
        <h3>All Products</h3>
        {Object.keys(groupedProducts).length === 0 ? (
          <p>No products available.</p>
        ) : (
          Object.entries(groupedProducts).map(([category, meds]) => (
            <div key={category} className="category-section">
              <h4>{category}</h4>
              <div className="products-grid">
                {meds.map((med) => (
                  <div key={med.id} className="product-card">
                    <h5>{med.name}</h5>
                    <p><strong>Price:</strong> 💲 {med.price}</p>
                    <p><strong>Stock:</strong> {med.stock}</p>
                    <p>{med.description}</p>
                    <button onClick={() => setEditingProduct(med)}>Edit</button>
                    <button onClick={() => handleDeleteProduct(med.id)}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="order-management">
      <h2>Order Management</h2>
      <div className="orders-list">
        <div className="order-card">
          <div className="order-header">
            <h3>Order #12345</h3>
            <span className="order-status">Pending</span>
          </div>
          <p className="order-date">Date: 2023-10-01</p>
          <p className="order-total">Total: $99.99</p>
          <div className="order-details">
            <h4>Items:</h4>
            <div className="order-items">
              <div className="order-item">
                <div className="item-info">
                  <h5>Product Name</h5>
                  <p>Qty: 2</p>
                </div>
                <div className="item-price">$49.99</div>
              </div>
            </div>
            <div className="shipping-info">
              <h4>Shipping Address:</h4>
              <p>123 Main St, City, State 12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApprovals = () => (
    <div className="approvals-management">
      <h2>Approvals Management</h2>
      <div className="pending-products-list">
        <div className="pending-product-card">
          <div className="product-header">
            <h3>Pending Product Approval</h3>
            <p>Submitted by: Vendor Name</p>
          </div>
          <div className="product-details">
            <p><strong>Name:</strong> Sample Product</p>
            <p><strong>Category:</strong> Medicines</p>
            <p><strong>Price:</strong> $19.99</p>
          </div>
          <div className="approval-actions">
            <button>Approve</button>
            <button>Reject</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="reports-section">
      <h2>Reports & Analytics</h2>
      <div className="report-cards">
        <div className="report-card">
          <h3>Revenue Breakdown</h3>
          <div className="revenue-breakdown">
            <div className="revenue-item">
              <span>Medicines</span>
              <span>$8,000</span>
            </div>
            <div className="revenue-item">
              <span>Health Supplements</span>
              <span>$3,000</span>
            </div>
            <div className="revenue-item">
              <span>Personal Care</span>
              <span>$1,345</span>
            </div>
          </div>
        </div>
        <div className="report-card">
          <h3>Category Revenue</h3>
          <div className="category-revenue">
            <div className="category-item">
              <span>Medicines</span>
              <span>$8,000</span>
            </div>
            <div className="category-item">
              <span>Health Supplements</span>
              <span>$3,000</span>
            </div>
            <div className="category-item">
              <span>Personal Care</span>
              <span>$1,345</span>
            </div>
          </div>
        </div>
      </div>
      <div className="top-selling-products">
        <h3>Top Selling Products</h3>
        <div className="top-products-list">
          <div className="top-product-item">
            <div className="rank">1</div>
            <div className="product-info">
              <h4>Product A</h4>
              <p>Category: Medicines</p>
            </div>
            <div className="product-stats">
              <p>Sales: 500</p>
              <p>Revenue: $5,000</p>
            </div>
          </div>
          <div className="top-product-item">
            <div className="rank">2</div>
            <div className="product-info">
              <h4>Product B</h4>
              <p>Category: Health Supplements</p>
            </div>
            <div className="product-stats">
              <p>Sales: 300</p>
              <p>Revenue: $3,000</p>
            </div>
          </div>
        </div>
      </div>
      <div className="order-trends">
        <h3>Order Trends</h3>
        <div className="trends-chart">
          <p>Trends chart placeholder</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      <div className="tab-navigation">
        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={activeTab === "products" ? "active" : ""}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
        <button
          className={activeTab === "approvals" ? "active" : ""}
          onClick={() => setActiveTab("approvals")}
        >
          Approvals
        </button>
        <button
          className={activeTab === "reports" ? "active" : ""}
          onClick={() => setActiveTab("reports")}
        >
          Reports
        </button>
      </div>

      {activeTab === "dashboard" && renderDashboard()}
      {activeTab === "products" && renderProducts()}
      {activeTab === "orders" && renderOrders()}
      {activeTab === "approvals" && renderApprovals()}
      {activeTab === "reports" && renderReports()}

      {/* ✏️ Edit Product Modal */}
      {editingProduct && (
        <div className="edit-product-modal">
          <div>
            <h3>Edit Product</h3>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
            />
            <input
              type="text"
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, category: e.target.value })
              }
            />
            <input
              type="text"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
            />
            <input
              type="number"
              value={editingProduct.stock}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  stock: Number(e.target.value),
                })
              }
            />
            <textarea
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
            ></textarea>
            <button onClick={handleUpdateProduct}>Save</button>
            <button onClick={() => setEditingProduct(null)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="motivational-section">
        <h2>Motivational Quotes</h2>
        <div className="motivational-quotes">
          <div className="quote-card">
            <blockquote>"Success is not final, failure is not fatal: It is the courage to continue that counts."</blockquote>
            <cite>- Winston Churchill</cite>
          </div>
          <div className="quote-card">
            <blockquote>"The only way to do great work is to love what you do."</blockquote>
            <cite>- Steve Jobs</cite>
          </div>
          <div className="quote-card">
            <blockquote>"Believe you can and you're halfway there."</blockquote>
            <cite>- Theodore Roosevelt</cite>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
