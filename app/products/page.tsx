"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Filter, Star, Check, ShoppingBag } from "lucide-react";

const PRODUCTS = [
  // Laptops
  { id: 1, title: "Apple MacBook Pro 14 Inch", price: 1999.00, category: "Laptops", image: "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp", rating: 4.9, reviews: 341 },
  { id: 2, title: "Asus Zenbook Pro Dual Screen", price: 1799.00, category: "Laptops", image: "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp", rating: 4.7, reviews: 156 },
  { id: 3, title: "Huawei Matebook X Pro", price: 1299.00, category: "Laptops", image: "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/thumbnail.webp", rating: 4.6, reviews: 89 },
  { id: 4, title: "Lenovo Yoga 920", price: 1099.00, category: "Laptops", image: "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/thumbnail.webp", rating: 4.8, reviews: 412 },
  { id: 34, title: "New DELL XPS 13 9300", price: 899.00, category: "Laptops", image: "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp", rating: 4.5, reviews: 210 },
  
  // Smartphones
  { id: 5, title: "iPhone 13 Pro Max", price: 1099.00, category: "Smartphones", image: "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp", rating: 4.8, reviews: 890 },
  { id: 6, title: "iPhone X", price: 899.00, category: "Smartphones", image: "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/thumbnail.webp", rating: 4.5, reviews: 230 },
  { id: 7, title: "Samsung Galaxy S10", price: 699.00, category: "Smartphones", image: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp", rating: 4.6, reviews: 520 },
  { id: 8, title: "Samsung Galaxy S8", price: 499.00, category: "Smartphones", image: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/thumbnail.webp", rating: 4.4, reviews: 356 },
  { id: 35, title: "Realme XT", price: 349.00, category: "Smartphones", image: "https://cdn.dummyjson.com/product-images/smartphones/realme-xt/thumbnail.webp", rating: 4.2, reviews: 120 },
  { id: 36, title: "Vivo X21", price: 499.00, category: "Smartphones", image: "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/thumbnail.webp", rating: 4.3, reviews: 327 },
  
  // Fashion (Premium Local + Web)
  { id: 9, title: "Luxury Minimalist White T-Shirt", price: 95.00, category: "Fashion", image: "/premium_shirt.png", rating: 4.9, reviews: 120 },
  { id: 10, title: "Noir Leather Bomber Jacket", price: 450.00, category: "Fashion", image: "/premium_jacket.png", rating: 5.0, reviews: 84 },
  { id: 21, title: "Crimson Boost 350 Sneakers", price: 220.00, category: "Fashion", image: "/prod_red.png", rating: 4.7, reviews: 312 },
  { id: 22, title: "Ocean Pulse V2 Sneakers", price: 195.00, category: "Fashion", image: "/prod_blue.png", rating: 4.6, reviews: 189 },
  { id: 23, title: "Neon Cyber Runner", price: 250.00, category: "Fashion", image: "/prod_yellow.png", rating: 4.8, reviews: 45 },
  { id: 37, title: "Nike Air Jordan 1 Red", price: 149.00, category: "Fashion", image: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp", rating: 4.7, reviews: 443 },
  { id: 38, title: "Puma Future Rider Trainers", price: 89.00, category: "Fashion", image: "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/thumbnail.webp", rating: 4.9, reviews: 71 },
  { id: 39, title: "Marni Red & Black Suit", price: 179.00, category: "Fashion", image: "https://cdn.dummyjson.com/product-images/womens-dresses/marni-red-&-black-suit/thumbnail.webp", rating: 4.4, reviews: 345 },
  { id: 40, title: "Black Women's Gown", price: 129.00, category: "Fashion", image: "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/thumbnail.webp", rating: 4.6, reviews: 87 },
  { id: 41, title: "Calvin Klein Heel Shoes", price: 79.00, category: "Fashion", image: "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/thumbnail.webp", rating: 4.9, reviews: 74 },
  
  // Accessories & Watches
  { id: 11, title: "Designer Leather Handbag", price: 890.00, category: "Accessories", image: "/premium_bag.png", rating: 4.8, reviews: 210 },
  { id: 12, title: "Longines Master Collection", price: 1450.00, category: "Watches", image: "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/thumbnail.webp", rating: 4.9, reviews: 45 },
  { id: 42, title: "Rolex Submariner Watch", price: 13999.00, category: "Watches", image: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/thumbnail.webp", rating: 5.0, reviews: 471 },
  { id: 43, title: "Rolex Datejust", price: 10999.00, category: "Watches", image: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/thumbnail.webp", rating: 4.8, reviews: 457 },
  { id: 44, title: "Brown Leather Belt Watch", price: 89.00, category: "Watches", image: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp", rating: 4.1, reviews: 150 },
  
  // Fragrances & Beauty
  { id: 13, title: "Chanel Coco Noir", price: 129.00, category: "Fragrances", image: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp", rating: 4.9, reviews: 210 },
  { id: 14, title: "Dior J'adore", price: 89.00, category: "Fragrances", image: "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp", rating: 4.8, reviews: 300 },
  { id: 45, title: "Gucci Bloom Eau de", price: 115.00, category: "Fragrances", image: "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp", rating: 4.7, reviews: 231 },
  { id: 46, title: "Calvin Klein CK One", price: 45.00, category: "Fragrances", image: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp", rating: 4.4, reviews: 541 },
  { id: 47, title: "Essence Mascara", price: 14.00, category: "Beauty", image: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp", rating: 4.2, reviews: 850 },
  
  // Furniture
  { id: 17, title: "Annibale Colombo Bed", price: 1899.00, category: "Furniture", image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp", rating: 4.7, reviews: 56 },
  { id: 18, title: "Annibale Colombo Sofa", price: 2499.00, category: "Furniture", image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp", rating: 4.9, reviews: 42 },
];

const CATEGORIES = ["All", "Laptops", "Smartphones", "Fashion", "Accessories", "Watches", "Fragrances", "Furniture"];
const PRICE_RANGES = ["All", "Under $100", "$100 - $1000", "Over $1000"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePriceRange, setActivePriceRange] = useState("All");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = PRODUCTS.filter(p => {
    if (activeCategory !== "All" && p.category !== activeCategory) return false;
    
    if (activePriceRange === "Under $100" && p.price >= 100) return false;
    if (activePriceRange === "$100 - $1000" && (p.price < 100 || p.price > 1000)) return false;
    if (activePriceRange === "Over $1000" && p.price <= 1000) return false;
    
    return true; 
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f5] font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />
      
      <main className="flex-grow max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-gray-200 pb-8 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">The Collection</h1>
            <p className="text-xl text-gray-500 mt-3 font-medium">Discover {filteredProducts.length} premium products carefully curated for you.</p>
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
                    onClick={() => setActiveCategory(cat)}
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
                    onClick={() => setActivePriceRange(price)}
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
                  <button className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-xl transition-all duration-300 z-20 hover:bg-indigo-700 hover:scale-105 flex items-center gap-2">
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

      <Footer />
    </div>
  );
}
