import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios'; // Make sure to install axios

function SalesModal({ closeModal, handleSales, currentMedicine }) {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [customerHints, setCustomerHints] = useState([]);
  const [hintLoading, setHintLoading] = useState(false);

  const handleSubmit = () => {
    if (!customerName || !email || !phoneNumber || !quantity) {
      toast.error("All fields are required");
      return;
    }

    if (quantity <= 0 || !Number.isInteger(+quantity)) {
      toast.error("Quantity must be a whole number greater than 0");
      return;
    }

    if (currentMedicine.quantity < quantity) {
      toast.error("The quantity entered is more than the quantity available!");
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

  const fetchCustomerHints = async (query) => {
    if (query.length === 0) {
      setCustomerHints([]);
      return;
    }

    setHintLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-customers`, {
        params: { query },
      });
      setCustomerHints(response.data);
    } catch (error) {
      toast.error("Failed to fetch customer names");
    } finally {
      setHintLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerHints(customerName);
  }, [customerName]);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative'>
        <h2 className='text-2xl mb-4'>Make a Sale</h2>
        {currentMedicine && <h3 className='text-xl mb-4'>Medicine: {currentMedicine.name}</h3>}
        <div className='mb-4 relative'>
          <label htmlFor='customerName' className='block text-gray-700'>Customer Name</label>
          <input
            type='text'
            id='customerName'
            className='w-full p-2 border rounded'
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          {hintLoading && <div className='mt-2'>Loading...</div>}
          {customerHints.length > 0 && (
            <ul className='absolute top-full left-0 w-full mt-1 border border-gray-300 bg-white rounded shadow-lg z-10'>
              {customerHints.map((name, index) => (
                <li
                  key={index}
                  className='p-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => setCustomerName(name)}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
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
            className='bg-black text-white p-2 rounded  mr-2'
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <FaSpinner className='animate-spin' /> : 'Submit'}
          </button>
          <button
            className='bg-gray-500 text-white p-2 rounded'
            onClick={closeModal}
          >
            Cancel
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default SalesModal;
