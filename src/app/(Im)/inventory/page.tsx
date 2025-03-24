'use client';

import { useState } from 'react';

// Add DateFilterType
type DateFilterType = 'all' | 'day' | 'week' | 'month' | 'custom';

// Update the InventoryItem interface to restrict category types
interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  Stocks: 'Kicukiro' | 'Kamonyi' | 'Rwamagana';  // Update this line
  createdAt: string; // Add this field
  CurrentStock:number; // Add this field
}

// Add this interface after the InventoryItem interface
interface AddInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<InventoryItem, 'id'>) => void;
}

// Add this component before the main InventoryPage component
const AddInventoryModal = ({ isOpen, onClose, onAdd }: AddInventoryModalProps) => {
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 0,
    Stocks: 'Rwamagana' as InventoryItem['Stocks'],  // Update this line
    CurrentStock: 0,
    createdAt: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newItem);
    onClose();
    // Reset form
    setNewItem({
      name: '',
      quantity: 0,
      Stocks: 'Kicukiro' as InventoryItem['Stocks'],  // Update this line
      CurrentStock: 0,
      createdAt: new Date().toISOString().split('T')[0]
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[550px] max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Enhanced Header */}
        <div className="bg-green-500  px-3 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl px-40 font-bold text-white">Add New Item</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              placeholder="Enter item name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
            />
          </div>

          {/* stock and Current stock row */}
          <div className="grid grid-cols-2 gap-4">
          <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current stock</label>
              <input
                type="number"
                placeholder="....."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={newItem.CurrentStock}
                onChange={(e) => setNewItem({ ...newItem, CurrentStock: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <div className="relative">
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg appearance-none bg-gray-50 hover:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  value={newItem.Stocks}
                  onChange={(e) => setNewItem({ ...newItem, Stocks: e.target.value as InventoryItem['Stocks'] })}
                  required
                >
                  <option value="Raw Material">Kicukiro</option>
                  <option value="Semi-Final">Kamonyi</option>
                  <option value="Final Product">Rwamagana</option>
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>
        
          </div>

          {/* Quantity with icon */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </span>
              <input
                type="number"
                placeholder="Enter quantity"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                required
              />
            </div>
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
              className="px-6 py-2.5 bg-green-500 text-white b hover:bg-green-600 transition-all duration-200 font-medium shadow-lg shadow-green-500/30 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add this new component after the AddInventoryModal component
const EditInventoryModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  item 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (item: InventoryItem) => void; 
  item: InventoryItem; 
}) => {
  const [editedItem, setEditedItem] = useState(item);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedItem);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[550px] max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="bg-green-500 px-3 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl px-40 font-bold text-white">Edit Item</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
              value={editedItem.name}
              onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Stock</label>
              <input
                type="number"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={editedItem.CurrentStock}
                onChange={(e) => setEditedItem({ ...editedItem, CurrentStock: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Location</label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
                value={editedItem.Stocks}
                onChange={(e) => setEditedItem({ ...editedItem, Stocks: e.target.value as InventoryItem['Stocks'] })}
                required
              >
                <option value="Kicukiro">Kicukiro</option>
                <option value="Kamonyi">Kamonyi</option>
                <option value="Rwamagana">Rwamagana</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 hover:bg-white"
              value={editedItem.quantity}
              onChange={(e) => setEditedItem({ ...editedItem, quantity: Number(e.target.value) })}
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
              className="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 font-medium shadow-lg shadow-green-500/30"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { 
      id: 1, 
      name: 'Ordinaire', 
      quantity: 100, 
      Stocks: 'Kicukiro', 
      CurrentStock: 80,
      createdAt: '2025-03-22'
    },
    { 
      id: 2, 
      name: 'Bran', 
      quantity: 50, 
      Stocks: 'Kamonyi', 
      CurrentStock: 1500,
      createdAt: '2025-03-21'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all');
  const [customDate, setCustomDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stockFilter, setStockFilter] = useState<'all' | InventoryItem['Stocks']>('all');

  // Add these new states after existing useState declarations
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  // Add date filtering function
  const getFilteredByDate = (items: InventoryItem[]) => {
    const today = new Date();
    const itemDate = (date: string) => new Date(date);

    switch (dateFilter) {
      case 'day':
        return items.filter(item => 
          itemDate(item.createdAt).toDateString() === today.toDateString()
        );
      case 'week':
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return items.filter(item => {
          const date = itemDate(item.createdAt);
          return date >= lastWeek && date <= today;
        });
      case 'month':
        return items.filter(item => {
          const date = itemDate(item.createdAt);
          return date.getMonth() === today.getMonth() && 
                 date.getFullYear() === today.getFullYear();
        });
      case 'custom':
        return items.filter(item => item.createdAt === customDate);
      default:
        return items;
    }
  };

  const handleAddItem = (newItem: Omit<InventoryItem, 'id'>) => {
    setInventory([
      ...inventory,
      {
        ...newItem,
        id: inventory.length + 1,
      }
    ]);
  };

  // Add these new handlers before the return statement
  const handleEditClick = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  const handleEditSave = (updatedItem: InventoryItem) => {
    setInventory(inventory.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  // Update filteredItems to use date filter
  const filteredItems = getFilteredByDate(
    inventory.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (stockFilter === 'all' || item.Stocks === stockFilter)
    )
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Factory Inventory Management</h1>
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Item
        </button>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search items..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          {/* Add this new stock filter select */}
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as 'all' | InventoryItem['Stocks'])}
          >
            <option value="all">All Stocks</option>
            <option value="Kicukiro">Kicukiro</option>
            <option value="Kamonyi">Kamonyi</option>
            <option value="Rwamagana">Rwamagana</option>
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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.CurrentStock}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Stocks}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => handleEditClick(item)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddInventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddItem}
      />

      {selectedItem && (
        <EditInventoryModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedItem(null);
          }}
          onSave={handleEditSave}
          item={selectedItem}
        />
      )}
    </div>
  );
}
