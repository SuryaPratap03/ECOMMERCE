"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LifeBuoy, MessageSquare, Phone, Mail, FileText, ArrowRight, Package, RotateCcw, ShieldCheck, CreditCard, Settings, Search as SearchIcon, ArrowLeft } from "lucide-react";

type Article = {
  id: string;
  categoryId: string;
  title: string;
  content: React.ReactNode;
};

const CATEGORIES = [
  { id: "orders", icon: Package, title: "Orders & Shipping", desc: "Track packages, edit orders, or check shipping rates." },
  { id: "returns", icon: RotateCcw, title: "Returns & Refunds", desc: "Start a return, check refund status, or view policies." },
  { id: "account", icon: ShieldCheck, title: "Account & Security", desc: "Manage passwords, update email, or configure 2FA." },
  { id: "payment", icon: CreditCard, title: "Payment & Billing", desc: "Update payment methods, view invoices, or fix declined cards." },
  { id: "support", icon: Settings, title: "Product Support", desc: "Troubleshooting, manuals, and technical assistance." },
  { id: "policies", icon: FileText, title: "Policies & Terms", desc: "Read our terms of service, privacy policy, and guidelines." },
];

const ARTICLES: Article[] = [
  { 
    id: "o1", categoryId: "orders", title: "How do I track my order?", 
    content: <div className="space-y-4"><p>Tracking your order is easy! Simply log into your account, navigate to the <strong>Orders</strong> dashboard via the top-right menu, and click on "Track Package" next to your active order. You'll be able to see real-time updates and a live map of your package's journey.</p></div> 
  },
  { 
    id: "o2", categoryId: "orders", title: "Can I change my shipping address?", 
    content: <div className="space-y-4"><p>If your order hasn't shipped yet, you can change the shipping address. Please contact our live chat support immediately with your Order ID. Once an order is marked as 'Shipped', the address cannot be changed.</p></div> 
  },
  { 
    id: "r1", categoryId: "returns", title: "What is your return policy?", 
    content: <div className="space-y-4"><p>We offer a generous 30-day return window. If you are not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund. Items must be unworn, unwashed, and in their original packaging.</p></div> 
  },
  { 
    id: "r2", categoryId: "returns", title: "How long do refunds take?", 
    content: <div className="space-y-4"><p>Once we receive your returned item, our team will inspect it within 2 business days. After approval, the refund will be issued to your original payment method. Depending on your bank, it may take an additional 3-5 business days to appear on your statement.</p></div> 
  },
  { 
    id: "a1", categoryId: "account", title: "How do I reset my password?", 
    content: <div className="space-y-4"><p>Click the 'Sign In' button at the top of the page, then click 'Forgot Password'. Enter the email associated with your account, and we will send you a secure link to reset your password. If you don't receive it, check your spam folder.</p></div> 
  },
  { 
    id: "a2", categoryId: "account", title: "How do I delete my account?", 
    content: <div className="space-y-4"><p>If you wish to permanently delete your account and all associated data, please contact our support team via email at support@nexusmart.com. For security reasons, we will need to verify your identity before processing the deletion.</p></div> 
  },
  { 
    id: "p1", categoryId: "payment", title: "What payment methods are accepted?", 
    content: <div className="space-y-4"><p>We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also support digital wallets like Apple Pay, Google Pay, and PayPal for a seamless checkout experience.</p></div> 
  },
  { 
    id: "p2", categoryId: "payment", title: "Why was my card declined?", 
    content: <div className="space-y-4"><p>A card may be declined for several reasons: incorrect billing information, expired card, insufficient funds, or a fraud alert from your bank. Please double-check your zip code and CVV. If the issue persists, contact your bank to authorize the transaction.</p></div> 
  },
  { 
    id: "s1", categoryId: "support", title: "What do I do if an item is defective?", 
    content: <div className="space-y-4"><p>We apologize if you received a defective product! Please take photos of the defect and the packaging. Reach out to our customer service via Live Chat or Email, and we will immediately process a free replacement or full refund.</p></div> 
  },
  { 
    id: "s2", categoryId: "support", title: "Are your electronics covered by warranty?", 
    content: <div className="space-y-4"><p>Yes, all electronics sold on NexusMart come with a standard 1-year manufacturer warranty covering defects in materials and workmanship. Extended warranties can also be purchased during checkout.</p></div> 
  },
  { 
    id: "t1", categoryId: "policies", title: "Terms of Service", 
    content: <div className="space-y-4"><p>By accessing and using NexusMart, you agree to comply with our general Terms of Service. This includes maintaining the confidentiality of your account, providing accurate billing information, and adhering to our community guidelines for product reviews. NexusMart reserves the right to cancel orders suspected of fraud.</p></div> 
  },
  { 
    id: "t2", categoryId: "policies", title: "Privacy Policy", 
    content: <div className="space-y-4"><p>Your privacy is important to us. We do not sell your personal data to third parties. Data collected during checkout is encrypted and used solely for fulfilling your orders and improving your shopping experience. You can opt out of marketing emails at any time.</p></div> 
  },
];

export default function HelpCentrePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  // Derive state to show
  const activeCategory = CATEGORIES.find(c => c.id === activeCategoryId);
  const activeArticle = ARTICLES.find(a => a.id === activeArticleId);
  
  // Search filtering
  const isSearching = searchQuery.trim().length > 0;
  const searchResults = isSearching 
    ? ARTICLES.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans">
      <Navbar />
      
      <main className="flex-grow max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
            <LifeBuoy className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
            Search our knowledge base or get in touch with our support team.
          </p>
          
          <div className="max-w-2xl mx-auto relative group">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveArticleId(null);
                setActiveCategoryId(null);
              }}
              placeholder="Search for articles, guides, or FAQs..." 
              className="w-full pl-14 pr-32 py-4 rounded-full border-2 border-transparent focus:border-blue-500 shadow-lg outline-none text-gray-900 text-lg transition-all"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-full font-bold hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* View Router */}
        <div className="min-h-[400px]">
          {/* View 1: Search Results */}
          {isSearching && !activeArticleId && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Search results for "{searchQuery}"</h2>
              {searchResults.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-[24px] border border-gray-100 shadow-sm">
                  <p className="text-gray-500 text-lg">No articles found matching your query. Please try different keywords.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {searchResults.map(article => (
                    <div 
                      key={article.id} 
                      onClick={() => setActiveArticleId(article.id)}
                      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex justify-between items-center"
                    >
                      <div>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 block">
                          {CATEGORIES.find(c => c.id === article.categoryId)?.title}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{article.title}</h3>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* View 2: Reading an Article */}
          {activeArticle && (
            <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[32px] border border-gray-100 shadow-sm">
              <button 
                onClick={() => {
                  setActiveArticleId(null);
                  if (isSearching) return;
                }}
                className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" /> Back to {isSearching ? 'search results' : activeCategory?.title || 'Help Centre'}
              </button>
              
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                {CATEGORIES.find(c => c.id === activeArticle.categoryId)?.title}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 leading-tight">{activeArticle.title}</h1>
              
              <div className="prose prose-lg text-gray-600 max-w-none leading-relaxed">
                {activeArticle.content}
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                <p className="font-bold text-gray-500">Was this article helpful?</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-50 hover:bg-green-50 hover:text-green-600 text-gray-700 rounded-lg font-bold transition-colors">Yes</button>
                  <button className="px-4 py-2 bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-lg font-bold transition-colors">No</button>
                </div>
              </div>
            </div>
          )}

          {/* View 3: Inside a Category */}
          {!isSearching && !activeArticle && activeCategory && (
            <div className="max-w-4xl mx-auto">
              <button 
                onClick={() => setActiveCategoryId(null)}
                className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" /> Back to all categories
              </button>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  {activeCategory.icon && <activeCategory.icon className="w-8 h-8" />}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">{activeCategory.title}</h2>
                  <p className="text-gray-500 font-medium">{activeCategory.desc}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {ARTICLES.filter(a => a.categoryId === activeCategory.id).map(article => (
                  <div 
                    key={article.id} 
                    onClick={() => setActiveArticleId(article.id)}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex justify-between items-center"
                  >
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{article.title}</h3>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* View 4: Main Categories Grid */}
          {!isSearching && !activeArticle && !activeCategory && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setActiveCategoryId(item.id)}
                  className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 mb-4">{item.desc}</p>
                  <span className="text-blue-600 font-bold flex items-center gap-1 group-hover:gap-2 transition-all">View articles <ArrowRight className="w-4 h-4" /></span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Support */}
        {!activeArticle && (
          <div className="bg-gray-900 rounded-[32px] overflow-hidden mt-20">
            <div className="px-8 py-12 md:p-16 text-center text-white">
              <h2 className="text-3xl font-black mb-4">Can't find what you're looking for?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-10">
                Our award-winning customer support team is available 24/7 to assist you with any questions or concerns you might have.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur border border-white/20 p-6 rounded-2xl flex flex-col items-center hover:bg-white/20 transition-colors cursor-pointer">
                  <MessageSquare className="w-8 h-8 text-blue-400 mb-4" />
                  <h4 className="font-bold text-lg mb-1">Live Chat</h4>
                  <p className="text-sm text-gray-400">Response time: ~2 mins</p>
                </div>
                <div className="bg-white/10 backdrop-blur border border-white/20 p-6 rounded-2xl flex flex-col items-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Phone className="w-8 h-8 text-green-400 mb-4" />
                  <h4 className="font-bold text-lg mb-1">Call Us</h4>
                  <p className="text-sm text-gray-400">1-800-NEXUS-MART</p>
                </div>
                <div className="bg-white/10 backdrop-blur border border-white/20 p-6 rounded-2xl flex flex-col items-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Mail className="w-8 h-8 text-purple-400 mb-4" />
                  <h4 className="font-bold text-lg mb-1">Email Support</h4>
                  <p className="text-sm text-gray-400">support@nexusmart.com</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
