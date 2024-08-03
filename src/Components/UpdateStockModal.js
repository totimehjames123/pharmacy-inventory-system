import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

function UpdateStockModal({ isOpen, onClose, currentStock, fetchData }) {
  const router = useRouter();
  const { _id, name, unitPrice, quantity } = currentStock || {};

  // Define state variables to hold updated values
  const [updatedName, setUpdatedName] = useState(name || '');
  const [updatedUnitPrice, setUpdatedUnitPrice] = useState(unitPrice || '');
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity || '');

  useEffect(() => {
    if (currentStock) {
      setUpdatedName(currentStock.name);
      setUpdatedUnitPrice(currentStock.unitPrice);
      setUpdatedQuantity(currentStock.quantity);
    }
  }, [currentStock]);

  // Function to handle the update and send data to the API
  const handleUpdate = async () => {
    if (!updatedName || !updatedUnitPrice || updatedQuantity === '') {
      toast.error('Please fill in all fields');
      return;
    }

    const price = parseFloat(updatedUnitPrice);
    const quantity = parseInt(updatedQuantity, 10);

    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    if (isNaN(quantity) || quantity < 0) {
      toast.error('Please enter a valid quantity');
      return;
    }

    try {
      // Create an object with the updated data
      const updatedData = {
        id: _id,
        name: updatedName,
        unitPrice: price,
        quantity: quantity,
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/updateStock/`, updatedData);

      if (response.status === 200) {
        toast.success('Update successful');
        fetchData();
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle errors
      console.error('Error updating data', error);
      toast.error('Error updating data');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
        <h4 className="font-bold text-2xl">Update a Record</h4>
        <div className="my-5 text-gray-700 ">You are about to update <b>{name}</b></div>

        <div className="mt-3">
          <label className="block text-gray-700">Medicine Name</label>
          <input 
            type="text" 
            value={updatedName} 
            placeholder="New Medicine Name" 
            onChange={(e) => setUpdatedName(e.target.value)} 
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mt-3">
          <label className="block text-gray-700">Current Price</label>
          <input 
            type="number" 
            step="0.01" 
            value={updatedUnitPrice} 
            placeholder="New Price" 
            onChange={(e) => setUpdatedUnitPrice(e.target.value)} 
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mt-3">
          <label className="block text-gray-700">Current Quantity</label>
          <input 
            type="number" 
            value={updatedQuantity} 
            placeholder="New quantity" 
            onChange={(e) => setUpdatedQuantity(e.target.value)} 
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mt-4 flex justify-end gap-x-2">
          <button onClick={handleUpdate} className="bg-black rounded-lg text-white p-2">Update</button>
          <button onClick={onClose} className="bg-gray-600 rounded-lg text-white p-2">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateStockModal;
