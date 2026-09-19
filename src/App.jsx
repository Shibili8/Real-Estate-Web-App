import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <PropertyProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/property/:slug" element={<PropertyDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </PropertyProvider>
  );
}
