'use client';

import { useState, useEffect } from 'react';
import AddSaleModal from '../components/AddSaleModal'; // Adjust the path as necessary

// Define product name type
type ProductName = 'Super' | 'Ordinaire' | 'Bran';

// Add DateFilterType
type DateFilterType = 'all' | 'day' | 'week' | 'month' | 'custom';

// Update the Sale interface to make status readonly
interface Sale {
  id: number;
  orderNumber: string;
  product: ProductName;
  quantity: number;
  quantityCarried: number;
  quantityRemained: number;
  pricePerUnit: number;
  status: 'Pending' | 'Completed'; // Remove 'Cancelled' as it will be determined by quantities
  date: string;
}

// Add a helper function to calculate status
const calculateStatus = (quantityRemained: number): Sale['status'] => {
  return quantityRemained === 0 ? 'Completed' : 'Pending';
};

// Add this component before the main SalesPage component
const AddEditSaleModal = ({
  isOpen,
  onClose,
  onSave,
  sale,
  mode
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sale: Omit<Sale, 'id'>) => void;
  sale?: Sale;
  mode: 'add' | 'edit';
}) => {
  const [formData, setFormData] = useState<Omit<Sale, 'id' | 'status'>>({
    orderNumber: sale?.orderNumber || '',
    product: sale?.product || 'Super',
    quantity: sale?.quantity || 0,
    quantityCarried: sale?.quantityCarried || 0,
    quantityRemained: sale?.quantityRemained || 0,
    pricePerUnit: sale?.pricePerUnit || 0,
    date: sale?.date || new Date().toISOString().split('T')[0]
  });

  // Update quantity handling
  const handleQuantityChange = (
    field: 'quantity' | 'quantityCarried',
    value: number
  ) => {
    const updates: Partial<typeof formData> = {
      [field]: value
    };

    if (field === 'quantity') {
      updates.quantityRemained = value - (formData.quantityCarried || 0);
    } else if (field === 'quantityCarried') {
      updates.quantityRemained = formData.quantity - value;
    }

    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate status based on quantities
    const status = calculateStatus(formData.quantityRemained);
    
    // For edit mode, include the existing ID
    if (mode === 'edit' && sale) {
      onSave({
        ...formData,
        status
      });
    } else {
      // For add mode
      onSave({
        ...formData,
        status
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[550px] max-h-[85vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {mode === 'add' ? 'Add New Sale' : 'Edit Sale'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.orderNumber}
              onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
            <select
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value as ProductName })}
              required
            >
              <option value="Super">Super</option>
              <option value="Ordinaire">Ordinaire</option>
              <option value="Bran">Bran</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.quantity}
              onChange={(e) => handleQuantityChange('quantity', Number(e.target.value))}
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Carried</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.quantityCarried}
              onChange={(e) => handleQuantityChange('quantityCarried', Number(e.target.value))}
              required
              min="0"
              max={formData.quantity}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Remained</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.quantityRemained}
              readOnly
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Unit</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.pricePerUnit}
              onChange={(e) => setFormData({ ...formData, pricePerUnit: Number(e.target.value) })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

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
      product: 'Super',
      quantity: 50,
      quantityCarried: 30,
      quantityRemained: 20,
      pricePerUnit: 299.99,
      status: 'Completed',
      date: '2025-03-22'
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      product: 'Bran',
      quantity: 25,
      quantityCarried: 0,
      quantityRemained: 25,
      pricePerUnit: 149.99,
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

  const handleAddSale = (saleData: Omit<Sale, 'id'>) => {
    const newSale: Sale = {
      ...saleData,
      id: sales.length + 1
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
        sale.product.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || sale.status === statusFilter)
    )
  );

  // Update the status color function
  const getStatusColor = (status: Sale['status']) => {
    return status === 'Completed' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
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

  const handleEditSave = (updatedSaleData: Omit<Sale, 'id'>) => {
    if (!selectedSale) return;
    
    const updatedSale: Sale = {
      ...updatedSaleData,
      id: selectedSale.id,
      // Status is calculated based on quantities
      status: calculateStatus(updatedSaleData.quantityRemained)
    };
  
    setSales(sales.map(sale => 
      sale.id === selectedSale.id ? updatedSale : sale
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

      {/* Enhanced Filter Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-4">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search by order number or product..."
              className="flex-1 min-w-[200px] px-4 py-2.5 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="w-full md:w-auto px-4 py-2.5 border border-gray-300 rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              className="w-full md:w-auto px-4 py-2.5 border border-gray-300 rounded-lg"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as DateFilterType)}
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
                className="w-full md:w-auto px-4 py-2.5 border border-gray-300 rounded-lg"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Table Section */}
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
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                  <span className="text-gray-400 ml-1">(Total/Carried/Remained)</span>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Unit</th>
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
                    frw {sale.pricePerUnit.toFixed(2)}
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

      {/* Modals */}
      <AddEditSaleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddSale}
        mode="add"
      />

      {selectedSale && (
        <AddEditSaleModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedSale(null);
          }}
          onSave={handleEditSave}
          sale={selectedSale}
          mode="edit"
        />
      )}
    </div>
  );
}
