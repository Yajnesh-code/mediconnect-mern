import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Reducer handles all cart state updates
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        // Increase quantity if item already exists
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      // Otherwise, add new item with quantity 1
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case 'REMOVE_ITEM': {
      return state.filter(item => item.id !== action.payload.itemId);
    }

    case 'UPDATE_QUANTITY': {
      return state.map(item =>
        item.id === action.payload.itemId
          ? { ...item, quantity: action.payload.newQuantity }
          : item
      );
    }

    case 'SET_CART': {
      return action.payload;
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [cartItems, dispatch] = useReducer(cartReducer, initialState);

  // Persist cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Functions that components can use
  const addToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, newQuantity } });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
