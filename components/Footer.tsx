"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">NexusMart</h3>
          <p className="text-sm text-gray-400 mb-4">Your one-stop destination for premium electronics, fashion, and everyday essentials. Quality guaranteed.</p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">Shop Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products?category=Laptops" className="hover:text-white transition-colors">Electronics & Gadgets</Link></li>
            <li><Link href="/products?category=Fashion" className="hover:text-white transition-colors">Fashion</Link></li>
            <li><Link href="/products?category=Watches" className="hover:text-white transition-colors">Watches & Accessories</Link></li>
            <li><Link href="/products?category=Furniture" className="hover:text-white transition-colors">Furniture</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/help" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/help" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/orders" className="hover:text-white transition-colors">Order Tracking</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Newsletter</h4>
          {subscribed ? (
            <div className="bg-green-900/50 border border-green-500 text-green-200 p-3 rounded-md text-sm font-medium">
              You are subscribed and you will be notified about the latest products and sales!
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
              <form onSubmit={handleSubscribe} className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-2 w-full rounded-l-md text-gray-900 bg-white outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md font-bold transition-colors">Subscribe</button>
              </form>
            </>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} NexusMart Inc. All rights reserved.
      </div>
    </footer>
  );
}
