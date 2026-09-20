import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import AdminAddPropertyPage from './pages/AdminAddPropertyPage';
import WishlistPage from './pages/WishlistPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <PropertyProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/property/:slug" element={<PropertyDetailsPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/saved" element={<WishlistPage />} />
              <Route path="/admin/add-property" element={<AdminAddPropertyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </PropertyProvider>
  );
}
