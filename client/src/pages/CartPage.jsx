import React from 'react';
import { useCart } from '../context/CartContext';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/cart.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateItemQuantity } = useCart();

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (Number(item.price) || 0) * (Number(item.quantity) || 0);
  }, 0);

  const GST_RATE = 0.18;
  const deliveryFee = subtotal > 0 ? 50.0 : 0;
  const gstAmount = subtotal * GST_RATE;
  const grandTotal = subtotal + gstAmount + deliveryFee;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      updateItemQuantity(itemId, newQuantity);
    } else {
      removeFromCart(itemId);
    }
  };

  return (
    <div className="cart-page-container">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <Link to="/medicines" className="continue-shopping-link">
          Continue Shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <p>Your cart is currently empty.</p>
          <Link to="/medicines" className="shop-now-btn">
            Shop for Medicines
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">
                    ₹{(Number(item.price) || 0).toFixed(2)}
                  </p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                      <FaPlus />
                    </button>
                  </div>
                  <p className="item-total-price">
                    ₹{((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-item-btn"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary-card">
            <h2 className="summary-title">Order Summary</h2>
            <div className="billing-details">
              <div className="billing-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="billing-row">
                <span>GST (18%)</span>
                <span>₹{gstAmount.toFixed(2)}</span>
              </div>
              <div className="billing-row">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="billing-total-row">
                <span className="total-label">Grand Total</span>
                <span className="total-amount">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
