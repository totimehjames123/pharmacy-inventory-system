import React, { useEffect, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Modal from './MakeSalesModal';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

function SalesListTable({ isLightMode }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = () => {
    if (window.sessionStorage.getItem("role") === "admin") {
      setModalOpen(true);
    } else {
      alert("Only admin can perform this action.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const deleteSaleRecord = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/deleteSaleRecord`, { id });
        if (response.status === 200) {
          fetchData(); // Refresh the data instead of reloading the page
        } else {
          alert("Failed to delete record.");
        }
      } catch (error) {
        alert("An error occurred while deleting the record.");
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allSales`);
      if (response.status === 200) {
        const data = await response.json();
        setStockData(data.sales);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const filteredStockData = stockData?.filter((item) =>
    item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={`flex items-center justify-center ${!isLightMode && 'bg-gray-900'}`}>
        {isModalOpen && (
          <Modal closeModal={closeModal} />
        )}
      </div>
      <div className={`lg:flex md:flex justify-between max-w-full items-center p-2 mb-1 ${!isLightMode && 'bg-gray-900'}`}>
        <div className='bg-gray-50 rounded-lg outline-blue-500 border flex items-center'>
          <button className='rounded-tl-lg rounded-bl-lg p-3 text-center bg-blue-500'>
            <FaMagnifyingGlass className='text-white mr-1' />
          </button>
          <input 
            placeholder='Search here...' 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className='bg-gray-50 px-2 py-1 focus:outline-none'
          />
        </div>
        <div>
          <button 
            onClick={openModal} 
            disabled={filteredStockData.length === 0} 
            className={`bg-red-500 ${filteredStockData.length === 0 ? 'pointer-events-none bg-red-200' : 'hover:bg-red-400'} transition-all duration-300 rounded-lg lg:mt-auto md:mt-auto mt-2 lg:w-auto md:w-auto w-full p-2 text-white`}
          >
            Clear All Records
          </button>
        </div>
      </div>

      <div className={`w-full overflow-scroll`}>
        <table className={`w-full ${!isLightMode && 'bg-gray-900'}`}>
          <thead className={`${!isLightMode ? 'bg-gray-900 text-white' : 'bg-slate-200'}`}>
            <tr className='h-16'>
              <th className='whitespace-nowrap px-4 py-2'>Sale ID</th>
              <th className='whitespace-nowrap px-4 py-2'>Customer Name</th>
              <th className='whitespace-nowrap px-4 py-2'>Phone Number</th>
              <th className='whitespace-nowrap px-4 py-2'>Email</th>
              <th className='whitespace-nowrap px-4 py-2'>Medicine Name</th>
              <th className='whitespace-nowrap px-4 py-2'>Unit Price</th>
              <th className='whitespace-nowrap px-4 py-2'>Quantity</th>
              <th className='whitespace-nowrap px-4 py-2'>Total Price</th>
              <th className='whitespace-nowrap px-4 py-2'>Purchase Date</th>
              <th className='whitespace-nowrap px-4 py-2'>Action</th>
            </tr>
          </thead>
          <tbody className={`text-center ${!isLightMode && 'bg-gray-900 text-white'}`}>
            {filteredStockData.map((item) => (
              <tr key={item._id} className={`border h-16 ${!isLightMode ? 'bg-gray-900 hover:bg-gray-700' : 'hover:bg-gray-50'}`} title={item.date}>
                <td className='whitespace-nowrap text-sm px-4 py-2'>{item._id}</td>
                <td className='whitespace-nowrap text-sm px-4 py-2'>{item.customerName}</td>
                <td className='whitespace-nowrap text-sm px-4 py-2'>{item.phoneNumber}</td>
                <td className='whitespace-nowrap text-sm px-4 py-2'>{item.email}</td>
                <td className='whitespace-nowrap text-sm px-4 py-2'>{item.name}</td>
                <td className='whitespace-nowrap text-sm px-4 py-2'>GH&cent;{item.unitPrice.toFixed(2)}</td>
                <td className='whitespace-nowrap text-sm px-4 py-2'>{item.quantity}</td>
                <td className='whitespace-nowrap text-sm px-4 py-2'>GH&cent;{(item.unitPrice * item.quantity).toFixed(2)}</td>
                <td className='whitespace-nowrap text-sm px-4 py-2'>
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZone: 'UTC'
                  }).format(new Date(item.date))}
                </td>
                <td className='whitespace-nowrap text-sm px-4 py-2 text-center'>
                  {window.sessionStorage.getItem("role") === "admin" ? (
                    <button 
                      className='hover:bg-red-200 hover:text-white p-3 rounded-full' 
                      onClick={() => deleteSaleRecord(item._id)}
                    >
                      <FaTimes className='text-red-500' />
                    </button>
                  ) : (
                    <button 
                      className='p-3 ' 
                      disabled
                      title='Only the admin can delete transaction!'
                    >
                      <FaTimes className='text-red-200' />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SalesListTable;
