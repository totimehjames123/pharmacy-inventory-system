import React, { useEffect, useState } from 'react';
import { FaTrash, FaPenToSquare, FaMagnifyingGlass } from 'react-icons/fa6';
import { FaPlus, FaShoppingCart, FaSpinner } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import { RiFileSearchLine } from 'react-icons/ri';
import Modal from './AddMedicineModal';
import SalesModal from './SalesModal';
import UpdateStockModal from './UpdateStockModal'; // Import the UpdateStockModal
import axios from 'axios';
import { toast } from 'react-toastify';

function StockListTable() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isSalesModalOpen, setSalesModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); // State for UpdateStockModal
  const [currentMedicine, setCurrentMedicine] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const openAddModal = () => {
    if (window.sessionStorage.getItem("role") === "admin") {
      setAddModalOpen(true);
    } else {
      toast.error("Only admins can add new to stocks!");
    }
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const openSalesModal = (medicine) => {
    setCurrentMedicine(medicine);
    setSalesModalOpen(true);
  };

  const closeSalesModal = () => {
    setSalesModalOpen(false);
    setCurrentMedicine(null);
  };

  const openUpdateModal = (medicine) => {
    setCurrentMedicine(medicine);
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
    setCurrentMedicine(null);
  };

  const deleteStock = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}`);

    if (confirmDelete) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/deleteStock`, { id });
        if (response.status === 200) {
          toast.success(`${name} deleted successfully`);
          fetchData();
        }
      } catch (error) {
        toast.error("Error deleting stock");
      }
    }
  };

  const handleSales = async ({ customerName, email, phoneNumber, quantity }) => {
    setSalesModalOpen(false);
    const { _id, name, unitPrice } = currentMedicine;

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/makeSales`, {
        name,
        unitPrice,
        quantity,
        customerName,
        email,
        phoneNumber
      });

      if (response.status === 200) {
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/updateStockQuantityAtSales`, { name, quantity });
        toast.success(response.data.message);
        fetchData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error processing sale");
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allStocks`);
      if (response.status === 200) {
        const data = await response.json();
        setStockData(data.stocks);
        setIsLoading(false);
      } else {
        setErrorMessage(response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error fetching data");
      setErrorMessage('An error occurred while fetching data');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredStockData = stockData?.filter((item) =>
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
      <div className="flex items-center justify-center">
        {isAddModalOpen && <Modal closeModal={closeAddModal} fetchData={fetchData}/>}
        {isSalesModalOpen && <SalesModal closeModal={closeSalesModal} handleSales={handleSales} currentMedicine={currentMedicine} />}
        {isUpdateModalOpen && <UpdateStockModal isOpen={isUpdateModalOpen} onClose={closeUpdateModal} currentStock={currentMedicine} fetchData={fetchData} />} {/* Add UpdateStockModal */}
      </div>
      <div className='lg:flex md:flex justify-between max-w-full items-center p-2 mb-1'>
        <div className='bg-white rounded-lg outline-blue-500 overflow-hidden border flex items-center'>
          <button className='rounded-tl-lg rounded-bl-lg p-3 text-center bg-blue-500'>
            <FaMagnifyingGlass className='text-white mr-1' />
          </button>
          <input
            placeholder='Search drugs ...'
            onChange={(e) => setSearchTerm(e.target.value)}
            className='bg-white px-2 w-auto overflow-hidden bg-none focus:outline-none'
          />
        </div>
        <div>
          <button
            onClick={openAddModal}
            className='bg-green-700 flex gap-2 items-center justify-center hover:bg-green-500 transition-all duration-300 rounded-md lg:mt-auto md:mt-auto mt-2 lg:w-auto md:w-auto w-full p-2 px-4 text-white'
          >
            <FaPlus /> New Drug
          </button>
        </div>
      </div>

      <div className='w-full overflow-scroll text-gray-500'>
        {isLoading ? (
          renderMessage(<FaSpinner className='animate-spin text-gray-500 text-4xl' />, <span className='text-gray-500'>Loading...</span>)
        ) : errorMessage ? (
          renderMessage(<MdErrorOutline className='text-red-600 text-6xl' />, errorMessage)
        ) : filteredStockData.length === 0 ? (
          renderMessage(<RiFileSearchLine className='text-gray-500 text-6xl' />, searchTerm ? 'No results found for your search.' : 'No data found.')
        ) : (
          <table className='w-full'>
            <thead className='bg-slate-200'>
              <tr className='h-12 break'>
                <th className='whitespace-nowrap'>Medicine ID</th>
                <th className='whitespace-nowrap'>Medicine Name</th>
                <th className='whitespace-nowrap'>Unit Price</th>
                <th className='whitespace-nowrap'>Quantity</th>
                <th className='whitespace-nowrap'>Total Price</th>
                <th className='whitespace-nowrap'>Action</th>
              </tr>
            </thead>

            <tbody className='text-center'>
              {filteredStockData.map((item) => (
                <tr key={item._id} className='border h-12 hover:bg-gray-100'>
                  <td className='whitespace-nowrap text-sm px-4 py-2'>{item._id}</td>
                  <td className='whitespace-nowrap text-sm px-4 py-2'>{item.name}</td>
                  <td className='whitespace-nowrap text-sm px-4 py-2'>GH&cent;{item?.unitPrice?.toFixed(2)}</td>
                  <td className='whitespace-nowrap text-sm px-4 py-2'>{item.quantity}</td>
                  <td className='whitespace-nowrap text-sm px-4 py-2'>GH&cent;{(item.unitPrice * item.quantity).toFixed(2)}</td>
                  <td className=''>
                    <div className='flex lg:justify-around sm:justify-between lg:gap-x-3 gap-x-5 px-3'>
                      {window.sessionStorage.getItem("role") == "admin" ? (
                        <>
                          <FaPenToSquare className='text-blue-600 hover:text-blue-300 cursor-pointer' onClick={() => openUpdateModal(item)} />
                          <FaTrash className='text-red-500 hover:text-red-300 cursor-pointer' onClick={() => deleteStock(item._id, item.name)} />
                        </>
                      ) : (
                        <FaShoppingCart className={`flex  justify-self-center ${item.quantity < 1 ? 'text-green-200' : 'text-green-600 hover:text-green-300 cursor-pointer'}`} onClick={() => item.quantity > 1 && openSalesModal(item)} />
                      )}
                    </div>
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

export default StockListTable;
