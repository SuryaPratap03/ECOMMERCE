"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, MapPin, ChevronDown, Bell, X, Clock, TrendingUp, ArrowRight, Loader2, LogOut } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import { motion, AnimatePresence } from "framer-motion";
import { Product, PRODUCTS } from "@/lib/products";
import { useStore } from "@/contexts/StoreContext";

export default function Navbar() {
  const { user, login, logout, cart, addToCart, showToast, language, setLanguage, currency, setCurrency } = useStore();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === "user@gmail.com" && loginPassword === "Password@123") {
      login(loginEmail);
      setShowLoginModal(false);
      setLoginError("");
      setLoginEmail("");
      setLoginPassword("");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsLoadingSearch(false);
      return;
    }

    setIsLoadingSearch(true);
    const delayDebounceFn = setTimeout(() => {
      fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`)
        .then(res => res.json())
        .then(data => {
          setSearchResults(data.slice(0, 5));
          setIsLoadingSearch(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoadingSearch(false);
        });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const [location, setLocation] = useState({
    countryCode: "US",
    country: "United States",
    stateCode: "NY",
    state: "New York",
    address: "",
    city: "New York",
    zip: "10001"
  });
  const [tempLocation, setTempLocation] = useState(location);

  const countries = useMemo(() => Country.getAllCountries(), []);
  
  const states = useMemo(() => {
    return State.getStatesOfCountry(tempLocation.countryCode);
  }, [tempLocation.countryCode]);

  const cities = useMemo(() => {
    if (tempLocation.stateCode) {
      return City.getCitiesOfState(tempLocation.countryCode, tempLocation.stateCode);
    }
    return City.getCitiesOfCountry(tempLocation.countryCode) || [];
  }, [tempLocation.countryCode, tempLocation.stateCode]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const countryObj = countries.find(c => c.isoCode === code);
    const newStates = State.getStatesOfCountry(code);
    const newStateCode = newStates.length > 0 ? newStates[0].isoCode : "";
    const newStateObj = newStates.length > 0 ? newStates[0].name : "";
    
    const newCities = newStateCode 
      ? City.getCitiesOfState(code, newStateCode) 
      : (City.getCitiesOfCountry(code) || []);
    
    const newCity = newCities.length > 0 ? newCities[0].name : "";

    setTempLocation({
      ...tempLocation,
      countryCode: code,
      country: countryObj?.name || "",
      stateCode: newStateCode,
      state: newStateObj,
      city: newCity
    });
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    if (!code) {
      setTempLocation({
        ...tempLocation,
        stateCode: "",
        state: "",
        city: ""
      });
      return;
    }

    const stateObj = states.find(s => s.isoCode === code);
    const newCities = City.getCitiesOfState(tempLocation.countryCode, code);
    const newCity = newCities.length > 0 ? newCities[0].name : "";

    setTempLocation({
      ...tempLocation,
      stateCode: code,
      state: stateObj?.name || "",
      city: newCity
    });
  };
  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gray-900 text-white text-xs py-1.5 px-4 flex justify-between items-center hidden md:flex overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center relative">
          <div className="flex-1 overflow-hidden mr-4">
            <p className="animate-marquee whitespace-nowrap"><span className="inline-flex items-center gap-2"><Bell className="w-3 h-3 text-yellow-400" /> Flash Sale: Up to 50% off select Electronics! Ends in 02:14:59</span></p>
          </div>
          <div className="flex gap-4 items-center bg-gray-900 z-10 pl-4">
            <Link href="/orders" className="hover:text-gray-300 whitespace-nowrap">Track Order</Link>
            <Link href="/help" className="hover:text-gray-300 whitespace-nowrap">Help Centre</Link>
            <span className="text-gray-600">|</span>
            <div className="relative group cursor-pointer pb-2 -mb-2">
              <button className="flex items-center gap-1 hover:text-gray-300 pt-2">{language} <ChevronDown className="w-3 h-3" /></button>
              <div className="absolute top-full left-0 mt-0 w-24 bg-white text-gray-900 rounded shadow-lg hidden group-hover:block z-50 overflow-hidden">
                <div onClick={() => setLanguage('English')} className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-xs">English</div>
                <div onClick={() => setLanguage('Spanish')} className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-xs">Spanish</div>
                <div onClick={() => setLanguage('French')} className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-xs">French</div>
              </div>
            </div>
            <div className="relative group cursor-pointer pb-2 -mb-2">
              <button className="flex items-center gap-1 hover:text-gray-300 pt-2">{currency} <ChevronDown className="w-3 h-3" /></button>
              <div className="absolute top-full left-0 mt-0 w-20 bg-white text-gray-900 rounded shadow-lg hidden group-hover:block z-50 overflow-hidden">
                <div onClick={() => setCurrency('USD')} className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-xs">USD</div>
                <div onClick={() => setCurrency('EUR')} className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-xs">EUR</div>
                <div onClick={() => setCurrency('GBP')} className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-xs">GBP</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center gap-4 md:gap-8">
            
            {/* Logo & Mobile Menu */}
            <div className="flex items-center gap-4 shrink-0">
              <button 
                className="lg:hidden p-1 text-gray-600 hover:text-blue-600"
                onClick={() => setShowMobileMenu(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link href="/" className="font-black text-2xl tracking-tighter text-blue-700 flex items-center gap-1">
                <div className="w-8 h-8 bg-blue-700 text-white rounded-lg flex items-center justify-center font-bold text-xl">N</div>
                <span className="hidden sm:block">NexusMart</span>
              </Link>
            </div>

            {/* Location Selector (Hidden on Mobile) */}
            <div 
              className="hidden xl:flex items-center gap-2 text-sm cursor-pointer hover:border border-transparent hover:border-gray-300 p-1 rounded"
              onClick={() => {
                setTempLocation(location);
                setShowLocationModal(true);
              }}
            >
              <MapPin className="w-5 h-5 text-gray-500" />
              <div className="flex flex-col leading-none">
                <span className="text-[10px] text-gray-500">Deliver to</span>
                <span className="font-bold text-gray-900 truncate max-w-[150px]">{location.city} {location.zip}</span>
              </div>
            </div>

            {/* Mega Search Bar */}
            <div className="hidden sm:flex flex-grow max-w-2xl relative z-40">
              <div className={`flex w-full border-2 rounded-lg overflow-hidden bg-white transition-all duration-200 ${isSearchFocused ? 'border-blue-600 ring-4 ring-blue-100 shadow-lg relative z-50' : 'border-blue-500'}`}>
                <select className="bg-gray-100 text-gray-700 text-sm px-3 py-2 border-r border-gray-300 outline-none cursor-pointer hover:bg-gray-200">
                  <option>All</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Search for products, brands and more..." 
                  className="flex-grow px-4 py-2 outline-none text-sm text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 flex items-center justify-center transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Search Dropdown Overlay */}
              <AnimatePresence>
                {isSearchFocused && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/20 z-30 backdrop-blur-[1px]"
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: 5, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-3 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                    >
                      {!searchQuery ? (
                        <div className="flex flex-col sm:flex-row">
                          {/* Recent Searches */}
                          <div className="w-full sm:w-1/2 p-5 border-b sm:border-b-0 sm:border-r border-gray-100">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Recent Searches</h4>
                            <ul className="space-y-3">
                              {PRODUCTS.slice(0, 4).map((product, idx) => (
                                <li 
                                  key={idx} 
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    setSearchQuery(product.title);
                                  }}
                                  className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer flex items-center gap-2.5 transition-colors"
                                >
                                  <Search className="w-3.5 h-3.5 text-gray-400" /> {product.title}
                                </li>
                              ))}
                            </ul>
                          </div>
                          {/* Trending */}
                          <div className="w-full sm:w-1/2 p-5 bg-gray-50/50">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5"/> Trending Now</h4>
                            <ul className="space-y-3.5">
                              {PRODUCTS.slice(4, 7).map((product, idx) => (
                                <li 
                                  key={idx} 
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    setSearchQuery(product.title);
                                  }}
                                  className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer flex items-center gap-3 transition-colors group"
                                >
                                  <div className="w-6 h-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">{idx + 1}</div>
                                  {product.title}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div className="p-2">
                          {isLoadingSearch ? (
                            <div className="p-10 flex flex-col items-center justify-center text-gray-500">
                              <Loader2 className="w-8 h-8 animate-spin mb-3 text-indigo-600" />
                              <p className="text-sm font-medium">Searching catalog...</p>
                            </div>
                          ) : searchResults.length > 0 ? (
                            <div className="space-y-1">
                              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 pt-2 pb-1 flex items-center gap-1.5">Products</h4>
                              {searchResults.map((item) => (
                                <div 
                                  key={item.id} 
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    setSearchQuery(item.title);
                                    setIsSearchFocused(false);
                                  }}
                                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer group transition-colors"
                                >
                                  <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors overflow-hidden">
                                      {item.image && (item.image.startsWith('http') || item.image.startsWith('/')) ? (
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                      ) : (
                                        <Search className="w-4 h-4" />
                                      )}
                                    </div>
                                    <div>
                                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{item.title}</p>
                                      <p className="text-xs text-gray-500">in <span className="text-blue-500 hover:underline">{item.category}</span></p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-gray-900">${item.price.toFixed(2)}</span>
                                    <button 
                                      className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-100 scale-90"
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        addToCart(item);
                                        showToast(`${item.title} added to cart!`);
                                        setIsSearchFocused(false);
                                        setSearchQuery('');
                                      }}
                                    >
                                      <ShoppingCart className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                              <div className="p-3 border-t border-gray-100 mt-2">
                                <Link 
                                  href={`/products?q=${encodeURIComponent(searchQuery)}`}
                                  onClick={() => setIsSearchFocused(false)}
                                  className="text-sm text-blue-600 font-bold hover:text-blue-800 flex items-center gap-1.5 w-full justify-center group"
                                >
                                  View all results <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                              </div>
                            </div>
                          ) : (
                            <div className="p-10 text-center">
                              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-6 h-6 text-gray-400" />
                              </div>
                              <p className="text-base font-semibold text-gray-900">No results found for "{searchQuery}"</p>
                              <p className="text-sm text-gray-500 mt-1">Try checking your spelling or using more general terms</p>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <button className="sm:hidden p-2 text-gray-600 hover:text-blue-600">
                <Search className="w-5 h-5" />
              </button>
              
              <div className="relative hidden lg:block">
                <div 
                  className="flex flex-col leading-none cursor-pointer hover:border border-transparent hover:border-gray-300 p-1 rounded"
                  onClick={() => user ? setShowUserDropdown(!showUserDropdown) : setShowLoginModal(true)}
                >
                  <span className="text-[10px] text-gray-500">{user ? `Hello, ${user.name}` : "Hello, Sign in"}</span>
                  <span className="font-bold text-gray-900 flex items-center gap-1 text-sm">Account <ChevronDown className="w-3 h-3" /></span>
                </div>

                {/* User Dropdown */}
                {user && showUserDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-sm font-bold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => { logout(); setShowUserDropdown(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>

              <Link href="/orders" className="hidden lg:flex flex-col leading-none cursor-pointer hover:border border-transparent hover:border-gray-300 p-1 rounded">
                <span className="text-[10px] text-gray-500">Returns</span>
                <span className="font-bold text-gray-900 text-sm">& Orders</span>
              </Link>
              
              <Link href="/cart" className="flex items-center p-1 cursor-pointer group">
                <div className="relative">
                  <ShoppingCart className="w-7 h-7 text-gray-700 group-hover:text-blue-600 transition-colors" />
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white">
                    {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
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

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[24px] shadow-2xl w-full max-w-md overflow-hidden mx-4 relative"
          >
            <button 
              onClick={() => setShowLoginModal(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full p-1.5"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Welcome back</h2>
                <p className="text-gray-500 mt-2 text-sm font-medium">Please enter your details to sign in.</p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 hover:bg-white focus:bg-white"
                    placeholder="user@gmail.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
                  <input 
                    type="password" 
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 hover:bg-white focus:bg-white"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                
                {loginError && (
                  <div className="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-lg border border-red-100 text-center">
                    {loginError}
                  </div>
                )}
                
                <button 
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)]"
                >
                  Sign In
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">Demo Credentials: <br/> Email: <strong className="text-gray-900">user@gmail.com</strong> | Password: <strong className="text-gray-900">Password@123</strong></p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden mx-4">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Choose your location</h3>
              <button onClick={() => setShowLocationModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-gray-600">
                Delivery options and delivery speeds may vary for different locations.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Country/Region</label>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    value={tempLocation.countryCode}
                    onChange={handleCountryChange}
                  >
                    {countries.map(c => (
                      <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {states.length > 0 && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">State/Province</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      value={tempLocation.stateCode}
                      onChange={handleStateChange}
                    >
                      <option value="">Select State...</option>
                      {states.map(s => (
                        <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Address</label>
                  <input 
                    type="text" 
                    placeholder="Street address or P.O. Box"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={tempLocation.address}
                    onChange={(e) => setTempLocation({...tempLocation, address: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">City</label>
                    {cities.length > 0 ? (
                      <select 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        value={tempLocation.city}
                        onChange={(e) => setTempLocation({...tempLocation, city: e.target.value})}
                      >
                        <option value="">Select City...</option>
                        {cities.map((c, i) => (
                          <option key={`${c.name}-${i}`} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    ) : (
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={tempLocation.city}
                        onChange={(e) => setTempLocation({...tempLocation, city: e.target.value})}
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Zip Code</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={tempLocation.zip}
                      onChange={(e) => setTempLocation({...tempLocation, zip: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-md transition-colors"
                  onClick={() => {
                    setLocation(tempLocation);
                    setShowLocationModal(false);
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
              onClick={() => setShowMobileMenu(false)}
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-[120] w-4/5 max-w-sm bg-white shadow-2xl flex flex-col"
            >
              <div className="bg-gray-900 text-white px-4 py-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-8 h-8 bg-gray-800 rounded-full p-1.5" />
                  <span className="font-bold text-lg">
                    {user ? `Hello, ${user.name}` : "Hello, Sign in"}
                  </span>
                </div>
                <button onClick={() => setShowMobileMenu(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-4 px-2">
                <div className="px-4 pb-4 mb-4 border-b border-gray-100">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">Shop by Category</h3>
                  <div className="space-y-3">
                    <Link href="/products" onClick={() => setShowMobileMenu(false)} className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded">Today's Deals</Link>
                    <Link href="/products?category=Electronics" onClick={() => setShowMobileMenu(false)} className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded">Electronics</Link>
                    <Link href="/products?category=Fashion" onClick={() => setShowMobileMenu(false)} className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded">Fashion</Link>
                    <Link href="/products?category=Jewelery" onClick={() => setShowMobileMenu(false)} className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded">Jewelery</Link>
                    <Link href="/products" onClick={() => setShowMobileMenu(false)} className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded">New Releases</Link>
                  </div>
                </div>

                <div className="px-4 pb-4 mb-4 border-b border-gray-100">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">Settings & Support</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => {
                        setShowMobileMenu(false);
                        if (!user) setShowLoginModal(true);
                      }}
                      className="w-full text-left text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded"
                    >
                      {user ? "Your Account" : "Sign In"}
                    </button>
                    <Link href="/orders" onClick={() => setShowMobileMenu(false)} className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded">Returns & Orders</Link>
                    <button 
                      onClick={() => {
                        setShowMobileMenu(false);
                        setTempLocation(location);
                        setShowLocationModal(true);
                      }} 
                      className="w-full text-left text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded flex items-center justify-between"
                    >
                      <span>Delivery Location</span>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{location.countryCode}</span>
                    </button>
                    <Link href="/help" onClick={() => setShowMobileMenu(false)} className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-2 py-1 rounded">Customer Service</Link>
                  </div>
                </div>

                {user && (
                  <div className="px-4">
                    <button 
                      onClick={() => {
                        logout();
                        setShowMobileMenu(false);
                      }}
                      className="w-full text-left text-red-600 hover:bg-red-50 px-2 py-2 rounded flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
