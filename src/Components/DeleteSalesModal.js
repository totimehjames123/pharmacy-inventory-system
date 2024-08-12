import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function DeleteSalesModal({ closeModal }) {
  const [medicineSales, setMedicineSales] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    const fetchMedicineSales = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allStocks`);
        if (!response.ok) {
          throw new Error('Failed to fetch medicine sales');
        }
        const data = await response.json();
        setMedicineSales(data.stocks);
      } catch (error) {
        console.error('Error fetching medicine sales:', error.message);
      }
    };

    fetchMedicineSales();
  }, []);

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/deleteSales`);

      if (response.status === 200){
        toast.success(response.data);
        closeModal();
        window.location.reload()
      }
      else {
        alert("Failed to delete")
      }
      
    } catch (error) {
      console.error('Error deleting sales:', error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-md p-4 mx-auto my-6 transition-all transform bg-white rounded-md shadow-lg">
      <div className="flex items-start justify-between mb-4 ">
              <h1 className="text-2xl font-bold">Delete all records</h1>
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
            <div className='mb-2 font-bold text-md text-gray-700'>
              Are you sure you want to delete all?
            </div>
            <div className='mb-4 text-sm'>
              This action will delete all sales records you have. You won&apos;t be able to recover these records after they&apos;re deleted. Click the &apos;Delete all button to proceed.&apos;
            </div>
            <div className='flex justify-end gap-2 mt-2'>
              <button className='bg-red-500 text-white text-sm p-2 rounded-lg' onClick={handleSubmit}>Delete All</button>
              <button className='bg-gray-500 text-white text-sm  p-2 rounded-lg' onClick={() => closeModal()}>Quit Operation</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteSalesModal;
