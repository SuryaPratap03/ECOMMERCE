"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, MapPin, ChevronDown, Bell } from "lucide-react";

export default function Navbar() {
  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gray-900 text-white text-xs py-1.5 px-4 flex justify-between items-center hidden md:flex">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <p className="flex items-center gap-2"><Bell className="w-3 h-3 text-yellow-400" /> Flash Sale: Up to 50% off select Electronics! Ends in 02:14:59</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300">Track Order</Link>
            <Link href="#" className="hover:text-gray-300">Customer Service</Link>
            <span className="text-gray-600">|</span>
            <button className="flex items-center gap-1 hover:text-gray-300">English <ChevronDown className="w-3 h-3" /></button>
            <button className="flex items-center gap-1 hover:text-gray-300">USD <ChevronDown className="w-3 h-3" /></button>
          </div>
        </div>
      </div>

      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center gap-4 md:gap-8">
            
            {/* Logo & Mobile Menu */}
            <div className="flex items-center gap-4 shrink-0">
              <button className="lg:hidden p-1 text-gray-600 hover:text-blue-600">
                <Menu className="w-6 h-6" />
              </button>
              <Link href="/" className="font-black text-2xl tracking-tighter text-blue-700 flex items-center gap-1">
                <div className="w-8 h-8 bg-blue-700 text-white rounded-lg flex items-center justify-center font-bold text-xl">N</div>
                <span className="hidden sm:block">NexusMart</span>
              </Link>
            </div>

            {/* Location Selector (Hidden on Mobile) */}
            <div className="hidden xl:flex items-center gap-2 text-sm cursor-pointer hover:border border-transparent hover:border-gray-300 p-1 rounded">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div className="flex flex-col leading-none">
                <span className="text-[10px] text-gray-500">Deliver to</span>
                <span className="font-bold text-gray-900">New York 10001</span>
              </div>
            </div>

            {/* Mega Search Bar */}
            <div className="hidden sm:flex flex-grow max-w-2xl">
              <div className="flex w-full border-2 border-blue-500 rounded-lg overflow-hidden bg-white focus-within:ring-2 ring-blue-200 transition-shadow">
                <select className="bg-gray-100 text-gray-700 text-sm px-3 py-2 border-r border-gray-300 outline-none cursor-pointer hover:bg-gray-200">
                  <option>All</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Search for products, brands and more..." 
                  className="flex-grow px-4 py-2 outline-none text-sm text-gray-900"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 flex items-center justify-center transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <button className="sm:hidden p-2 text-gray-600 hover:text-blue-600">
                <Search className="w-5 h-5" />
              </button>
              
              <div className="hidden lg:flex flex-col leading-none cursor-pointer hover:border border-transparent hover:border-gray-300 p-1 rounded">
                <span className="text-[10px] text-gray-500">Hello, Sign in</span>
                <span className="font-bold text-gray-900 flex items-center gap-1 text-sm">Account <ChevronDown className="w-3 h-3" /></span>
              </div>

              <div className="hidden lg:flex flex-col leading-none cursor-pointer hover:border border-transparent hover:border-gray-300 p-1 rounded">
                <span className="text-[10px] text-gray-500">Returns</span>
                <span className="font-bold text-gray-900 text-sm">& Orders</span>
              </div>
              
              <Link href="/cart" className="flex items-center p-1 cursor-pointer group">
                <div className="relative">
                  <ShoppingCart className="w-7 h-7 text-gray-700 group-hover:text-blue-600 transition-colors" />
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white">
                    3
                  </span>
                </div>
                <span className="font-bold text-gray-900 ml-1 hidden md:block group-hover:text-blue-600">Cart</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary Navigation */}
        <nav className="bg-gray-100 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap py-2 hide-scrollbar">
              <button className="flex items-center gap-1 font-bold text-gray-800 hover:text-blue-600 text-sm">
                <Menu className="w-4 h-4" /> All
              </button>
              <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-blue-600">Today's Deals</Link>
              <Link href="/products?category=electronics" className="text-sm font-medium text-gray-700 hover:text-blue-600">Customer Service</Link>
              <Link href="/products?category=electronics" className="text-sm font-medium text-gray-700 hover:text-blue-600">Electronics</Link>
              <Link href="/products?category=clothing" className="text-sm font-medium text-gray-700 hover:text-blue-600">Fashion</Link>
              <Link href="/products?category=jewelery" className="text-sm font-medium text-gray-700 hover:text-blue-600">Jewelery</Link>
              <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-blue-600">New Releases</Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
