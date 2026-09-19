import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';

export default function App() {
  return (
    <PropertyProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="*" element={<div className="p-12 text-center text-slate-600 font-semibold">Page under construction...</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </PropertyProvider>
  );
}
