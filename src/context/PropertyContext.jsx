import React, { createContext, useContext, useState, useEffect } from 'react';
import initialProperties from '../data/properties.json';

const PropertyContext = createContext();

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState(() => {
    try {
      const stored = localStorage.getItem('haven_custom_properties');
      if (stored) {
        const custom = JSON.parse(stored);
        // Combine custom properties with initial properties
        return [...custom, ...initialProperties];
      }
    } catch (e) {
      console.error('Failed to parse properties from localStorage', e);
    }
    return initialProperties;
  });

  const addProperty = (newProperty) => {
    setProperties((prev) => {
      const updated = [newProperty, ...prev];
      try {
        const customStored = localStorage.getItem('haven_custom_properties');
        const customList = customStored ? JSON.parse(customStored) : [];
        localStorage.setItem(
          'haven_custom_properties',
          JSON.stringify([newProperty, ...customList])
        );
      } catch (e) {
        console.error('Failed to save property to localStorage', e);
      }
      return updated;
    });
  };

  const getPropertyBySlug = (slug) => {
    if (!slug) return null;
    return properties.find(
      (p) => p.slug === slug || p.id?.toLowerCase() === slug.toLowerCase()
    );
  };

  const featuredProperties = properties.filter((p) => p.featured);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        featuredProperties,
        addProperty,
        getPropertyBySlug,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
}
