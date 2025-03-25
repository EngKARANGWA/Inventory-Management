'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Stock Keeper' | 'Cashier' | 'Client' | 'Supplier' | 'Production';
  department: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
  phone: string;
}

interface UserFormData {
  // Step 1: Personal Details
  name: string;
  email: string;
  phone: string;
  address: string;
  
  // Step 2: Role Assignment
  role: 'Admin' | 'Stock Keeper' | 'Cashier' | 'Production';
  
  // Step 3: Password (optional if using email setup)
  password?: string;
  sendSetupEmail: boolean;
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (userData: UserFormData) => void;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user: User;
}

const AddUserModal = ({ isOpen, onClose, onAdd }: AddUserModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'Stock Keeper',
    sendSetupEmail: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className={`flex items-center ${num < step ? 'text-blue-500' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  num <= step ? 'border-blue-500 text-blue-500' : 'border-gray-300'
                }`}>
                  {num}
                </div>
                {num < 4 && <div className={`flex-1 h-1 mx-2 ${num < step ? 'bg-blue-500' : 'bg-gray-300'}`} />}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <textarea
                placeholder="Address"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>
          )}

          {/* Step 2: Role Assignment */}
          {step === 2 && (
            <div className="space-y-4">
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserFormData['role'] })}
              >
                <option value="Stock Keeper">Stock Keeper</option>
                <option value="Cashier">Cashier</option>
                <option value="Production">Production</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          )}

          {/* Step 3: Password Setup */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="setupEmail"
                  checked={formData.sendSetupEmail}
                  onChange={(e) => setFormData({ ...formData, sendSetupEmail: e.target.checked })}
                />
                <label htmlFor="setupEmail">Send setup email to user</label>
              </div>
              {!formData.sendSetupEmail && (
                <input
                  type="password"
                  placeholder="Set Initial Password"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.password || ''}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              )}
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Review User Details</h3>
                <p><span className="font-semibold">Name:</span> {formData.name}</p>
                <p><span className="font-semibold">Email:</span> {formData.email}</p>
                <p><span className="font-semibold">Phone:</span> {formData.phone}</p>
                <p><span className="font-semibold">Role:</span> {formData.role}</p>
                <p><span className="font-semibold">Setup Method:</span> {formData.sendSetupEmail ? 'Email Setup Link' : 'Manual Password'}</p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Previous
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Create User
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, onSave, user }) => {
  // Initialize with the user prop or a default empty user object
  const [editedUser, setEditedUser] = useState<User>({
    id: user?.id || 0,
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'Employee',
    department: user?.department || '',
    status: user?.status || 'Active',
    joinDate: user?.joinDate || new Date().toISOString().split('T')[0],
    phone: user?.phone || ''
  });

  // Update editedUser when user prop changes
  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedUser);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Edit User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg"
            value={editedUser.name}
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
            value={editedUser.email}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            required
          />
          <select
            className="w-full px-4 py-2 border rounded-lg"
            value={editedUser.role}
            onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value as User['role'] })}
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
            <option value="Stock Keeper">Stock Keeper</option>
            <option value="Cashier">Cashier</option>
            <option value="Production">Production</option>
          </select>
          <input
            type="text"
            placeholder="Department"
            className="w-full px-4 py-2 border rounded-lg"
            value={editedUser.department}
            onChange={(e) => setEditedUser({ ...editedUser, department: e.target.value })}
            required
          />
          <select
            className="w-full px-4 py-2 border rounded-lg"
            value={editedUser.status}
            onChange={(e) => setEditedUser({ ...editedUser, status: e.target.value as User['status'] })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Update the getRoleColor function
const getRoleColor = (role: User['role']) => {
  switch (role) {
    case 'Admin':
      return 'bg-purple-100 text-purple-800';
    case 'Stock Keeper':
      return 'bg-blue-100 text-blue-800';
    case 'Cashier':
      return 'bg-green-100 text-green-800';
    case 'Client':
      return 'bg-yellow-100 text-yellow-800';
    case 'Supplier':
      return 'bg-orange-100 text-orange-800';
    case 'Production':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Update the UserPage component with enhanced UI
export default function UserPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      department: 'Management',
      status: 'Active',
      joinDate: '2025-01-01',
      phone: '123-456-7890'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Cashier',
      department: 'Production',
      status: 'Active',
      joinDate: '2025-02-15',
      phone: '098-765-4321'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getStatusColor = (status: User['status']) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const filteredUsers = users.filter(user =>
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (roleFilter === 'all' || user.role === roleFilter) &&
    (statusFilter === 'all' || user.status === statusFilter)
  );

  const handleAddUser = (userData: UserFormData) => {
    const newUser: User = {
      id: users.length + 1,
      name: userData.name,
      email: userData.email,
      role: userData.role as 'Admin' | 'Stock Keeper' | 'Cashier' | 'Production', // Restrict roles to the specified ones
      department: 'Default', // You might want to add department selection in the form
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      phone: userData.phone
    };
    setUsers([...users, newUser]);
  };

  const handleDeactivateUser = (user: User) => {
    setSelectedUser(user);
    setIsConfirmDialogOpen(true);
  };

  const confirmDeactivation = () => {
    if (selectedUser) {
      setUsers(users.map(u => 
        u.id === selectedUser.id ? { ...u, status: 'Inactive' } : u
      ));
    }
    setIsConfirmDialogOpen(false);
    setSelectedUser(null);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Enhanced Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
        <p className="text-gray-600">Manage system users and their roles</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {['Admin', 'Stock Keeper', 'Cashier', 'Client', 'Supplier', 'Production'].map((role) => (
          <div key={role} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">{role}s</div>
            <div className="text-2xl font-bold text-gray-800">
              {users.filter(user => user.role === role).length}
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Filters & Search</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Stock Keeper">Stock Keeper</option>
              <option value="Cashier">Cashier</option>
              <option value="Client">Client</option>
              <option value="Supplier">Supplier</option>
              <option value="Production">Production</option>
            </select>

            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enhanced Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">User List</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button 
                      onClick={() => handleEditUser(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeactivateUser(user)}
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
      </div>

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddUser}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveUser}
        user={selectedUser!}
      />

      {/* Confirmation Dialog */}
      {isConfirmDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h3 className="text-lg font-bold mb-4">Confirm Deactivation</h3>
            <p>Are you sure you want to deactivate this user?</p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsConfirmDialogOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeactivation}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
