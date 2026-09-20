import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProperties } from './PropertyContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { properties } = useProperties();
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('haven_wishlist');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse wishlist from localStorage', e);
    }
    return [];
  });

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('haven_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Toggle property in/out of wishlist
  const toggleWishlist = (propertyId) => {
    if (!propertyId) return;
    setWishlist((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  // Helper check
  const isInWishlist = (propertyId) => {
    return wishlist.includes(propertyId);
  };

  // Clear all
  const clearWishlist = () => {
    setWishlist([]);
  };

  // Full property objects of saved properties
  const wishlistProperties = properties.filter((p) => wishlist.includes(p.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        wishlistProperties,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
