
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
  onSearch: (query: string) => void;
  isLoggedIn?: boolean;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onSearch, isLoggedIn }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    navigate('/');
  };

  return (
    <header className="flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#131921] text-white flex items-center p-2 h-16 space-x-4">
        {/* Logo */}
        <Link to="/" className="pt-2 hover:border border-white p-1 rounded">
          <img 
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
            alt="Amazon" 
            className="w-24 object-contain"
          />
        </Link>

        {/* Deliver to */}
        <div className="hidden lg:flex flex-col hover:border border-white p-1 rounded cursor-pointer">
          <span className="text-xs text-gray-400 pl-4">Deliver to</span>
          <div className="flex items-center space-x-1">
            <i className="fa-solid fa-location-dot"></i>
            <span className="text-sm font-bold">United States</span>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-grow flex h-10 items-center">
          <input 
            type="text" 
            className="flex-grow p-2 h-full outline-none text-black rounded-l-md"
            placeholder="Search Amazon"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="bg-[#febd69] p-3 h-full rounded-r-md hover:bg-[#f3a847]">
            <i className="fa-solid fa-magnifying-glass text-black"></i>
          </button>
        </form>

        {/* Account & Orders */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="hover:border border-white p-1 rounded cursor-pointer leading-tight">
            <span className="text-xs">Hello, sign in</span>
            <div className="text-sm font-bold">Account & Lists</div>
          </div>
          <Link to={isLoggedIn ? "/admin" : "/login"} className="hover:border border-white p-1 rounded cursor-pointer leading-tight">
            <span className="text-xs">Returns</span>
            <div className="text-sm font-bold">& Orders</div>
          </Link>
          {/* Cart */}
          <Link to="/" className="flex items-center hover:border border-white p-1 rounded cursor-pointer">
            <div className="relative">
              <i className="fa-solid fa-cart-shopping text-2xl"></i>
              <span className="absolute -top-2 -right-1 bg-[#f3a847] text-[#131921] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <span className="font-bold text-sm ml-1 hidden lg:inline">Cart</span>
          </Link>
        </div>
      </div>

      {/* Sub-nav Bar */}
      <div className="bg-[#232f3e] text-white flex items-center p-2 space-x-4 text-sm font-medium overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex items-center hover:border border-white p-1 rounded cursor-pointer font-bold">
          <i className="fa-solid fa-bars mr-1"></i>
          All
        </div>
        <div className="hover:border border-white p-1 rounded cursor-pointer">Today's Deals</div>
        <div className="hover:border border-white p-1 rounded cursor-pointer">Customer Service</div>
        <div className="hover:border border-white p-1 rounded cursor-pointer">Registry</div>
        <div className="hover:border border-white p-1 rounded cursor-pointer">Gift Cards</div>
        <div className="hover:border border-white p-1 rounded cursor-pointer">Sell</div>
        {isLoggedIn && (
          <Link to="/admin" className="text-yellow-400 font-bold hover:underline">Admin Panel</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
