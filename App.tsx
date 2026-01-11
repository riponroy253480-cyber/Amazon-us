
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { PRODUCTS as initialProducts } from './data/products';
import { Product, CartItem, SiteSettings } from './types';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    heroBannerUrl: "https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg"
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load state from Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch Products
        const { data: dbProducts, error: pError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (pError) throw pError;
        
        if (dbProducts && dbProducts.length > 0) {
          setProducts(dbProducts);
        } else {
          // If DB is empty, use initial data
          setProducts(initialProducts);
        }

        // 2. Fetch Settings
        const { data: dbSettings, error: sError } = await supabase
          .from('site_settings')
          .select('*')
          .single();
        
        if (!sError && dbSettings) {
          setSettings({ heroBannerUrl: dbSettings.heroBannerUrl });
        }

        // 3. Local Auth Check
        const savedAuth = localStorage.getItem('amazon_clone_auth');
        if (savedAuth === 'true') {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Error fetching data from Supabase:", err);
        setProducts(initialProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update filtered products when products change
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const updateProductsState = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  const updateSettingsState = (newSettings: SiteSettings) => {
    setSettings(newSettings);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('amazon_clone_auth', 'true');
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredProducts(products);
    } else {
      const lower = query.toLowerCase();
      setFilteredProducts(products.filter(p => 
        p.title.toLowerCase().includes(lower) || 
        p.description.toLowerCase().includes(lower)
      ));
    }
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#eaeded]">
        <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Loading..." className="w-32 animate-pulse" />
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header cartCount={totalCartItems} onSearch={handleSearch} isLoggedIn={isLoggedIn} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home products={filteredProducts} settings={settings} />} />
            <Route 
              path="/product/:id" 
              element={<ProductDetail products={products} addToCart={addToCart} />} 
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route 
              path="/admin" 
              element={isLoggedIn ? (
                <Admin 
                  products={products} 
                  settings={settings} 
                  updateProducts={updateProductsState} 
                  updateSettings={updateSettingsState} 
                />
              ) : (
                <Navigate to="/login" />
              )} 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
