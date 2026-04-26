"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/contexts/StoreContext";
import { MapPin, Truck, CheckCircle2, Package, ArrowLeft } from "lucide-react";

export default function TrackOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const { orders, user } = useStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6">
          <h1 className="text-2xl font-bold">Please log in to track your order.</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const order = orders.find(o => o.id === resolvedParams.id);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
          <Package className="w-16 h-16 text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
          <p className="text-gray-500 mb-6">We couldn't locate the order you're trying to track.</p>
          <button onClick={() => router.push('/orders')} className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold">Back to Orders</button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" /> Back to Orders
          </button>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Track Package</h1>
              <p className="text-gray-500 font-medium mt-1">Order #{order.id} • Placed on {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold flex items-center gap-2 w-fit">
              <Truck className="w-5 h-5" /> In Transit
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tracking Details */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Map Section */}
            <div className="bg-white rounded-[32px] p-2 border border-gray-100 shadow-sm overflow-hidden relative">
              {/* Simulated Map iframe */}
              <div className="w-full h-[400px] bg-gray-200 rounded-[24px] overflow-hidden relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15000000!2d-95.0!3d38.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale contrast-125 opacity-90"
                ></iframe>
                
                {/* Floating overlay card */}
                <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/20">
                  <h3 className="font-black text-lg text-gray-900 mb-1">On its way!</h3>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed">
                    Your parcel has been shipped from <span className="font-bold text-indigo-600">New York, NY</span> and is currently in transit.
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Estimated Delivery</p>
                      <p className="text-sm font-bold text-gray-900">Arrives in 6-7 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
              <h2 className="font-black text-xl text-gray-900 mb-8">Delivery Status</h2>
              
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gray-100"></div>
                <div className="absolute left-[19px] top-2 h-[50%] w-[2px] bg-indigo-600"></div>
                
                <div className="flex flex-col gap-8 relative z-10">
                  {/* Step 1 */}
                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(79,70,229,0.4)]">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Order Confirmed</h4>
                      <p className="text-sm text-gray-500 mt-1">We received your order.</p>
                      <p className="text-xs font-bold text-gray-400 mt-2">{new Date(order.date).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(79,70,229,0.4)]">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Shipped</h4>
                      <p className="text-sm text-gray-500 mt-1">Package has left the facility in New York, NY.</p>
                      <p className="text-xs font-bold text-gray-400 mt-2">1 day ago</p>
                    </div>
                  </div>
                  
                  {/* Step 3 (Current) */}
                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-white border-4 border-indigo-600 flex items-center justify-center shrink-0">
                      <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-indigo-600">In Transit</h4>
                      <p className="text-sm text-gray-500 mt-1">Moving through logistics network. Expected to arrive within 6-7 days.</p>
                      <p className="text-xs font-bold text-gray-400 mt-2">Currently Active</p>
                    </div>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="flex gap-6 opacity-40">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Delivered</h4>
                      <p className="text-sm text-gray-500 mt-1">Package will be handed to resident.</p>
                      <p className="text-xs font-bold text-gray-400 mt-2">Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Order Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm sticky top-24">
              <h2 className="font-black text-xl text-gray-900 mb-6 pb-4 border-b border-gray-100">Package Contents</h2>
              <div className="flex flex-col gap-4 mb-8">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl p-2 shrink-0 border border-gray-100">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 line-clamp-2 leading-snug mb-1">{item.title}</h4>
                      <p className="text-xs font-bold text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Shipping Address</h3>
                <p className="font-bold text-gray-900 text-sm mb-1">{user.name}</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  123 Luxury Lane<br/>
                  Suite 400<br/>
                  Beverly Hills, CA 90210<br/>
                  United States
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
