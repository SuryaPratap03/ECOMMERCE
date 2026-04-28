"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/contexts/StoreContext";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, user, showToast, placeOrder, setLoginModalOpen } = useStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const shipping = subtotal > 100 ? 0 : 15.0; // Free shipping over $100
  const tax = subtotal * 0.08; // 8% dummy tax
  const total = subtotal + shipping + tax;

  if (!mounted) return null; // Avoid hydration mismatch for localStorage data

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans">
      <Navbar />
      
      <main className="flex-grow max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-8">
          Shopping Cart {cart.length > 0 && <span className="text-xl text-gray-500 font-medium ml-2">({cart.reduce((a, b) => a + (b.quantity || 1), 0)} items)</span>}
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-16 text-center flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-xl text-gray-500 font-medium mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              href="/products" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-[0_10px_30px_rgba(79,70,229,0.3)] transition-all flex items-center gap-2 hover:scale-105"
            >
              Start Shopping <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Cart Items List */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6">
              {cart.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6 group">
                  {/* Image */}
                  <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center p-4 shrink-0 overflow-hidden relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-grow flex flex-col items-center sm:items-start text-center sm:text-left w-full">
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">{item.title}</h3>
                    <p className="text-xl font-black text-gray-900 mb-4">${item.price.toFixed(2)}</p>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between w-full mt-auto">
                      <div className="flex items-center border border-gray-200 rounded-full bg-white">
                        <button 
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-gray-50 rounded-l-full transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-bold text-gray-900 text-sm">{item.quantity || 1}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-gray-50 rounded-r-full transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors flex items-center gap-1 text-sm font-bold"
                      >
                        <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm sticky top-24">
              <h2 className="font-black text-2xl text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
              
              <div className="space-y-4 text-base font-medium text-gray-600 mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping Estimate</span>
                  <span className="font-bold text-gray-900">{shipping === 0 ? <span className="text-green-500">Free</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tax Estimate</span>
                  <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-gray-900">Total Bill</span>
                <span className="text-3xl font-black text-gray-900">${total.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={() => {
                  if (!user) {
                    showToast("Please sign in to complete your purchase.");
                    setLoginModalOpen(true);
                  } else {
                    placeOrder(total);
                    showToast("Order placed successfully! Redirecting to your orders...");
                    router.push("/orders");
                  }
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-[0_8px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_12px_25px_rgba(79,70,229,0.4)] transition-all flex items-center justify-center gap-2 mb-4 hover:scale-[1.02]"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-400 mt-6">
                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Secure Checkout</span>
                <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Fast Delivery</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
