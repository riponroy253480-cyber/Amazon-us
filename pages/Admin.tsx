
import React, { useState } from 'react';
import { Product, SiteSettings } from '../types';
import { supabase } from '../lib/supabase';

interface AdminProps {
  products: Product[];
  settings: SiteSettings;
  updateProducts: (products: Product[]) => void;
  updateSettings: (settings: SiteSettings) => void;
}

const Admin: React.FC<AdminProps> = ({ products, settings, updateProducts, updateSettings }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSaving(true);

    try {
      if (editingProduct.id) {
        // UPDATE in Supabase
        const { error } = await supabase
          .from('products')
          .update({
            title: editingProduct.title,
            price: editingProduct.price,
            image: editingProduct.image,
            description: editingProduct.description,
            buyNowUrl: editingProduct.buyNowUrl,
            stockCount: editingProduct.stockCount,
            isPrime: editingProduct.isPrime
          })
          .eq('id', editingProduct.id);
        
        if (error) throw error;
        
        updateProducts(products.map(p => p.id === editingProduct.id ? (editingProduct as Product) : p));
      } else {
        // INSERT into Supabase
        const newId = Date.now().toString();
        const newProduct = {
          id: newId,
          title: editingProduct.title,
          price: editingProduct.price,
          image: editingProduct.image,
          description: editingProduct.description,
          buyNowUrl: editingProduct.buyNowUrl,
          rating: editingProduct.rating || 4.5,
          reviewsCount: editingProduct.reviewsCount || 0,
          features: editingProduct.features || [],
          isPrime: editingProduct.isPrime ?? true,
          stockCount: editingProduct.stockCount || 10,
          category: 'General'
        };

        const { error } = await supabase
          .from('products')
          .insert([newProduct]);
        
        if (error) throw error;
        
        updateProducts([newProduct as Product, ...products]);
      }
      setEditingProduct(null);
    } catch (err) {
      alert("Error saving product: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setIsSaving(true);
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        updateProducts(products.filter(p => p.id !== id));
      } catch (err) {
        alert("Error deleting product: " + err.message);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleUpdateHero = async (newUrl: string) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({ heroBannerUrl: newUrl })
        .eq('id', 1);
      
      if (error) throw error;
      updateSettings({ ...settings, heroBannerUrl: newUrl });
    } catch (err) {
      alert("Error updating settings: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-lg mt-8 min-h-[600px] relative">
      {isSaving && (
        <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="font-bold text-orange-600">Syncing with database...</span>
          </div>
        </div>
      )}

      <div className="flex border-b mb-6">
        <button 
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 font-bold ${activeTab === 'products' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
        >
          Manage Products
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 font-bold ${activeTab === 'settings' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}
        >
          Global Settings
        </button>
      </div>

      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Products Inventory (Database)</h2>
            <button 
              onClick={() => setEditingProduct({ title: '', price: 0, image: '', description: '', buyNowUrl: '' })}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add New Product
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(p => (
              <div key={p.id} className="border rounded p-4 flex flex-col justify-between">
                <div className="flex gap-4">
                  <img src={p.image} alt={p.title} className="w-20 h-20 object-contain" />
                  <div>
                    <h3 className="font-bold line-clamp-1">{p.title}</h3>
                    <p className="text-orange-600 font-bold">${p.price}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => setEditingProduct(p)}
                    className="flex-grow bg-gray-100 hover:bg-gray-200 py-1 rounded text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteProduct(p.id)}
                    className="flex-grow bg-red-100 text-red-600 hover:bg-red-200 py-1 rounded text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {editingProduct && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">{editingProduct.id ? 'Edit Product' : 'Add Product'}</h3>
                <form onSubmit={handleSaveProduct} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-1">Product Title</label>
                      <input 
                        type="text" required
                        className="w-full border rounded px-3 py-2"
                        value={editingProduct.title || ''}
                        onChange={e => setEditingProduct({...editingProduct, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-1">Price ($)</label>
                      <input 
                        type="number" step="0.01" required
                        className="w-full border rounded px-3 py-2"
                        value={editingProduct.price || 0}
                        onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">Image URL (Paste Address)</label>
                    <input 
                      type="text" required
                      placeholder="https://example.com/image.jpg"
                      className="w-full border rounded px-3 py-2"
                      value={editingProduct.image || ''}
                      onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">Buy Now Redirect URL</label>
                    <input 
                      type="text"
                      placeholder="https://another-site.com/buy"
                      className="w-full border rounded px-3 py-2"
                      value={editingProduct.buyNowUrl || ''}
                      onChange={e => setEditingProduct({...editingProduct, buyNowUrl: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">Description</label>
                    <textarea 
                      className="w-full border rounded px-3 py-2 h-24"
                      value={editingProduct.description || ''}
                      onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-grow bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700">Save to Database</button>
                    <button type="button" onClick={() => setEditingProduct(null)} className="flex-grow bg-gray-200 py-2 rounded font-bold hover:bg-gray-300">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Site Appearance (Database)</h2>
          <div className="p-4 border rounded bg-gray-50">
            <label className="block text-sm font-bold mb-2">Homepage Hero Banner URL</label>
            <div className="flex gap-2">
              <input 
                type="text"
                className="flex-grow border rounded px-3 py-2"
                value={settings.heroBannerUrl}
                onChange={e => handleUpdateHero(e.target.value)}
                placeholder="Paste header image address here..."
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">This change will be saved to Supabase and visible to all visitors.</p>
            <div className="mt-4 border p-2 rounded bg-white">
              <p className="text-xs font-bold mb-1">Preview:</p>
              <img src={settings.heroBannerUrl} alt="Hero Preview" className="h-40 w-full object-cover rounded" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
