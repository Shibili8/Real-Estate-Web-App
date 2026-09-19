import React from 'react'
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="bg-brand-900 text-white p-4">
        <h1 className="text-xl font-bold">HavenEstate</h1>
      </header>
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold">Welcome to HavenEstate</h2>
        <p className="text-slate-600 mt-2">Find your dream home with video walkthroughs and photo tours.</p>
      </main>
    </div>
  )
}
