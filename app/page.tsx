"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, Truck, ShieldCheck, CreditCard, ChevronRight, Zap, ShoppingBag, ArrowUpRight } from "lucide-react";

// 20 High-Quality DummyJSON Products
const BESTSELLERS = [
  { id: 1, title: "Apple MacBook Pro 14\"", price: 1999.00, category: "Laptops", image: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp", rating: 4.9, reviews: 341 },
  { id: 2, title: "iPhone 13 Pro Max", price: 1099.00, category: "Smartphones", image: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp", rating: 4.8, reviews: 890 },
  { id: 13, title: "Chanel Coco Noir", price: 129.00, category: "Fragrances", image: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp", rating: 4.9, reviews: 210 },
  { id: 4, title: "Brown Leather Belt Watch", price: 89.99, category: "Watches", image: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp", rating: 4.5, reviews: 412 },
  { id: 17, title: "Annibale Colombo Bed", price: 1899.00, category: "Furniture", image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp", rating: 4.7, reviews: 56 },
  { id: 3, title: "Asus Zenbook Pro Dual Screen", price: 1799.00, category: "Laptops", image: "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp", rating: 4.7, reviews: 156 },
  { id: 14, title: "Dior J'adore", price: 89.00, category: "Fragrances", image: "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp", rating: 4.8, reviews: 300 },
  { id: 12, title: "Longines Master Collection", price: 1450.00, category: "Watches", image: "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/thumbnail.webp", rating: 4.9, reviews: 45 },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f5] text-gray-900 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />
      
      <main className="flex-grow">
        <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-b-[40px] md:rounded-b-[80px]">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
            {/* Hero Text */}
            <div className="flex flex-col justify-center pt-10 lg:pt-0 z-10 relative">
              <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-4 block flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                The Ultimate Department Store
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
                Everything You Need.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Delivered Today.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
                Shop millions of premium products across Tech, Fashion, Home Decor, Beauty, and more. Enjoy free shipping on all orders over $50.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-center flex justify-center items-center gap-2">
                  <ShoppingBag className="w-5 h-5" /> Shop All Categories
                </Link>
                <Link href="/products?category=Electronics" className="bg-white hover:bg-gray-50 text-indigo-900 border border-indigo-100 px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-1 text-center shadow-sm flex justify-center items-center gap-2">
                  View Today's Deals
                </Link>
              </div>
            </div>
            
            {/* Multi-Category Floating Collage */}
            <div className="relative h-[450px] md:h-[600px] w-full flex items-center justify-center mt-10 lg:mt-0">
               {/* Center piece - Tech */}
               <img src="https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp" alt="Tech" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-[400px] z-10 hover:scale-105 transition-transform duration-500 drop-shadow-2xl mix-blend-multiply" />
               
               {/* Top Right - Fashion */}
               <img src="/prod_red.png" alt="Fashion" className="absolute top-10 right-0 md:right-10 w-40 md:w-56 z-20 hover:scale-110 transition-transform duration-500 drop-shadow-2xl rotate-12 mix-blend-multiply" />

               {/* Bottom Left - Accessories */}
               <img src="/premium_bag.png" alt="Accessories" className="absolute bottom-10 left-0 md:left-10 w-40 md:w-56 z-20 hover:scale-110 transition-transform duration-500 drop-shadow-2xl mix-blend-multiply rounded-2xl" />

               {/* Top Left - Beauty */}
               <img src="https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp" alt="Beauty" className="absolute top-20 left-10 w-24 md:w-32 z-0 hover:scale-110 transition-transform duration-500 drop-shadow-xl -rotate-12 mix-blend-multiply" />
               
               {/* Floating Tag */}
               <div className="absolute right-4 md:right-10 bottom-20 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-30 flex items-center gap-2 border border-gray-100 cursor-pointer hover:-translate-y-1 transition-transform">
                 <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                 </span>
                 <span className="font-bold text-gray-900 text-sm">Mega Sale Active</span>
               </div>
            </div>
          </div>
        </section>

        {/* TRUST SCROLL */}
        <div className="py-10 border-b border-gray-200 bg-white overflow-hidden flex flex-col justify-center items-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">Trusted by over 2 Million Customers Worldwide</p>
          <div className="flex justify-center gap-10 md:gap-20 opacity-60 flex-wrap px-4">
            <h2 className="text-2xl font-black italic text-gray-800">VOGUE</h2>
            <h2 className="text-2xl font-black text-gray-800">GQ</h2>
            <h2 className="text-2xl font-black tracking-widest text-gray-800">FORBES</h2>
            <h2 className="text-2xl font-black text-gray-800">WIRED</h2>
            <h2 className="text-2xl font-black italic text-gray-800">Esquire</h2>
          </div>
        </div>

        {/* PREMIUM PRODUCT GRID */}
        <section className="py-24 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">The Curated Edit.</h2>
              <p className="text-xl text-gray-500 font-medium">Handpicked excellence. Discover the season's most wanted items.</p>
            </div>
            <Link href="/products" className="group flex items-center gap-2 text-indigo-600 font-bold text-lg hover:text-indigo-800 transition-colors">
              Explore All <span className="bg-indigo-100 p-2 rounded-full group-hover:translate-x-1 transition-transform"><ChevronRight className="w-5 h-5" /></span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BESTSELLERS.map((product) => (
              <div key={product.id} className="group flex flex-col bg-white rounded-[24px] p-3 shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100">
                <div className="relative w-full aspect-[4/3] mb-4 bg-gray-50 rounded-[16px] flex items-center justify-center p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-100/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <img src={product.image} alt={product.title} className="object-contain h-full w-full group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 relative z-0 mix-blend-multiply" />
                  
                  {/* Quick Add Button */}
                  <button className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-gray-900 text-white px-6 py-3 rounded-full font-bold text-sm shadow-xl transition-all duration-300 z-20 hover:bg-indigo-600 hover:scale-105 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" /> Quick Add
                  </button>
                </div>
                
                <div className="flex flex-col px-2 pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{product.category}</span>
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 leading-tight mb-3 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xl font-black text-gray-900">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* IMMERSIVE PROMO BANNER */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20">
          <div className="bg-gray-900 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/20 to-cyan-400/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
            
            <div className="relative z-10 text-center md:text-left mb-12 md:mb-0 md:w-1/2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white font-bold text-sm mb-6 border border-white/20 backdrop-blur-md">Exclusive Collection</span>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">Elevate Your Space with Premium Tech.</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-lg font-medium leading-relaxed">Experience uncompromised quality and state-of-the-art design with our new arrival of elite electronics.</p>
              <button className="bg-white text-gray-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Shop The Drop
              </button>
            </div>
            
            <div className="relative z-10 w-full md:w-5/12 flex justify-center">
              <div className="relative w-full aspect-square bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-lg rounded-full flex items-center justify-center p-12 border border-white/20 shadow-2xl">
                <img src="https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/thumbnail.webp" alt="Premium Tech" className="object-contain w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-110" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
