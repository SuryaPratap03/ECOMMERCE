"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Filter, Star, Check, ShoppingBag, Loader2 } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { useStore } from "@/contexts/StoreContext";

const CATEGORIES = ["All", "Laptops", "Smartphones", "Fashion", "Accessories", "Watches", "Fragrances", "Furniture"];
const PRICE_RANGES = ["All", "Under $100", "$100 - $1000", "Over $1000"];

function ProductsContent() {
  const { addToCart, showToast } = useStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQ = searchParams?.get('q') || '';
  const urlCategory = searchParams?.get('category') || 'All';

  const [activeCategory, setActiveCategory] = useState(urlCategory);
  const [activePriceRange, setActivePriceRange] = useState("All");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    setIsMobileFilterOpen(false);
    if (searchQ) {
      if (cat === "All") {
        router.push('/products');
      } else {
        router.push(`/products?category=${cat}`);
      }
    }
  };

  useEffect(() => {
    if (urlCategory && CATEGORIES.includes(urlCategory)) {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  const filteredProducts = PRODUCTS.filter(p => {
    if (activeCategory !== "All" && p.category !== activeCategory) return false;
    
    if (activePriceRange === "Under $100" && p.price >= 100) return false;
    if (activePriceRange === "$100 - $1000" && (p.price < 100 || p.price > 1000)) return false;
    if (activePriceRange === "Over $1000" && p.price <= 1000) return false;
    
    if (searchQ) {
      const qLower = searchQ.toLowerCase();
      if (!p.title.toLowerCase().includes(qLower) && !p.category.toLowerCase().includes(qLower)) {
        return false;
      }
    }
    
    return true; 
  });

  return (
    <main className="flex-grow max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-gray-200 pb-8 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">The Collection</h1>
          </div>
          
          <button 
            className="lg:hidden bg-white border border-gray-200 px-6 py-3 rounded-full flex items-center gap-2 font-bold text-sm text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <Filter className="w-5 h-5" /> Filter Collection
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Sidebar Filters */}
          <div className={`lg:w-72 shrink-0 flex-col gap-8 ${isMobileFilterOpen ? 'flex' : 'hidden lg:flex'}`}>
            
            {/* Categories */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <h3 className="font-black text-xl text-gray-900 mb-6 pb-4 border-b border-gray-100">Category</h3>
              <div className="flex flex-col gap-4">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`text-left text-base font-bold flex items-center justify-between group transition-all`}
                  >
                    <span className={`${activeCategory === cat ? 'text-indigo-600 translate-x-2' : 'text-gray-500 group-hover:text-indigo-600 group-hover:translate-x-1'} transition-transform`}>
                      {cat}
                    </span>
                    {activeCategory === cat && <Check className="w-5 h-5 text-indigo-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Ranges */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <h3 className="font-black text-xl text-gray-900 mb-6 pb-4 border-b border-gray-100">Price</h3>
              <div className="flex flex-col gap-4">
                {PRICE_RANGES.map(price => (
                  <button 
                    key={price}
                    onClick={() => {
                      setActivePriceRange(price);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`text-left text-base font-bold flex items-center gap-4 group`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${activePriceRange === price ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 group-hover:border-indigo-400'}`}>
                      {activePriceRange === price && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                    </div>
                    <span className={`${activePriceRange === price ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'} transition-colors`}>
                      {price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group flex flex-col bg-white rounded-[24px] p-3 shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 cursor-pointer">
                <div className="relative w-full aspect-[4/3] mb-4 bg-gray-50 rounded-[16px] flex items-center justify-center p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-100/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <img src={product.image} alt={product.title} className="object-contain h-full w-full group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 relative z-0 mix-blend-multiply" />
                  
                  {/* Quick Add Button */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                      showToast(`${product.title} added to cart!`);
                    }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 md:translate-y-10 md:opacity-0 translate-y-0 opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-xl transition-all duration-300 z-20 hover:bg-indigo-700 hover:scale-105 flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
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
                  <h3 className="font-bold text-lg text-gray-900 leading-tight mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xl font-black text-gray-900">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-32 text-center bg-white rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Filter className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">No exclusive pieces found</h3>
                <p className="text-xl text-gray-500 font-medium">Try adjusting your filters to discover our collection.</p>
              </div>
            )}
          </div>
        </div>
      </main>
  );
}

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f5] font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <Suspense fallback={<div className="flex-grow flex items-center justify-center py-32"><Loader2 className="w-10 h-10 animate-spin text-indigo-600" /></div>}>
        <ProductsContent />
      </Suspense>
      <Footer />
    </div>
  );
}
