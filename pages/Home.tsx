
import React from 'react';
import { Link } from 'react-router-dom';
import { Product, SiteSettings } from '../types';

interface HomeProps {
  products: Product[];
  settings: SiteSettings;
}

const Home: React.FC<HomeProps> = ({ products, settings }) => {
  return (
    <div className="max-w-[1500px] mx-auto">
      {/* Hero Section - The "Header Image" */}
      <div className="relative">
        <div className="absolute w-full h-full bg-gradient-to-t from-[#eaeded] via-transparent to-transparent z-10 bottom-0" />
        <img 
          src={settings.heroBannerUrl} 
          alt="Amazon Hero Banner" 
          className="w-full h-auto min-h-[300px] lg:h-[600px] object-cover"
        />
      </div>

      {/* Product List Strip */}
      <div className="relative z-20 px-4 mb-6 -mt-10 md:-mt-32 lg:-mt-48">
        <div className="bg-white p-5 shadow-sm rounded-sm">
          <h2 className="text-xl font-bold mb-6">Recommended for you</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {products.map(product => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="flex flex-col group cursor-pointer border p-4 hover:shadow-lg transition-shadow bg-white rounded"
              >
                <div className="h-48 flex items-center justify-center overflow-hidden mb-4">
                  <img src={product.image} alt={product.title} className="max-h-full transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-sm font-medium line-clamp-2 text-blue-600 group-hover:text-orange-700 mb-2 leading-snug">
                  {product.title}
                </h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa-solid fa-star text-xs ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}></i>
                  ))}
                  <span className="text-blue-500 text-xs ml-1 hover:underline">{product.reviewsCount.toLocaleString()}</span>
                </div>
                <div className="flex items-start mb-2">
                  <span className="text-xs font-bold mt-1 tracking-tighter">$</span>
                  <span className="text-2xl font-bold">{Math.floor(product.price)}</span>
                  <span className="text-xs font-bold mt-1">{(product.price % 1).toFixed(2).slice(2)}</span>
                </div>
                {product.isPrime && (
                  <div className="flex items-center space-x-1 mt-auto">
                    <img src="https://m.media-amazon.com/images/G/01/prime/marketing/Acquisition/2016/PrimeLogo_v1._CB485935102_.png" alt="Prime" className="w-12" />
                    <span className="text-xs text-gray-500">FREE Delivery</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
