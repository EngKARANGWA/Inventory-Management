'use client';

import { useState, useEffect } from 'react';
import AddSaleModal from '../components/AddSaleModal'; // Adjust the path as necessary

// Add DateFilterType
type DateFilterType = 'all' | 'day' | 'week' | 'month' | 'custom';

// Update the Sale interface
interface Sale {
  id: number;
  orderNumber: string;
  customerName: string;
  product: string;
  quantity: number;
  quantityCarried: number;
  quantityRemained: number;
  totalAmount: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  date: string;
}

// Add this component before the main SalesPage component
const EditSaleModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  sale 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (sale: Sale) => void; 
  sale: Sale; 
}) => {
  const [editedSale, setEditedSale] = useState(sale);

  useEffect(() => {
    setEditedSale(sale);
  }, [sale]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedSale);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Enhanced Header with close button */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Edit Sale Details</h2>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Order and Customer Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Order Number</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={editedSale.orderNumber}
                onChange={(e) => setEditedSale({ ...editedSale, orderNumber: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Name</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={editedSale.customerName}
                onChange={(e) => setEditedSale({ ...editedSale, customerName: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Product and Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={editedSale.product}
                onChange={(e) => setEditedSale({ ...editedSale, product: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Total Quantity</label>
              <input
                type="number"
                min="1"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={editedSale.quantity}
                onChange={(e) => {
                  const total = Number(e.target.value);
                  const carried = editedSale.quantityCarried;
                  setEditedSale({
                    ...editedSale,
                    quantity: total,
                    quantityRemained: Math.max(0, total - carried)
                  });
                }}
                required
              />
            </div>
          </div>

          {/* Quantity Carried and Quantity Remained */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity Carried</label>
              <input
                type="number"
                min="0"
                max={editedSale.quantity}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={editedSale.quantityCarried}
                onChange={(e) => {
                  const carried = Number(e.target.value);
                  const total = editedSale.quantity;
                  setEditedSale({
                    ...editedSale,
                    quantityCarried: carried,
                    quantityRemained: Math.max(0, total - carried)
                  });
                }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity Remained</label>
              <input
                type="number"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100"
                value={editedSale.quantityRemained}
                readOnly
              />
            </div>
          </div>

          {/* Amount and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Total Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">frw</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                  value={editedSale.totalAmount}
                  onChange={(e) => setEditedSale({ ...editedSale, totalAmount: Number(e.target.value) })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={editedSale.status}
                onChange={(e) => setEditedSale({ ...editedSale, status: e.target.value as Sale['status'] })}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
            <input
              type="date"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
              value={editedSale.date}
              onChange={(e) => setEditedSale({ ...editedSale, date: e.target.value })}
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-lg shadow-green-500/30"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([
    {
      id: 1,
      orderNumber: 'ORD-001',
      customerName: 'ABC Company',
      product: 'Super',
      quantity: 50,
      quantityCarried: 30,
      quantityRemained: 20,
      totalAmount: 14999.50,
      status: 'Completed',
      date: '2025-03-22'
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customerName: 'XYZ Industries',
      product: 'Bran',
      quantity: 25,
      quantityCarried: 0,
      quantityRemained: 25,
      totalAmount: 14999.75,
      status: 'Pending',
      date: '2025-03-22'
    }
  ]);

  // Add new filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all');
  const [customDate, setCustomDate] = useState('');

  // Add these new states after existing useState declarations
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  // Update the SalesPage component to include these new states and handlers
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSale = (saleData: Omit<Sale, 'id' | 'quantityCarried' | 'quantityRemained'>) => {
    const newSale: Sale = {
      ...saleData,
      id: sales.length + 1,
      quantityCarried: 0,
      quantityRemained: saleData.quantity
    };
    setSales([...sales, newSale]);
    setIsModalOpen(false);
  };

  // Add date filtering function
  const getFilteredByDate = (sales: Sale[]) => {
    const today = new Date();
    const saleDate = (date: string) => new Date(date);

    switch (dateFilter) {
      case 'day':
        return sales.filter(sale => 
          saleDate(sale.date).toDateString() === today.toDateString()
        );
      case 'week':
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return sales.filter(sale => {
          const date = saleDate(sale.date);
          return date >= lastWeek && date <= today;
        });
      case 'month':
        return sales.filter(sale => {
          const date = saleDate(sale.date);
          return date.getMonth() === today.getMonth() && 
                 date.getFullYear() === today.getFullYear();
        });
      case 'custom':
        return sales.filter(sale => sale.date === customDate);
      default:
        return sales;
    }
  };

  // Update filteredSales to use all filters
  const filteredSales = getFilteredByDate(
    sales.filter(sale =>
      (sale.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
       sale.customerName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || sale.status === statusFilter)
    )
  );

  const getStatusColor = (status: Sale['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  // Add these new handlers before the return statement
  const handleEditClick = (sale: Sale) => {
    setSelectedSale(sale);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (confirm('Are you sure you want to delete this sale?')) {
      setSales(sales.filter(sale => sale.id !== id));
    }
  };

  const handleEditSave = (updatedSale: Sale) => {
    setSales(sales.map(sale => 
      sale.id === updatedSale.id ? updatedSale : sale
    ));
    setIsEditModalOpen(false);
    setSelectedSale(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Enhanced Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sales Management</h1>
        <p className="text-gray-600">Manage and track all sales transactions</p>
      </div>

      {/* Actions and Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Total Sales</div>
          <div className="text-2xl font-bold text-gray-800">
            ${filteredSales.reduce((acc, sale) => acc + sale.totalAmount, 0).toFixed(2)}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Total Orders</div>
          <div className="text-2xl font-bold text-gray-800">{filteredSales.length}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Pending Orders</div>
          <div className="text-2xl font-bold text-yellow-600">
            {filteredSales.filter(sale => sale.status === 'Pending').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Completed Orders</div>
          <div className="text-2xl font-bold text-green-600">
            {filteredSales.filter(sale => sale.status === 'Completed').length}
          </div>
        </div>
      </div>

      {/* Enhanced Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Filters & Search</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Dates</option>
              <option value="day">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Date</option>
            </select>

            {dateFilter === 'custom' && (
              <input
                type="date"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Sales Orders</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Sale
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                  <span className="text-gray-400 ml-1">(Total/Carried/Remained)</span>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{sale.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {sale.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {sale.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">{sale.quantity}</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-green-600">{sale.quantityCarried}</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-blue-600">{sale.quantityRemained}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${sale.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(sale.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(sale)}
                      className="text-green-600 hover:text-green-800 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(sale.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredSales.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No sales found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new sale.</p>
          </div>
        )}
      </div>

      {/* Add the modal component at the end of the return statement */}
      <AddSaleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddSale}
      />

      {/* Add this before the closing div of your return statement */}
      {selectedSale && (
        <EditSaleModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedSale(null);
          }}
          onSave={handleEditSave}
          sale={selectedSale}
        />
      )}
    </div>
  );
}
