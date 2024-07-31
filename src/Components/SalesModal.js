import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

function SalesModal({ closeModal, handleSales, currentMedicine }) {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!customerName || !email || !phoneNumber || !quantity) {
      toast.error("All fields are required");
      return;
    }

    if (quantity <= 0 || !Number.isInteger(+quantity)) {
      toast.error("Quantity must be a whole number greater than 0");
      return;
    }

    if (currentMedicine.quantity < quantity){
      toast.error("The quantity your entered is more than the quantity available!")
      return;
    }

    setLoading(true);
    handleSales({ customerName, email, phoneNumber, quantity })
      .finally(() => {
        setLoading(false);
        if (!loading) {
            closeModal();
        }
      });
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
        <h2 className='text-2xl mb-4'>Make a Sale</h2>
        {currentMedicine && <h3 className='text-xl mb-4'>Medicine: {currentMedicine.name}</h3>}
        <div className='mb-4'>
          <label htmlFor='customerName' className='block text-gray-700'>Customer Name</label>
          <input
            type='text'
            id='customerName'
            className='w-full p-2 border rounded'
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700'>Email</label>
          <input
            type='email'
            id='email'
            className='w-full p-2 border rounded'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='phoneNumber' className='block text-gray-700'>Phone Number</label>
          <input
            type='text'
            id='phoneNumber'
            className='w-full p-2 border rounded'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='quantity' className='block text-gray-700'>Quantity</label>
          <input
            type='number'
            id='quantity'
            className='w-full p-2 border rounded'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min='1'
            step='1'
          />
        </div>
        <div className='flex justify-end'>
          <button
            className='bg-red-500 text-white p-2 rounded mr-2'
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className='bg-green-500 text-white p-2 rounded'
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <FaSpinner className='animate-spin' /> : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SalesModal;
