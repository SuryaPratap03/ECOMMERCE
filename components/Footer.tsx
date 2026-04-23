"use client";

import Link from "next/link";

export default function Footer() {
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
            <li><Link href="#" className="hover:text-white transition-colors">Electronics & Gadgets</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Men's Fashion</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Women's Fashion</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Jewelery & Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Order Tracking</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Newsletter</h4>
          <p className="text-sm text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <div className="flex">
            <input type="email" placeholder="Your email address" className="px-4 py-2 w-full rounded-l-md text-gray-900 outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md font-bold transition-colors">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} NexusMart Inc. All rights reserved.
      </div>
    </footer>
  );
}
