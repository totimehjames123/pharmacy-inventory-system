import axios from 'axios';
import React, { useEffect, useState } from 'react';

function MakeSalesModal({ closeModal }) {
  const [medicineSales, setMedicineSales] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    const fetchMedicineSales = async () => {
      try {
        const response = await fetch('http://localhost:5000/allStocks');
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
      const response = await axios.post('http://localhost:5000/deleteSales');

      if (response.status === 200){
        console.log(response.data);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
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
            <div className='mb-4 font-bold'>
              Are you sure you want to delete all?
            </div>
            <div className='mb-4'>
              This action will delete all sales records you have. You won&apos;t be able to recover these records after they&apos;re deleted.
            </div>
            <div className='flex justify-between'>
              <button className='bg-red-500 text-white p-2 rounded-lg mt-1' onClick={handleSubmit}>Delete All</button>
              <button className='bg-gray-500 text-white p-2 rounded-lg mt-1' onClick={() => closeModal()}>Quit Operation</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MakeSalesModal;
