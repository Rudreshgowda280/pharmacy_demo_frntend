import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  // ---- Helper Functions ----
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

  const shipping = subtotal > 500 ? 0 : 50; // Free above ₹500
  const discount = subtotal > 1000 ? 100 : 0; // ₹100 discount if subtotal > ₹1000
  const taxRate = 0.05; // 5% GST
  const tax = subtotal * taxRate;

  const finalTotal = subtotal + shipping + tax - discount;

  const handleQuantityChange = (medicineName, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(medicineName, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container fade-in">
        <h2>Your Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button
            onClick={() => navigate("/medicines")}
            className="shop-btn"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container fade-in">
      <h2>Your Cart ({getTotalItems()} items)</h2>

      <div className="cart-content">
        {/* ----- Cart Items ----- */}
        <div className="cart-items">
          {cart.map((item, index) => {
            const itemPrice = parsePrice(item.price);
            const itemTotal = itemPrice * item.quantity;

            return (
              <div key={index} className="cart-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="brand">{item.brand}</p>
                  <p className="details">
                    {item.strength} • {item.packSize}
                  </p>
                  <p className="price">{formatINR(itemPrice)}</p>
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.name, item.quantity - 1)
                    }
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.name, item.quantity + 1)
                    }
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <div className="item-total">
                  <p>{formatINR(itemTotal)}</p>
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ----- Cart Summary ----- */}
        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal ({getTotalItems()} items):</span>
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
          {discount > 0 && (
            <div className="summary-row discount">
              <span>Discount:</span>
              <span>- {formatINR(discount)}</span>
            </div>
          )}
          {discount > 0 && (
            <div className="summary-row saved">
              <span>You Saved:</span>
              <span>{formatINR(discount)}</span>
            </div>
          )}
          <div className="summary-row total">
            <span>Total:</span>
            <span>{formatINR(finalTotal)}</span>
          </div>

          <div className="cart-actions">
            <button onClick={clearCart} className="clear-cart-btn">
              Clear Cart
            </button>
            <button onClick={handleCheckout} className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
