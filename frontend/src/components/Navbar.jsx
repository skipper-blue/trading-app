import { Link } from "react-router-dom";

export default function Navbar(){
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold">TradingApp</div>
        <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
      </div>
      <div>
        <Link to="/" className="text-gray-300 hover:text-white mr-4">Login</Link>
        <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
      </div>
    </nav>
  );
}
