"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (paymentDetails: { paymentMethod: string; amountPaid: number; paymentDate: string; paymentReference: string }) => void;
  orderDetails: {
    purchaseNumber: string;
    supplierName: string;
    items: { productId: string; quantity: number; price: number }[];
  } | null;
  products: { id: string; name: string }[]; // Add products prop
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSubmit, orderDetails, products }) => {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'bank transfer'>('cash');
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [paymentReference, setPaymentReference] = useState<string>('');
  const [paymentDate, setPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]); // Default to today

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ paymentMethod, amountPaid, paymentDate, paymentReference });
    onClose(); // Close the modal after submission
  };

  // Calculate total quantity of items ordered
  const totalQuantity = orderDetails && Array.isArray(orderDetails.items) 
    ? orderDetails.items.reduce((total, item) => total + item.quantity, 0) 
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Payment Details</DialogTitle>
        </DialogHeader>
        {orderDetails && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Order Details</h2>
            <p><strong>Purchase Number:</strong> {orderDetails.purchaseNumber}</p>
            <p><strong>Supplier:</strong> {orderDetails.supplierName}</p>
            <p><strong>Total Items Ordered:</strong> {totalQuantity}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</Label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'card' | 'bank transfer')}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              required
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="bank transfer">Bank Transfer</option>
            </select>
          </div>
          <div>
            <Label htmlFor="amountPaid" className="block text-sm font-medium text-gray-700">Amount Paid</Label>
            <Input
              id="amountPaid"
              type="number"
              value={amountPaid}
              onChange={(e) => setAmountPaid(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              required
            />
          </div>
          <div>
            <Label htmlFor="paymentReference" className="block text-sm font-medium text-gray-700">Payment Reference</Label>
            <Input
              id="paymentReference"
              type="text"
              value={paymentReference}
              onChange={(e) => setPaymentReference(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            />
          </div>
          <div>
            <Label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700">Payment Date</Label>
            <Input
              id="paymentDate"
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-30 bg-green-500 hover:bg-green-600 text-white transition duration-200 py-2 rounded-md">Submit Payment</Button>
            <Button type="button" onClick={onClose} className="w-30 bg-gray-300 hover:bg-gray-400 text-black transition duration-200 py-2 rounded-md">Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
