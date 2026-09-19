import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <PropertyProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<div className="p-8 text-center">Loading page...</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </PropertyProvider>
  );
}
