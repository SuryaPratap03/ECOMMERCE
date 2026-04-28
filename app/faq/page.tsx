"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all unused and unopened items. Simply initiate a return from your Orders page, and we will provide a prepaid shipping label. Once we receive the item, your refund will be processed within 3-5 business days."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3-5 business days. We also offer expedited 2-day shipping and next-day delivery options at checkout. Free standard shipping applies to all orders over $100."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location and will be calculated at checkout. Please note that customs duties and taxes are the responsibility of the customer."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order has shipped, you will receive a confirmation email containing a tracking number and a link to track your package. You can also view your tracking information by logging into your account and visiting the Orders section."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are securely processed and encrypted."
  },
  {
    question: "Can I cancel or modify my order?",
    answer: "Orders can be canceled or modified within 1 hour of placement. Please contact our customer support team immediately via live chat or phone. Once an order has been processed by our warehouse, we can no longer make changes."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans">
      <Navbar />
      
      <main className="flex-grow max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-500">Find answers to common questions about our products, shipping, and returns.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index ? 'border-indigo-500 shadow-md' : 'border-gray-200 shadow-sm hover:border-indigo-300'}`}
            >
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className={`font-bold text-lg pr-8 ${openIndex === index ? 'text-indigo-600' : 'text-gray-900'}`}>
                  {faq.question}
                </h3>
                <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openIndex === index ? 'text-indigo-600 rotate-180' : 'text-gray-400'}`} />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h2>
          <p className="text-gray-500 mb-6">If you couldn't find the answer you're looking for, our customer support team is here to help.</p>
          <a href="/help" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Contact Support
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
