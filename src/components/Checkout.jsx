import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: ""
  });

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [loadingLocation, setLoadingLocation] = useState(false);

  // ---- Helper functions ----
  const parsePrice = (price) => {
    if (!price) return 0;
    return parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
  };

  const formatINR = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  // ---- Amount Calculations ----
  const subtotal = cart.reduce(
    (acc, item) => acc + parsePrice(item.price) * item.quantity,
    0
  );
  const shipping = shippingMethod === "standard" ? 0 : 200; // ₹200 for express
  const tax = subtotal * 0.05; // 5% GST
  const finalTotal = subtotal + tax + shipping;

  // ---- Handlers ----
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ---- Get Current Location ----
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const address = data.address || {};

          setShippingInfo((prev) => ({
            ...prev,
            street: address.road || "",
            city: address.city || address.town || address.village || "",
            state: address.state || "",
            zip: address.postcode || ""
          }));
        } catch (error) {
          console.error("Error fetching location:", error);
          alert("Unable to fetch address from location.");
        }

        setLoadingLocation(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to get your location.");
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (
      !shippingInfo.name ||
      !shippingInfo.street ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.zip ||
      !shippingInfo.phone
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create order object
    const order = {
      id: Date.now(),
      items: cart,
      shippingInfo,
      shippingMethod,
      total: finalTotal,
      date: new Date().toISOString()
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Clear cart
    clearCart();

    // Navigate to order history
    navigate("/order-history");
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <h2>No items to checkout</h2>
        <button onClick={() => navigate("/medicines")} className="shop-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container fade-in">
      <h2>Checkout</h2>

      <div className="checkout-content">
        {/* ----- Order Summary ----- */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="order-items">
            {cart.map((item, index) => {
              const itemTotal = parsePrice(item.price) * item.quantity;
              return (
                <div key={index} className="order-item">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>{item.brand} • {item.strength} • {item.packSize}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-price">{formatINR(itemTotal)}</div>
                </div>
              );
            })}
          </div>

          <div className="order-summary-totals">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>GST (5%):</span>
              <span>{formatINR(tax)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>{shipping === 0 ? "Free" : formatINR(shipping)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>{formatINR(finalTotal)}</span>
            </div>
          </div>
        </div>

        {/* ----- Shipping Form ----- */}
        <form className="shipping-form" onSubmit={handleSubmit}>
          <h3>Shipping Information</h3>

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={shippingInfo.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Street Address with current location button */}
          <div className="form-group street-group">
            <label>Street Address *</label>
            <div className="street-input-wrapper">
              <span className="location-icon">📍</span>
              <input
                type="text"
                name="street"
                value={shippingInfo.street}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={handleGetLocation}
                className="location-btn"
                disabled={loadingLocation}
              >
                {loadingLocation ? "Fetching..." : "Use Current Location"}
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                name="state"
                value={shippingInfo.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>ZIP Code *</label>
              <input
                type="text"
                name="zip"
                value={shippingInfo.zip}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="shipping-method">
            <h3>Shipping Method</h3>
            <label>
              <input
                type="radio"
                name="shippingMethod"
                value="standard"
                checked={shippingMethod === "standard"}
                onChange={(e) => setShippingMethod(e.target.value)}
              />
              Standard Shipping (Free)
            </label>
            <label>
              <input
                type="radio"
                name="shippingMethod"
                value="express"
                checked={shippingMethod === "express"}
                onChange={(e) => setShippingMethod(e.target.value)}
              />
              Express Shipping (₹200)
            </label>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
