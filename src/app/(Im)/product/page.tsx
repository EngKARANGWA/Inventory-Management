'use client';

import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: 'Raw Material' | 'Semi-Final' | 'Final Product' ;
  description: string;
  price: number;
  status: 'In Production' | 'Completed' | 'On Hold';
  quantity: number;
  createdAt: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Omit<Product, 'id'>) => void;
}

const AddProductModal = ({ isOpen, onClose, onAdd }: AddProductModalProps) => {
  const [newProduct, setNewProduct] = useState({
    productID: '',
    name: '',
    category: 'Raw Material' as Product['category'], // Update this line
    description: '',
    price: 0,
    status: 'In Production' as Product['status'],
    quantity: 0,
    createdAt: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newProduct);
    onClose();
    // Reset form
    setNewProduct({
          productID: '',
          name: '',
          category: 'Raw Material',
          description: '',
          price: 0,
          status: 'In Production',
          quantity: 0,
          createdAt: new Date().toISOString().split('T')[0]
        });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-2 rounded-xl w-[550px] max-h-[85vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="w-full px-23 py-2.5 bg-green-500 color-whitew-full    mb-6 pb-4 border-b">
          <h2 className="text-2xl mr-20 font-bold text-white">Add New Product</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product ID and Name row */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
              <input
                type="text"
                placeholder="Enter product ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={newProduct.productID}
                onChange={(e) => setNewProduct({ ...newProduct, productID: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Category and Status row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as Product['category'] })}
              >
                <option value="Raw Material">Raw Material</option>
                <option value="Semi-Final">Semi-Final</option>
                <option value="Final Product">Final Product</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                value={newProduct.status}
                onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value as Product['status'] })}
              >
                <option value="In Production">In Production</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="Enter product description"
              rows={3}
              className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              required
            />
          </div>

          {/* Price and Quantity row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">frw</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                placeholder="Enter quantity"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          {/* Created At */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Creation Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={newProduct.createdAt}
              onChange={(e) => setNewProduct({ ...newProduct, createdAt: e.target.value })}
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 mt-8 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 w-100 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add this type for date filter options
type DateFilterType = 'all' | 'day' | 'week' | 'month' | 'custom';

export default function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    { 
      id: 1, 
      name: 'Bran', 
      category: 'Semi-Final',
      description: 'High-quality electronic component',
      price: 299.99,
      status: 'In Production',
      quantity: 100,
      createdAt: '2025-03-22'
    },
    { 
      id: 2, 
      name: 'Super', 
      category: 'Final Product',
      description: 'Industrial machinery part',
      price: 599.99,
      status: 'Completed',
      quantity: 50,
      createdAt: '2025-03-21'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all');
  const [customDate, setCustomDate] = useState('');

  // Add this date filtering function
  const getFilteredByDate = (products: Product[]) => {
    const today = new Date();
    const productDate = (date: string) => new Date(date);

    switch (dateFilter) {
      case 'day':
        return products.filter(product => 
          productDate(product.createdAt).toDateString() === today.toDateString()
        );
      case 'week':
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return products.filter(product => {
          const date = productDate(product.createdAt);
          return date >= lastWeek && date <= today;
        });
      case 'month':
        return products.filter(product => {
          const date = productDate(product.createdAt);
          return date.getMonth() === today.getMonth() && 
                 date.getFullYear() === today.getFullYear();
        });
      case 'custom':
        return products.filter(product => product.createdAt === customDate);
      default:
        return products;
    }
  };

  // Update the filteredProducts constant
  const filteredProducts = getFilteredByDate(
    products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || product.status === statusFilter)
    )
  );

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'In Production':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'On Hold':
        return 'bg-red-100 text-red-800';
    }
  };

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    setProducts([
      ...products,
      {
        ...newProduct,
        id: products.length + 1,
      }
    ]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Factory Products</h1>
        <button 
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Product
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="In Production">In Production</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>

          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as DateFilterType)}
          >
            <option value="all">All Dates</option>
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom</option>
          </select>

          {dateFilter === 'custom' && (
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
            />
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white w-280 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddProduct}
      />
    </div>
  );
}
