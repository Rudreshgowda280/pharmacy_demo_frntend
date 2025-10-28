

import React, { useState, useEffect } from 'react';
import { useProducts } from '../contexts/ProductsContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import AdminLogin from './AdminLogin';

import '../styles/Admin.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

function Admin() {
  const { categories, addProduct, updateProduct, removeProduct, importStock, exportStock, getRevenue, getTopSellingProducts, getRevenueByCategory, getOrderTrends, pendingProducts, approveProduct, rejectProduct } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    brand: '',
    strength: '',
    packSize: '',
    stock: 0
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [stockAction, setStockAction] = useState({ productId: null, quantity: 0, action: '' });
  const [orders, setOrders] = useState([]);

  const activeTab = location.pathname.split('/').pop() || 'dashboard';
  const usdToInr = 83;

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, []);

  const handleAddProduct = () => {
    if (!selectedCategory || !newProduct.name) {
      alert("Please select a category and enter a product name.");
      return;
    }
    let productToAdd = { ...newProduct };
    if (productToAdd.price && !productToAdd.price.startsWith('₹')) {
      productToAdd.price = '₹' + productToAdd.price;
    }
    addProduct(selectedCategory, productToAdd);
    alert("Product added successfully!");
    setNewProduct({
      name: '',
      price: '',
      description: '',
      brand: '',
      strength: '',
      packSize: '',
      stock: 0
    });
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      updateProduct(editingProduct.category, editingProduct.id, editingProduct);
      setEditingProduct(null);
    }
  };

  const handleStockAction = () => {
    if (stockAction.productId && stockAction.quantity > 0) {
      const category = categories.find(cat => cat.medicines.some(med => med.id === stockAction.productId));
      if (category) {
        if (stockAction.action === 'import') {
          importStock(category.name, stockAction.productId, stockAction.quantity);
        } else if (stockAction.action === 'export') {
          exportStock(category.name, stockAction.productId, stockAction.quantity);
        }
      }
      setStockAction({ productId: null, quantity: 0, action: '' });
    }
  };

  const { dailyRevenue, weeklyRevenue, monthlyRevenue, yearlyRevenue } = getRevenue();



  if (!user) {
    return <AdminLogin />;
  }

  return (
    <div className="admin-container">
      <h1>Welcome to Admin Dashboard</h1>
      <div className="tab-navigation">
        <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => navigate('/admin/dashboard')}>
          Dashboard
        </button>
        <button className={activeTab === 'products' ? 'active' : ''} onClick={() => navigate('/admin/products')}>
          Products
        </button>
        <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => navigate('/admin/orders')}>
          Orders
        </button>

        <button className={activeTab === 'reports' ? 'active' : ''} onClick={() => navigate('/admin/reports')}>
          Reports
        </button>
      </div>

      {activeTab === 'products' && (
        <>
          <div className="revenue-section">
            <h2>Revenue Overview</h2>
            <div className="revenue-stats">
              <div className="stat">
                <h3>Daily Revenue</h3>
                <p>₹{(dailyRevenue * usdToInr).toFixed(2)}</p>
              </div>
              <div className="stat">
                <h3>Monthly Revenue</h3>
                <p>₹{(monthlyRevenue * usdToInr).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="product-management">
            <h2>Product Management</h2>

        <div className="add-product-section">
          <h3>Add New Product</h3>
          <div className="category-selection">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Price (e.g., ₹496.17)"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
          />
          <input
            type="text"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
          />
          <input
            type="text"
            placeholder="Strength"
            value={newProduct.strength}
            onChange={(e) => setNewProduct({...newProduct, strength: e.target.value})}
          />
          <input
            type="text"
            placeholder="Pack Size"
            value={newProduct.packSize}
            onChange={(e) => setNewProduct({...newProduct, packSize: e.target.value})}
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
          />
          <button onClick={handleAddProduct}>Add Product</button>
        </div>

        <div className="stock-management">
          <h3>Stock Management</h3>
          <select value={stockAction.productId || ''} onChange={(e) => setStockAction({...stockAction, productId: parseInt(e.target.value)})}>
            <option value="">Select Product</option>
            {categories.flatMap(cat => cat.medicines.map(med => (
              <option key={med.id} value={med.id}>{med.name} (Current Stock: {med.stock})</option>
            )))}
          </select>
          <select value={stockAction.action} onChange={(e) => setStockAction({...stockAction, action: e.target.value})}>
            <option value="">Select Action</option>
            <option value="import">Import Stock</option>
            <option value="export">Export Stock</option>
          </select>
          <input
            type="number"
            placeholder="Quantity"
            value={stockAction.quantity}
            onChange={(e) => setStockAction({...stockAction, quantity: parseInt(e.target.value) || 0})}
          />
          <button onClick={handleStockAction}>Execute</button>
        </div>

        <div className="product-list">
          <h3>All Products</h3>
          {categories.map(cat => (
            <div key={cat.name} className="category-section">
              <h4>{cat.name}</h4>
              <div className="products-grid">
                {cat.medicines.map(med => (
                  <div key={med.id} className="product-card">
                    <h5>{med.name}</h5>
                    <p>Price: {med.price}</p>
                    <p>Stock: {med.stock}</p>
                    <p>Brand: {med.brand}</p>
                    <button onClick={() => setEditingProduct({...med, category: cat.name})}>Edit</button>
                    <button onClick={() => removeProduct(cat.name, med.id)}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {editingProduct && (
          <div className="edit-product-modal">
            <h3>Edit Product</h3>
            <input
              type="text"
              placeholder="Name"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
            />
            <input
              type="text"
              placeholder="Price"
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
            />
            <input
              type="text"
              placeholder="Description"
              value={editingProduct.description}
              onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
            />
            <input
              type="text"
              placeholder="Brand"
              value={editingProduct.brand}
              onChange={(e) => setEditingProduct({...editingProduct, brand: e.target.value})}
            />
            <input
              type="text"
              placeholder="Strength"
              value={editingProduct.strength}
              onChange={(e) => setEditingProduct({...editingProduct, strength: e.target.value})}
            />
            <input
              type="text"
              placeholder="Pack Size"
              value={editingProduct.packSize}
              onChange={(e) => setEditingProduct({...editingProduct, packSize: e.target.value})}
            />
            <input
              type="number"
              placeholder="Stock"
              value={editingProduct.stock}
              onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value) || 0})}
            />
            <button onClick={handleUpdateProduct}>Update</button>
            <button onClick={() => setEditingProduct(null)}>Cancel</button>
          </div>
        )}
          </div>
        </>
      )}

      {activeTab === 'dashboard' && (
        <div className="dashboard">
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>Total Orders</h3>
              <p className="card-value">{orders.length}</p>
              <span className="card-icon">📦</span>
            </div>
            <div className="dashboard-card">
              <h3>Total Revenue</h3>
              <p className="card-value">₹{(orders.reduce((sum, order) => sum + (order.total || 0), 0) * usdToInr).toFixed(2)}</p>
              <span className="card-icon">💰</span>
            </div>
            <div className="dashboard-card">
              <h3>Total Products</h3>
              <p className="card-value">{categories.reduce((sum, cat) => sum + cat.medicines.length, 0)}</p>
              <span className="card-icon">💊</span>
            </div>
            <div className="dashboard-card">
              <h3>Low Stock Items</h3>
              <p className="card-value">{categories.flatMap(cat => cat.medicines).filter(med => med.stock < 10).length}</p>
              <span className="card-icon">⚠️</span>
            </div>
          </div>

          <div className="charts-section">
            <div className="chart-container">
              <h3>Revenue Overview</h3>
              <Bar
                data={{
                  labels: ['Daily', 'Monthly'],
                  datasets: [{
                    label: 'Revenue ($)',
                    data: [dailyRevenue, monthlyRevenue],
                    backgroundColor: ['#4CAF50', '#2196F3'],
                    borderColor: ['#45a049', '#1976D2'],
                    borderWidth: 1
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Revenue Statistics' }
                  }
                }}
              />
            </div>

            <div className="chart-container">
              <h3>Order Trends</h3>
              <Line
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                  datasets: [{
                    label: 'Orders',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: '#FF6384',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.1
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Monthly Orders' }
                  }
                }}
              />
            </div>
          </div>

          <div className="motivational-section">
            <h2>Motivational Quotes</h2>
            <div className="motivational-quotes">
              <div className="quote-card">
                <blockquote>"The only way to do great work is to love what you do."</blockquote>
                <cite>Steve Jobs</cite>
              </div>
              <div className="quote-card">
                <blockquote>"Believe you can and you're halfway there."</blockquote>
                <cite>Theodore Roosevelt</cite>
              </div>
              <div className="quote-card">
                <blockquote>"The future belongs to those who believe in the beauty of their dreams."</blockquote>
                <cite>Eleanor Roosevelt</cite>
              </div>
              <div className="quote-card">
                <blockquote>"You miss 100% of the shots you don't take."</blockquote>
                <cite>Wayne Gretzky</cite>
              </div>
            </div>
          </div>

          <div className="recent-orders">
            <h3>Recent Orders</h3>
            {orders.slice(-5).reverse().map((order) => (
              <div key={order.id} className="recent-order-item">
                <div className="order-info">
                  <span className="order-id">Order #{order.id}</span>
                  <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <span className="order-amount">₹{(order.total * usdToInr).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}



      {activeTab === 'orders' && (
        <div className="order-management">
          <h2>Order Management</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">Date: {new Date(order.date).toLocaleDateString()}</p>
                    <p className="order-total">Total: ₹{(order.total * usdToInr).toFixed(2)}</p>
                  </div>
                  <div className="order-details">
                    <h4>Items Ordered:</h4>
                    <div className="order-items">
                      {(order.items || []).filter(item => item && item.name).map((item, index) => (
                        <div key={index} className="order-item">
                          <div className="item-info">
                            <h5>{item.name}</h5>
                            <p>{item.brand} • {item.strength} • {item.packSize}</p>
                            <p>Quantity: {item.quantity}</p>
                          </div>
                          <div className="item-price">
                            ₹{(parseFloat(item.price.replace('$', '')) * item.quantity * usdToInr).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {order.shippingInfo && (
                      <div className="shipping-info">
                        <h4>Shipping Information:</h4>
                        <p>{order.shippingInfo.name}</p>
                        <p>{order.shippingInfo.street}</p>
                        <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zip}</p>
                        <p>Phone: {order.shippingInfo.phone}</p>
                        <p>Shipping Method: {order.shippingMethod === 'standard' ? 'Standard (Free)' : 'Express ($9.99)'}</p>
                      </div>
                    )}


                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}



      {activeTab === 'reports' && (
        <div className="reports-section">
          <h2>Reports & Analytics</h2>

          <div className="report-cards">
            <div className="report-card">
              <h3>Revenue Breakdown</h3>
              <div className="revenue-breakdown">
                <div className="revenue-item">
                  <span>Daily:</span>
                  <span>₹{(dailyRevenue * usdToInr).toFixed(2)}</span>
                </div>
                <div className="revenue-item">
                  <span>Weekly:</span>
                  <span>₹{(weeklyRevenue * usdToInr).toFixed(2)}</span>
                </div>
                <div className="revenue-item">
                  <span>Monthly:</span>
                  <span>₹{(monthlyRevenue * usdToInr).toFixed(2)}</span>
                </div>
                <div className="revenue-item">
                  <span>Yearly:</span>
                  <span>₹{(yearlyRevenue * usdToInr).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="report-card">
              <h3>Revenue by Category</h3>
              <div className="category-revenue">
                {Object.entries(getRevenueByCategory()).map(([category, revenue]) => (
                  <div key={category} className="category-item">
                    <span>{category}:</span>
                    <span>₹{(revenue * usdToInr).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="top-selling-products">
            <h3>Top Selling Products</h3>
            <div className="top-products-list">
              {getTopSellingProducts().map((product, index) => (
                <div key={index} className="top-product-item">
                  <span className="rank">#{index + 1}</span>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>{product.brand}</p>
                  </div>
                  <div className="product-stats">
                    <p>Quantity: {product.quantity}</p>
                    <p>Revenue: ₹{(product.revenue * usdToInr).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-trends">
            <h3>Order Trends</h3>
            <div className="trends-chart">
              <Bar
                data={{
                  labels: Object.keys(getOrderTrends()),
                  datasets: [{
                    label: 'Orders',
                    data: Object.values(getOrderTrends()),
                    backgroundColor: '#4CAF50',
                    borderColor: '#45a049',
                    borderWidth: 1
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Monthly Order Trends' }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

    </div>

  );
}

export default Admin;