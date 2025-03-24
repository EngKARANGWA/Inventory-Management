'use client';

import { useState } from 'react';

interface Payment {
  id: number;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  paymentMethod: 'Cash' | 'Bank Transfer' | 'Check' | 'Credit Card';
  status: 'Pending' | 'Completed' | 'Failed';
  date: string;
  dueDate: string;
}

type DateFilterType = 'all' | 'today' | 'week' | 'month' | 'custom';

export default function PaymentPage() {
  const [payments] = useState<Payment[]>([
    {
      id: 1,
      invoiceNumber: 'INV-001',
      clientName: 'ABC Company',
      amount: 15000.0,
      paymentMethod: 'Bank Transfer',
      status: 'Completed',
      date: '2025-03-22',
      dueDate: '2025-04-22'
    },
    {
      id: 2,
      invoiceNumber: 'INV-002',
      clientName: 'XYZ Industries',
      amount: 8500.0,
      paymentMethod: 'Check',
      status: 'Pending',
      date: '2025-03-22',
      dueDate: '2025-04-22'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all');
  const [customDate, setCustomDate] = useState('');

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const getFilteredByDate = (payments: Payment[]) => {
    const today = new Date();
    const paymentDate = (date: string) => new Date(date);

    switch (dateFilter) {
      case 'today':
        return payments.filter(payment =>
          paymentDate(payment.date).toDateString() === today.toDateString()
        );
      case 'week':
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return payments.filter(payment => {
          const date = paymentDate(payment.date);
          return date >= lastWeek && date <= today;
        });
      case 'month':
        return payments.filter(payment => {
          const date = paymentDate(payment.date);
          return date.getMonth() === today.getMonth() &&
                 date.getFullYear() === today.getFullYear();
        });
      case 'custom':
        return payments.filter(payment => payment.date === customDate);
      default:
        return payments;
    }
  };

  const filteredPayments = getFilteredByDate(
    payments.filter(payment =>
      (payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
       payment.clientName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || payment.status === statusFilter)
    )
  );

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
    }
  };

  const getPaymentMethodIcon = (method: Payment['paymentMethod']) => {
    switch (method) {
      case 'Cash':
        return '💵';
      case 'Bank Transfer':
        return '🏦';
      case 'Check':
        return '📝';
      case 'Credit Card':
        return '💳';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment Management</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Record New Payment
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by invoice number or client..."
          className="w-full max-w-sm px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={handleStatusFilterChange}
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>

        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value as DateFilterType)}
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="custom">Custom Date</option>
        </select>

        {dateFilter === 'custom' && (
          <input
            type="date"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={customDate}
            onChange={(e) => setCustomDate(e.target.value)}
          />
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{payment.invoiceNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{payment.clientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">${payment.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  {getPaymentMethodIcon(payment.paymentMethod)} {payment.paymentMethod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{payment.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{payment.dueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
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
  );
}
