import React, { useEffect, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaDownload, FaSpinner, FaTimes, FaTrash } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import { RiFileSearchLine } from 'react-icons/ri';
import DeleteSalesModal from './DeleteSalesModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import checkIsAdmin from './../../utils/checkIsAdmin'
import Receipt from './Receipt';


function SalesListTable({ isLightMode }) {

  const [isModalOpen, setModalOpen] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = () => {
    if (window.sessionStorage.getItem("role") === "admin") {
      setModalOpen(true);
    } else {
      toast.error("Only admin can perform this action.");
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
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allSales`);
      if (response.ok) {
        const data = await response.json();
        if (data.sales.length === 0) {
          setErrorMessage('No data found.');
        }
        setSalesData(data.sales);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('An error occurred while fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // const intervalId = setInterval(fetchData, 3000);
    // return () => clearInterval(intervalId);
  }, []);

  const filteredStockData = salesData.filter((item) =>
    item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderMessage = (icon, message) => (
    <div className="flex flex-col items-center justify-center h-64">
      {icon}
      <p className="mt-2 text-xl text-center">{message}</p>
    </div>
  );

  return (
    <>
      <div className={`flex items-center justify-center ${!isLightMode && 'bg-gray-900'}`}>
        {isModalOpen && (
          <DeleteSalesModal closeModal={closeModal} />
        )}
      </div>
      <div className={`lg:flex md:flex justify-between max-w-full items-center p-2 mb-1 ${!isLightMode && 'bg-gray-900'}`}>
        <div className='bg-white rounded-lg outline-blue-500 border overflow-hidden flex items-center'>
          <button className='rounded-tl-lg rounded-bl-lg p-3 text-center bg-blue-500'>
            <FaMagnifyingGlass className='text-white mr-1' />
          </button>
          <input 
            placeholder='Search customers & drug...' 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className='bg-white px-2 py-1 focus:outline-none'
          />
        </div>
        <div>
          { salesData.length > 0 && checkIsAdmin() === "admin" &&
          <button 
            onClick={openModal} 
            disabled={filteredStockData.length === 0} 
            className={`bg-red-700 flex justify-center items-center gap-2 ${filteredStockData.length === 0 ? 'pointer-events-none bg-red-200' : 'hover:bg-red-500'} transition-all duration-300 rounded-md lg:mt-auto md:mt-auto mt-2 lg:w-auto md:w-auto w-full p-2 px-4 text-white`}
          >
            <FaTrash /> Clear All
          </button>}
        </div>
      </div>

      <div className='w-full text-gray-500 overflow-scroll'>
        {isLoading ? (
          renderMessage(<FaSpinner className='animate-spin text-gray-500 text-4xl' />, 'Loading...')
        ) : errorMessage ? (
          renderMessage(<MdErrorOutline className='text-red-600 text-6xl' />, errorMessage)
        ) : filteredStockData.length === 0 ? (
          renderMessage(<RiFileSearchLine className='text-gray-500 text-6xl' />, searchTerm ? 'No results found for your search.' : 'No data found.')
        ) : (
          <table className='w-full'>
            <thead className='bg-slate-200'>
              <tr className='h-12'>
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
                <tr key={item._id} className={`border h-16 ${!isLightMode ? 'bg-gray-900 hover:bg-gray-700' : 'hover:bg-gray-100'}`} title={item.date}>
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
                    {checkIsAdmin() ? (
                      <button 
                        className='hover:bg-red-200 hover:text-white p-3 rounded-full' 
                        onClick={() => deleteSaleRecord(item._id)}
                      >
                        <FaTimes className='text-red-500 hover:text-red-300 cursor-pointer' />
                      </button>
                    ) : (
                      
                        <Receipt sale={item} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default SalesListTable;
