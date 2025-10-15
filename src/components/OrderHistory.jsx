import React from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';  // ✅ correct import
import '../styles/OrderHistory.css';

function OrderHistory() {
  const navigate = useNavigate();

  // Get orders from localStorage
  const orders = JSON.parse(localStorage.getItem('orders') || '[]') || [];

  // ✅ Generate Receipt PDF for a given order
  const generateReceipt = (order) => {
    const doc = new jsPDF();

    // Conversion rate: 1 USD = 83 INR
    const usdToInr = 83;

    // Header
    doc.setFontSize(18);
    doc.text("Pharmacy Receipt", 14, 15);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 14, 30);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 14, 40);

    // Customer Info
    if (order.shippingInfo) {
      doc.setFontSize(14);
      doc.text("Shipping Information", 14, 55);
      doc.setFontSize(12);
      doc.text(`${order.shippingInfo.name}`, 14, 65);
      doc.text(`${order.shippingInfo.street}`, 14, 72);
      doc.text(`${order.shippingInfo.city}, ${order.shippingInfo.state} ${order.shippingInfo.zip}`, 14, 79);
      doc.text(`Phone: ${order.shippingInfo.phone}`, 14, 86);
    }

    // Items Table
    const tableColumn = ["Item", "Details", "Qty", "Price", "Subtotal"];
    const tableRows = [];

    (order.items || []).forEach(item => {
      if (!item || !item.name) return;
      const priceUsd = parseFloat(item.price.replace('$', '')) || 0;
      const priceInr = (priceUsd * usdToInr).toFixed(2);
      const subtotalInr = (priceUsd * item.quantity * usdToInr).toFixed(2);
      tableRows.push([
        item.name,
        `${item.brand || ''} ${item.strength || ''} ${item.packSize || ''}`,
        item.quantity,
        `₹${priceInr}`,
        `₹${subtotalInr}`
      ]);
    });

    // ✅ Use autoTable correctly
    autoTable(doc, {
      startY: 100,
      head: [tableColumn],
      body: tableRows,
      theme: 'striped'
    });

    // Total Section
    const finalY = doc.lastAutoTable.finalY || 120;
    const totalInr = (order.total * usdToInr).toFixed(2);
    doc.setFontSize(14);
    doc.text(`Total: ₹${totalInr}`, 14, finalY + 20);

    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for shopping with us!", 14, finalY + 40);

    // Save as PDF
    doc.save(`receipt_order_${order.id}.pdf`);
  };

  if (orders.length === 0) {
    return (
      <div className="order-history-container fade-in">
        <h2>Order History</h2>
        <p>No orders found.</p>
        <button onClick={() => navigate('/medicines')} className="shop-btn">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="order-history-container fade-in">
      <h2>Order History</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3>Order #{order.id}</h3>
              <p className="order-date">Date: {new Date(order.date).toLocaleDateString()}</p>
              <p className="order-total">Total: ${order.total}</p>
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
                      ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
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

            {/* ✅ Download Receipt Button */}
            <button onClick={() => generateReceipt(order)} className="download-btn">
              Download Receipt
            </button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/medicines')} className="shop-btn">
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderHistory;
