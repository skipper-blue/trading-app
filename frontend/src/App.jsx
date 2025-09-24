import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export default function App(){
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
