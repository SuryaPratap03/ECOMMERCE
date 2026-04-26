"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/products";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface User {
  email: string;
  name: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "Processing" | "Delivered" | "Returned";
}

interface StoreContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  placeOrder: (total: number) => void;
  returnOrder: (orderId: string) => void;
  showToast: (msg: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  currency: string;
  setCurrency: (curr: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("nexus_user");
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedCart = localStorage.getItem("nexus_cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart) as any[];
        
        // Data migration to ensure quantity exists and ids are unique
        const uniqueCart: CartItem[] = [];
        parsedCart.forEach(item => {
          const qty = typeof item.quantity === 'number' && !isNaN(item.quantity) ? item.quantity : 1;
          const existing = uniqueCart.find(u => u.id === item.id);
          
          if (existing) {
            existing.quantity += qty;
          } else {
            uniqueCart.push({ ...item, quantity: qty });
          }
        });
        
        setCart(uniqueCart);
        localStorage.setItem("nexus_cart", JSON.stringify(uniqueCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }

    const savedOrders = localStorage.getItem("nexus_orders");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const login = (email: string) => {
    // Simple logic to extract name from email
    const name = email.split("@")[0];
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    
    const newUser = { email, name: capitalizedName };
    setUser(newUser);
    localStorage.setItem("nexus_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nexus_user");
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.id === product.id);
      let updated;
      if (existingItem) {
        updated = prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [...prev, { ...product, quantity: 1 }];
      }
      localStorage.setItem("nexus_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const updated = prev.filter(p => p.id !== productId);
      localStorage.setItem("nexus_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) {
        const updated = prev.filter(p => p.id !== productId);
        localStorage.setItem("nexus_cart", JSON.stringify(updated));
        return updated;
      }
      const updated = prev.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem("nexus_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const placeOrder = (total: number) => {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString(),
      items: [...cart],
      total,
      status: "Processing"
    };
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      localStorage.setItem("nexus_orders", JSON.stringify(updated));
      return updated;
    });
    setCart([]);
    localStorage.setItem("nexus_cart", JSON.stringify([]));
  };

  const returnOrder = (orderId: string) => {
    setOrders((prev) => {
      const updated = prev.map(order => 
        order.id === orderId ? { ...order, status: "Returned" as const } : order
      );
      localStorage.setItem("nexus_orders", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <StoreContext.Provider value={{ user, login, logout, cart, orders, addToCart, removeFromCart, updateQuantity, placeOrder, returnOrder, showToast, language, setLanguage, currency, setCurrency }}>
      {children}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[9999] bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(16,185,129,0.7)] font-bold flex items-center gap-3 border border-emerald-400"
          >
            <CheckCircle2 className="w-6 h-6 text-emerald-100" />
            <span className="text-sm">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
