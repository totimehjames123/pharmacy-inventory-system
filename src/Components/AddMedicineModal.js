import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddMedicineModal({ closeModal, fetchData }) {
  const [formData, setFormData] = useState({
    name: '',
    unitPrice: '',
    quantity: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});
    
    // Validate form data
    const newErrors = {};
    if (formData.name.trim() === '') newErrors.name = 'Name is required';
    if (formData.unitPrice.trim() === '' || Number(formData.unitPrice) <= 0) newErrors.unitPrice = 'Unit price must be greater than 0';
    if (formData.quantity.trim() === '' || Number(formData.quantity) <= 0) newErrors.quantity = 'Quantity must be greater than 0';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/addToStock`,
        formData
      );
      if (response.status === 200) {
        toast.success('Medicine added successfully');
        closeModal();
        fetchData()
      }
      
    } catch (error) {
      console.error('Error adding medicine:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error adding medicine');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-full max-w-lg lg:max-w-2xl md:max-w-xl p-6 mx-auto my-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-bold">Add a Drug</h1>
          <button
            className="text-gray-500 cursor-pointer"
            onClick={() => closeModal()}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="text-red-500 mb-4">
          {Object.values(errors).map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Medicine name"
              className="w-full p-2 border rounded"
              value={formData.name}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Unit Price</label>
            <input
              onChange={handleChange}
              type="number"
              name="unitPrice"
              placeholder="Medicine price"
              className="w-full p-2 border rounded"
              min="0"
              value={formData.unitPrice}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              onChange={handleChange}
              type="number"
              name="quantity"
              placeholder="Medicine quantity"
              className="w-full p-2 border rounded"
              min="1"
              value={formData.quantity}
            />
          </div>
          <div className="flex justify-end">
            
            <button
              className="bg-black text-white p-2 rounded-lg mr-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="bg-gray-500 text-white p-2 rounded-lg "
              onClick={() => closeModal()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMedicineModal;
