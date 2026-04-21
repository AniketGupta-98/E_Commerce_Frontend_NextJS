"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CloudUpload,
  Save,
  ArrowBack,
  LocalOffer,
  Category as CategoryIcon,
  Inventory2
} from '@mui/icons-material';

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    imageUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate product add
    console.log("Submitting product:", formData);
    // You'd typically make an API call here
    // router.push("/products");
  };

  return (
    <div className="min-h-screen p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8 animate-in fade-in duration-500">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <ArrowBack />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-600">
              Add New Product
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Refine your inventory by adding a new product listing.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 hover:text-slate-900 font-medium transition-all shadow-sm w-full md:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 w-full md:w-auto"
          >
            <Save fontSize="small" />
            Save Product
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column - General Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-5 bg-slate-50/50">
              <h2 className="text-lg font-semibold text-slate-800">Basic Information</h2>
            </div>
            <div className="p-6 space-y-6">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Product Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Apple iPhone 15 Pro"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none text-slate-800 placeholder-slate-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe your product here..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none text-slate-800 placeholder-slate-400 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Inventory Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-5 bg-slate-50/50">
              <h2 className="text-lg font-semibold text-slate-800">Pricing & Inventory</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <LocalOffer fontSize="small" className="text-slate-400" />
                  Price (USD) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-500 font-medium">$</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none text-slate-800 placeholder-slate-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Inventory2 fontSize="small" className="text-slate-400" />
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none text-slate-800 placeholder-slate-400"
                  required
                />
              </div>

            </div>
          </div>
        </div>

        {/* Right Column - Media & Organization */}
        <div className="space-y-8">

          {/* Organization Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-5 bg-slate-50/50">
              <h2 className="text-lg font-semibold text-slate-800">Organization</h2>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <CategoryIcon fontSize="small" className="text-slate-400" />
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none text-slate-800 appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing & Apparel</option>
                  <option value="home">Home & Kitchen</option>
                  <option value="beauty">Beauty & Personal Care</option>
                  <option value="sports">Sports & Outdoors</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Media Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-5 bg-slate-50/50">
              <h2 className="text-lg font-semibold text-slate-800">Product Image</h2>
            </div>
            <div className="p-6 space-y-6">

              <div className="w-full flex-col flex items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 hover:border-indigo-300 transition-all cursor-pointer group">
                <div className="p-4 rounded-full bg-indigo-50 text-indigo-500 group-hover:scale-110 transition-transform duration-300">
                  <CloudUpload fontSize="medium" />
                </div>
                <p className="mt-4 text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
                <p className="mt-1 text-xs text-slate-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </div>

              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">OR</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 outline-none text-slate-800 placeholder-slate-400"
                />
              </div>

              {formData.imageUrl && (
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative pt-[100%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.imageUrl}
                    alt="Product preview"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/400x400/e2e8f0/475569?text=Invalid+Image';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

        </div>

      </form>
    </div>
  );
}
