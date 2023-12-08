import React, { useState } from 'react'
import axios from 'axios';


function AddMedicineModal({closeModal}) {

  const [formData, setFormData] = useState({
    name: 'Paracetamol',
    type: 'Tablet',
    unitPrice: 23.50,
    quantity: 1,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/addToStock', formData); 
      console.log(response.data);
      closeModal();
    } catch (error) {
      console.error('Error adding medicine:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-md p-4 mx-auto my-6 transition-all transform bg-white rounded-md shadow-lg">
            <div className="flex items-start justify-between mb-4 ">
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
            
            <div>
              <form>
                <div className='grid grid-cols-2'>
                  <div className='mb-4 mr-3'>
                    <label>Name </label><br />
                    <input onChange={handleChange} type='text' name='name' placeholder='Medicine name' className='border-b-2 outline-none'/>
                  </div>
                  <div className='mb-4 mr-3'>
                    <label>Unit Price </label><br />
                    <input onChange={handleChange} type='text' name='unitPrice' placeholder='Medicine price' className='border-b-2 outline-none'/>
                  </div>
                  <div className='mb-4 mr-3'>
                    <label>Quantity </label><br />
                    <input onChange={handleChange} type='number' name='quantity' min={1} placeholder='Medicine quantity' className='border-b-2 outline-none'/>
                  </div>
                  
                </div>
                <button className='bg-black text-white p-2 rounded-lg mt-1' onClick={handleSubmit}>Submit</button>
              </form>
            </div>
          </div>
        </div>
  )
}

export default AddMedicineModal