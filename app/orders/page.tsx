"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/contexts/StoreContext";
import { Package, ArrowRight, RotateCcw, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function OrdersPage() {
  const { orders, returnOrder, user, showToast, addToCart } = useStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "returns">("orders");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const activeOrders = orders.filter(o => o.status !== "Returned");
  const returnedOrders = orders.filter(o => o.status === "Returned");
  const currentList = activeTab === "orders" ? activeOrders : returnedOrders;

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans">
      <Navbar />
      
      <main className="flex-grow max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {!user ? (
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-16 text-center flex flex-col items-center justify-center min-h-[40vh]">
            <ShieldCheck className="w-16 h-16 text-gray-300 mb-6" />
            <h2 className="text-3xl font-black text-gray-900 mb-4">Sign in to view orders</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">You must be logged in to track your packages, view past orders, or initiate a return.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                Your Account
              </h1>
              
              <div className="flex bg-gray-200/50 p-1 rounded-xl w-full md:w-auto">
                <button 
                  onClick={() => setActiveTab("orders")}
                  className={`flex-1 md:w-40 py-2.5 px-4 rounded-lg font-bold text-sm transition-all ${activeTab === 'orders' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Orders ({activeOrders.length})
                </button>
                <button 
                  onClick={() => setActiveTab("returns")}
                  className={`flex-1 md:w-40 py-2.5 px-4 rounded-lg font-bold text-sm transition-all ${activeTab === 'returns' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Returns ({returnedOrders.length})
                </button>
              </div>
            </div>

            {currentList.length === 0 ? (
              <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-16 text-center flex flex-col items-center justify-center min-h-[40vh]">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  {activeTab === "orders" ? <Package className="w-10 h-10 text-gray-300" /> : <RotateCcw className="w-10 h-10 text-gray-300" />}
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-4">
                  {activeTab === "orders" ? "No active orders" : "No returned items"}
                </h2>
                <p className="text-gray-500 font-medium mb-8">
                  {activeTab === "orders" ? "You haven't placed any orders recently." : "You haven't processed any returns."}
                </p>
                <Link 
                  href="/products" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:shadow-[0_10px_30px_rgba(79,70,229,0.3)] transition-all flex items-center gap-2"
                >
                  Start Shopping <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {currentList.map((order) => (
                  <div key={order.id} className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
                    {/* Order Header */}
                    <div className="bg-gray-50 px-6 py-4 flex flex-wrap md:flex-nowrap justify-between gap-4 border-b border-gray-100">
                      <div className="flex gap-8 md:gap-16 w-full md:w-auto">
                        <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Order Placed</p>
                          <p className="text-sm font-bold text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Total</p>
                          <p className="text-sm font-bold text-gray-900">${order.total.toFixed(2)}</p>
                        </div>
                        <div className="hidden sm:block">
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Ship To</p>
                          <p className="text-sm font-bold text-blue-600 hover:underline cursor-pointer">{user?.name}</p>
                        </div>
                      </div>
                      <div className="text-right w-full md:w-auto">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Order ID</p>
                        <p className="text-sm font-bold text-gray-900">#{order.id}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex flex-col gap-4 flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          {order.status === "Returned" ? (
                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5"/> Returned Successfully</span>
                          ) : (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5"/> Arriving soon</span>
                          )}
                        </div>
                        
                        {order.items.map((item, idx) => (
                          <div key={`${item.id}-${idx}`} className="flex gap-4 items-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-xl p-2 shrink-0 border border-gray-100">
                              <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div>
                              <Link href={`/products`} className="font-bold text-sm text-gray-900 hover:text-blue-600 line-clamp-1">{item.title}</Link>
                              <p className="text-xs font-bold text-gray-500 mt-0.5">Qty: {item.quantity} <span className="mx-2">•</span> ${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="w-full md:w-auto flex flex-col gap-2 shrink-0 md:min-w-[180px]">
                        {order.status !== "Returned" && (
                          <button 
                            onClick={() => {
                              returnOrder(order.id);
                              showToast("Order returned successfully. Refund initiated.");
                            }}
                            className="w-full bg-white border-2 border-gray-200 hover:border-red-500 hover:text-red-600 hover:bg-red-50 text-gray-700 px-4 py-2.5 rounded-xl font-bold text-sm transition-all"
                          >
                            Return Order
                          </button>
                        )}
                        <button 
                          onClick={() => {
                            if (order.status === "Returned") {
                              order.items.forEach(item => {
                                for(let i = 0; i < (item.quantity || 1); i++) {
                                  addToCart(item);
                                }
                              });
                              showToast("Items added to your cart!");
                              router.push("/cart");
                            } else {
                              router.push(`/track/${order.id}`);
                            }
                          }}
                          className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2.5 rounded-xl font-bold text-sm transition-all"
                        >
                          {order.status === "Returned" ? "Buy it again" : "Track Package"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
