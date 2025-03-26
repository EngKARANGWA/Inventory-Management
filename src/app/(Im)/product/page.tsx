'use client';

import { useState } from 'react';

// Define product name type
type ProductName = 'Super' | 'Ordinaire' | 'Bran';

interface Product {
  id: number;
  name: ProductName;  // Updated to use ProductName type
  category: 'Raw Material' | 'Semi-Final' | 'Final Product';
  description: string;
  createdAt: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Omit<Product, 'id'>) => void;
}

const AddProductModal = ({ isOpen, onClose, onAdd }: AddProductModalProps) => {
  const [newProduct, setNewProduct] = useState({
    name: 'Super' as ProductName,  // Set default value
    category: 'Raw Material' as Product['category'],
    description: '',
    createdAt: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newProduct);
    onClose();
    setNewProduct({
      name: 'Super',
      category: 'Raw Material',
      description: '',
      createdAt: new Date().toISOString().split('T')[0]
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[550px] max-h-[85vh] overflow-y-auto shadow-xl">
        <div className="mb-6 pb-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value as ProductName })}
              required
            >
              <option value="Super">Super</option>
              <option value="Ordinaire">Ordinaire</option>
              <option value="Bran">Bran</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as Product['category'] })}
            >
              <option value="Raw Material">Raw Material</option>
              <option value="Semi-Final">Semi-Final</option>
              <option value="Final Product">Final Product</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Creation Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              value={newProduct.createdAt}
              onChange={(e) => setNewProduct({ ...newProduct, createdAt: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Helper function to get product name color
const getProductNameColor = (name: ProductName): string => {
  switch (name) {
    case 'Super':
      return 'text-blue-600';
    case 'Ordinaire':
      return 'text-green-600';
    case 'Bran':
      return 'text-amber-600';
    default:
      return 'text-gray-600';
  }
};

export default function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<'all' | 'day' | 'week' | 'month'>('all');
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Super',
      category: 'Raw Material',
      description: 'Basic raw material for production',
      createdAt: '2025-03-26'
    }
  ]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const productDate = new Date(product.createdAt);
    const today = new Date();

    if (dateFilter === 'day') {
      return matchesSearch && productDate.toDateString() === today.toDateString();
    }
    if (dateFilter === 'week') {
      const weekAgo = new Date(today.setDate(today.getDate() - 7));
      return matchesSearch && productDate >= weekAgo;
    }
    if (dateFilter === 'month') {
      return matchesSearch && 
        productDate.getMonth() === today.getMonth() && 
        productDate.getFullYear() === today.getFullYear();
    }
    return matchesSearch;
  });

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Products Management</h1>
        <p className="text-gray-600">Manage and track all products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Total Products</div>
          <div className="text-2xl font-bold text-gray-800">{products.length}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Raw Materials</div>
          <div className="text-2xl font-bold text-blue-600">
            {products.filter(p => p.category === 'Raw Material').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Final Products</div>
          <div className="text-2xl font-bold text-green-600">
            {products.filter(p => p.category === 'Final Product').length}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as typeof dateFilter)}
          >
            <option value="all">All Time</option>
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Product List</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{product.id}</td>
                  <td className={`px-6 py-4 font-medium ${getProductNameColor(product.name)}`}>
                    {product.name}
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.description}</td>
                  <td className="px-6 py-4">{product.createdAt}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddProduct}
      />
    </div>
  );
}
