
import React from 'react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-10">
      <div 
        onClick={scrollToTop}
        className="bg-[#37475a] hover:bg-[#485769] text-white text-center p-4 cursor-pointer text-sm"
      >
        Back to top
      </div>
      
      <div className="bg-[#232f3e] text-white py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-3 text-base">Get to Know Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Blog</li>
              <li className="hover:underline cursor-pointer">About Amazon</li>
              <li className="hover:underline cursor-pointer">Investor Relations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-base">Make Money with Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Sell products on Amazon</li>
              <li className="hover:underline cursor-pointer">Sell on Amazon Business</li>
              <li className="hover:underline cursor-pointer">Become an Affiliate</li>
              <li className="hover:underline cursor-pointer">Advertise Your Products</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-base">Amazon Payment Products</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Amazon Business Card</li>
              <li className="hover:underline cursor-pointer">Shop with Points</li>
              <li className="hover:underline cursor-pointer">Reload Your Balance</li>
              <li className="hover:underline cursor-pointer">Amazon Currency Converter</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-base">Let Us Help You</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Amazon and COVID-19</li>
              <li className="hover:underline cursor-pointer">Your Account</li>
              <li className="hover:underline cursor-pointer">Your Orders</li>
              <li className="hover:underline cursor-pointer">Shipping Rates & Policies</li>
              <li className="hover:underline cursor-pointer">Help</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#131a22] text-white py-10 text-center border-t border-gray-700">
        <img 
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
          alt="Amazon" 
          className="w-20 mx-auto mb-6"
        />
        <div className="text-xs text-gray-400 max-w-2xl mx-auto px-4">
          Conditions of Use & Sale &nbsp; Privacy Notice &nbsp; Interest-Based Ads &nbsp; © 1996-2024, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </footer>
  );
};

export default Footer;
