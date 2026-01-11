
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductDetailProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products, addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="bg-white p-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/" className="text-blue-600 underline">Back to Home</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    if (product.buyNowUrl) {
      window.location.href = product.buyNowUrl;
    } else {
      alert("Redirecting to checkout...");
    }
  };

  return (
    <div className="max-w-[1500px] mx-auto bg-white min-h-screen p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left: Image */}
        <div className="lg:w-2/5 flex flex-col">
          <div className="sticky top-4">
             <img src={product.image} alt={product.title} className="w-full object-contain max-h-[500px]" />
          </div>
        </div>

        {/* Middle: Details */}
        <div className="lg:w-2/5 flex flex-col space-y-4">
          <h1 className="text-2xl font-medium leading-7 border-b pb-4">
            {product.title}
          </h1>
          <div className="flex items-center space-x-2 text-sm text-blue-600">
            <Link to="/" className="hover:underline">Visit the Store</Link>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fa-solid fa-star text-xs ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}></i>
              ))}
              <span className="ml-1 hover:underline">{product.rating} stars</span>
            </div>
            <span className="hover:underline">| {product.reviewsCount.toLocaleString()} ratings</span>
          </div>

          <div className="flex items-baseline space-x-1 border-b pb-4">
            <span className="text-lg text-red-700">-15%</span>
            <div className="flex items-start">
              <span className="text-xs mt-1">$</span>
              <span className="text-3xl font-medium">{Math.floor(product.price)}</span>
              <span className="text-xs mt-1">{(product.price % 1).toFixed(2).slice(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold">About this item</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {product.features && product.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
              <li>{product.description}</li>
            </ul>
          </div>
        </div>

        {/* Right: Buy Box */}
        <div className="lg:w-1/5 border rounded-lg p-4 space-y-4 h-fit">
          <div className="flex items-start">
            <span className="text-xs mt-1">$</span>
            <span className="text-2xl font-bold">{product.price}</span>
          </div>
          
          <div className="text-sm">
            <div className="text-blue-600 hover:underline cursor-pointer">FREE delivery</div>
            <div className="font-bold">Wednesday, June 12</div>
          </div>

          <div className="text-green-700 font-bold text-lg">In Stock</div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs bg-gray-100 p-2 rounded">
              <span>Quantity:</span>
              <select 
                value={qty} 
                onChange={(e) => setQty(Number(e.target.value))}
                className="bg-transparent border-none outline-none font-bold"
              >
                {[...Array(Math.min(10, product.stockCount))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="bg-[#ffd814] hover:bg-[#f7ca00] w-full py-2 rounded-full shadow transition text-sm font-medium"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="bg-[#ffa41c] hover:bg-[#fa8900] w-full py-2 rounded-full shadow transition text-sm font-medium"
            >
              Buy Now
            </button>
          </div>

          <div className="text-xs space-y-1 text-gray-500">
            <div className="flex justify-between">
              <span>Ships from</span>
              <span className="text-black">Amazon.com</span>
            </div>
            <div className="flex justify-between">
              <span>Sold by</span>
              <span className="text-black">Amazon.com</span>
            </div>
            <div className="flex justify-between">
              <span>Returns</span>
              <span className="text-blue-600 hover:underline">Eligible for Return</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
