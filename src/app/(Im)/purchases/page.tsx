'use client';

import { useState, useEffect } from 'react';

interface Purchase {
  id: number;
  purchaseNumber: string;
  supplierName: string;
  items: string;
  quantity: number;
  quantityDelivered: number;
  quantityRemaining: number;
  pricePerUnit: number;
  totalAmount: number;
  amountPaid: number;
  amountRemaining: number;
  status: 'Pending' | 'Received' | 'Cancelled';
  orderDate: string;
  deliveryDate: string | null;
}

type DateFilterType = 'all' | 'day' | 'week' | 'month' | 'custom';

// Add Purchase Modal Component
const AddPurchaseModal = ({ 
  isOpen, 
  onClose, 
  onAdd 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onAdd: (purchase: Omit<Purchase, 'id'>) => void; 
}) => {
  const [newPurchase, setNewPurchase] = useState({
    purchaseNumber: '',
    supplierName: '',
    items: '',
    quantity: 0,
    quantityDelivered: 0,
    quantityRemaining: 0,
    pricePerUnit: 0,
    totalAmount: 0,
    amountPaid: 0,
    amountRemaining: 0,
    status: 'Pending' as Purchase['status'],
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate:''
  });

  const calculateTotalAmount = (quantity: number, pricePerUnit: number) => {
    return quantity * pricePerUnit;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newPurchase);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">New Purchase Order</h2>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">PO Number</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={newPurchase.purchaseNumber}
                onChange={(e) => setNewPurchase({ ...newPurchase, purchaseNumber: e.target.value })}
                required
                placeholder="e.g., PO-003"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Supplier Name</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={newPurchase.supplierName}
                onChange={(e) => setNewPurchase({ ...newPurchase, supplierName: e.target.value })}
                required
                placeholder="Enter supplier name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Items</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
              value={newPurchase.items}
              onChange={(e) => setNewPurchase({ ...newPurchase, items: e.target.value })}
              required
              placeholder="Enter items"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={newPurchase.quantity || ''}
                onChange={(e) => {
                  const quantity = Number(e.target.value);
                  setNewPurchase({
                    ...newPurchase,
                    quantity,
                    totalAmount: calculateTotalAmount(quantity, newPurchase.pricePerUnit)
                  });
                }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price per Unit</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">frw</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                  value={newPurchase.pricePerUnit || ''}
                  onChange={(e) => {
                    const pricePerUnit = Number(e.target.value);
                    setNewPurchase({
                      ...newPurchase,
                      pricePerUnit,
                      totalAmount: calculateTotalAmount(newPurchase.quantity, pricePerUnit)
                    });
                  }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Total Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">frw</span>
                <input
                  type="number"
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100"
                  value={newPurchase.totalAmount}
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={newPurchase.status}
                onChange={(e) => setNewPurchase({ ...newPurchase, status: e.target.value as Purchase['status'] })}
              >
                <option value="Pending">Pending</option>
                <option value="Received">Received</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Order Date</label>
              <input
                type="date"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={newPurchase.orderDate}
                onChange={(e) => setNewPurchase({ ...newPurchase, orderDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Delivery Date</label>
              <input
                type="date"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={newPurchase.deliveryDate || ''}
                onChange={(e) => setNewPurchase({ ...newPurchase, deliveryDate: e.target.value ? e.target.value : '' })}
              />
            </div>
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
              Create Purchase Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add the EditPurchaseModal component before your main PurchasePage component
const EditPurchaseModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  purchase 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (purchase: Purchase) => void; 
  purchase: Purchase; 
}) => {
  const [editedPurchase, setEditedPurchase] = useState(purchase);

  useEffect(() => {
    setEditedPurchase(purchase);
  }, [purchase]);

  const calculateTotalAmount = (quantity: number, pricePerUnit: number) => {
    return quantity * pricePerUnit;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedPurchase);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Edit Purchase Order</h2>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">PO Number</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={editedPurchase.purchaseNumber}
                onChange={(e) => setEditedPurchase({ ...editedPurchase, purchaseNumber: e.target.value })}
                required
                placeholder="e.g., PO-003"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Supplier Name</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={editedPurchase.supplierName}
                onChange={(e) => setEditedPurchase({ ...editedPurchase, supplierName: e.target.value })}
                required
                placeholder="Enter supplier name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Items</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
              value={editedPurchase.items}
              onChange={(e) => setEditedPurchase({ ...editedPurchase, items: e.target.value })}
              required
              placeholder="Enter items"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={editedPurchase.quantity || ''}
                onChange={(e) => {
                  const quantity = Number(e.target.value);
                  setEditedPurchase({
                    ...editedPurchase,
                    quantity,
                    totalAmount: calculateTotalAmount(quantity, editedPurchase.pricePerUnit)
                  });
                }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price per Unit</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">frw</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                  value={editedPurchase.pricePerUnit || ''}
                  onChange={(e) => {
                    const pricePerUnit = Number(e.target.value);
                    setEditedPurchase({
                      ...editedPurchase,
                      pricePerUnit,
                      totalAmount: calculateTotalAmount(editedPurchase.quantity, pricePerUnit)
                    });
                  }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Total Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">frw</span>
                <input
                  type="number"
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100"
                  value={editedPurchase.totalAmount}
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={editedPurchase.status}
                onChange={(e) => setEditedPurchase({ ...editedPurchase, status: e.target.value as Purchase['status'] })}
              >
                <option value="Pending">Pending</option>
                <option value="Received">Received</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Order Date</label>
              <input
                type="date"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={editedPurchase.orderDate}
                onChange={(e) => setEditedPurchase({ ...editedPurchase, orderDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Delivery Date</label>
              <input
                type="date"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={editedPurchase.deliveryDate || ''}
                onChange={(e) => setEditedPurchase({ ...editedPurchase, deliveryDate: e.target.value ? e.target.value : '' })}
              />
            </div>
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

export default function PurchasePage() {
  const [purchases, setPurchases] = useState<Purchase[]>([
    {
      id: 1,
      purchaseNumber: 'PO-001',
      supplierName: 'Supplier Corp',
      items: 'Raw Material A',
      quantity: 1000,
      quantityDelivered: 600,
      quantityRemaining: 400,
      pricePerUnit: 5.00,
      totalAmount: 5000.00,
      amountPaid: 3000.00,
      amountRemaining: 2000.00,
      status: 'Pending',
      orderDate: '2025-03-20',
      deliveryDate: '2025-03-22'
    },
    {
      id: 2,
      purchaseNumber: 'PO-002',
      supplierName: 'Global Materials Ltd',
      items: 'Raw Material B',
      quantity: 500,
      quantityDelivered: 0,
      quantityRemaining: 500,
      pricePerUnit: 5.00,
      totalAmount: 2500.00,
      amountPaid: 0.00,
      amountRemaining: 2500.00,
      status: 'Pending',
      orderDate: '2025-03-22',
      deliveryDate: null
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all');
  const [customDate, setCustomDate] = useState('');

  // Add these state declarations after your existing useState declarations
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);

  // Add these handler functions before the return statement
  const handleEditClick = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (confirm('Are you sure you want to delete this purchase order?')) {
      setPurchases(purchases.filter(purchase => purchase.id !== id));
    }
  };

  const handleEditSave = (updatedPurchase: Purchase) => {
    setPurchases(purchases.map(purchase => 
      purchase.id === updatedPurchase.id ? updatedPurchase : purchase
    ));
    setIsEditModalOpen(false);
    setSelectedPurchase(null);
  };

  const handleAddPurchase = (purchaseData: Omit<Purchase, 'id'>) => {
    const newPurchase: Purchase = {
      ...purchaseData,
      id: purchases.length + 1
    };
    setPurchases([...purchases, newPurchase]);
  };

  const getFilteredByDate = (purchases: Purchase[]) => {
    const today = new Date();
    const purchaseDate = (date: string) => new Date(date);

    switch (dateFilter) {
      case 'day':
        return purchases.filter(purchase => 
          purchaseDate(purchase.orderDate).toDateString() === today.toDateString()
        );
      case 'week':
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return purchases.filter(purchase => {
          const date = purchaseDate(purchase.orderDate);
          return date >= lastWeek && date <= today;
        });
      case 'month':
        return purchases.filter(purchase => {
          const date = purchaseDate(purchase.orderDate);
          return date.getMonth() === today.getMonth() && 
                 date.getFullYear() === today.getFullYear();
        });
      case 'custom':
        return purchases.filter(purchase => purchase.orderDate === customDate);
      default:
        return purchases;
    }
  };

  const filteredPurchases = getFilteredByDate(
    purchases.filter(purchase =>
      (purchase.purchaseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
       purchase.supplierName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || purchase.status === statusFilter)
    )
  );

  const getStatusColor = (status: Purchase['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Received':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Enhanced Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Purchase Orders</h1>
        <p className="text-gray-600">Manage and track all purchase transactions</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Total Orders Value</div>
          <div className="text-2xl font-bold text-gray-800">
            frw {purchases.reduce((acc, p) => acc + p.totalAmount, 0).toFixed(2)}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Amount Paid</div>
          <div className="text-2xl font-bold text-green-600">
            frw {purchases.reduce((acc, p) => acc + p.amountPaid, 0).toFixed(2)}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Amount Due</div>
          <div className="text-2xl font-bold text-red-600">
            frw {purchases.reduce((acc, p) => acc + p.amountRemaining, 0).toFixed(2)}
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Pending Orders</div>
          <div className="text-2xl font-bold text-yellow-600">
            {purchases.filter(p => p.status === 'Pending').length}
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by PO number or supplier..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Received">Received</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as DateFilterType)}
          >
            <option value="all">All Time</option>
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Date</option>
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

      {/* Enhanced Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PO #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                  <span className="block text-gray-400 font-normal">(Total/Delivered/Remaining)</span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                  <span className="block text-gray-400 font-normal">(Total/Paid/Remaining)</span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPurchases.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    #{purchase.purchaseNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {purchase.supplierName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {purchase.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900">{purchase.quantity}</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-green-600">{purchase.quantityDelivered}</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-blue-600">{purchase.quantityRemaining}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    frw {purchase.pricePerUnit.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <div className="text-gray-900">frw {purchase.totalAmount.toFixed(2)}</div>
                      <div className="text-green-600">frw {purchase.amountPaid.toFixed(2)}</div>
                      <div className="text-red-600">frw {purchase.amountRemaining.toFixed(2)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(purchase.status)}`}>
                      {purchase.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditClick(purchase)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(purchase.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddPurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddPurchase}
      />

      {selectedPurchase && (
        <EditPurchaseModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedPurchase(null);
          }}
          onSave={handleEditSave}
          purchase={selectedPurchase}
        />
      )}
    </div>
  );
}
