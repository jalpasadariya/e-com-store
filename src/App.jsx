

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from './Store/cartSlice';
import { PiShoppingCartSimpleLight } from "react-icons/pi";

const App = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("");

  const categories = ["ALL", "LAPTOPS", "MOBILE PHONES", "HEADPHONES", "SMARTWATCHES"];
  
  const sidebarFilters = [
    { label: "All", value: "ALL" },
    { label: "Computers", value: "LAPTOPS" },
    { label: "Mobiles", value: "MOBILE PHONES" },
    { label: "Audio", value: "HEADPHONES" },
    { label: "Wearables", value: "SMARTWATCHES" }
  ];

  const products = [
    { id: 1, name: "HP Spectre x360", price: 1299, category: "LAPTOPS", image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=500" },
    { id: 2, name: "Sony WH-1000XM5 ANC", price: 349, category: "HEADPHONES", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 3, name: "MacBook Pro M3 Max", price: 1549, category: "LAPTOPS", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500" },
    { id: 4, name: "Apple iPhone 15 Pro", price: 999, category: "MOBILE PHONES", image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500" },
    { id: 5, name: "Pixel 8 Pro - Obsidian", price: 899, category: "MOBILE PHONES", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500" },
    { id: 6, name: "Apple Watch Ultra 2", price: 799, category: "SMARTWATCHES", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { id: 7, name: "Bose QuietComfort", price: 299, category: "HEADPHONES", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500" },
    { id: 8, name: "Samsung Galaxy S24", price: 1199, category: "MOBILE PHONES", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500" },
    { id: 9, name: "HP EliteBook 840", price: 1399, category: "LAPTOPS", image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=500" },
    { id: 10, name: "OnePlus 12 Black", price: 699, category: "MOBILE PHONES", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500" },
    { id: 11, name: "AirPods Max Silver", price: 549, category: "HEADPHONES", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500" },
    { id: 12, name: "Garmin Venu 3", price: 449, category: "SMARTWATCHES", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500" },
  ];

  const filteredProducts = products.filter(p => activeCategory === "ALL" || p.category === activeCategory);
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "lowToHigh") return a.price - b.price;
    if (sortBy === "highToLow") return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#F1F4F9] font-sans">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-w-[1200px] mx-auto flex justify-between items-center px-4 md:px-8 py-4">
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-semibold text-gray-800 tracking-tight">E-COMSTORE</span>
          </div>
          <div className="flex items-center gap-2 bg-[#F1F4F9] px-3 py-1.5 rounded-lg border border-gray-100">
            <PiShoppingCartSimpleLight className="text-blue-600 text-lg md:text-xl" />
            <span className="text-xs md:text-sm font-medium text-gray-700">Cart:</span>
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">{cartItems.length}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[11px] font-bold tracking-tight border transition-all ${
                  activeCategory === cat ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto bg-white border border-gray-200 text-gray-500 py-1.5 px-4 rounded-lg text-xs font-semibold outline-none cursor-pointer"
          >
            <option value="">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 pb-16">
          <aside className="hidden lg:block w-[240px] shrink-0">
            <div className="bg-white p-5 rounded-xl border border-gray-200 sticky top-24">
              <h3 className="font-bold text-gray-800 text-xs mb-4">Filter by Category</h3>
              <div className="space-y-3">
                {sidebarFilters.map(item => (
                  <label key={item.label} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio"
                      name="category-filter"
                      checked={activeCategory === item.value}
                      onChange={() => setActiveCategory(item.value)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                    />
                    <span className="text-xs text-gray-600 font-medium group-hover:text-black">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>
          <div className="grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="aspect-square bg-[#F1F4F9]/50 rounded-lg mb-4 flex items-center justify-center p-4">
                    <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <h2 className="text-[13px] font-bold text-gray-800 leading-tight mb-1">{product.name}</h2>
                  <p className="text-xs text-gray-400 mb-3">Professional grade {product.category.toLowerCase()}.</p>
                  <p className="text-lg font-bold text-gray-900 mb-4">${product.price}</p>
                </div>
                <button 
                  onClick={() => dispatch(addToCart(product))}
                  className="w-full bg-[#2B6CB0] hover:bg-blue-700 text-white py-2.5 rounded-md font-bold text-[10px] uppercase tracking-wider transition-colors"
                >
                  ADD TO CART
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;