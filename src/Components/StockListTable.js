import React, { useEffect, useState } from 'react';
import { FaTrash, FaPenToSquare, FaMagnifyingGlass } from 'react-icons/fa6';
import Modal from './AddMedicineModal';
import SalesModal from './SalesModal';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

function StockListTable() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isSalesModalOpen, setSalesModalOpen] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const openAddModal = () => {
    if (window.sessionStorage.getItem("role") === "admin"){
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

  const deleteStock = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}`);

    if (confirmDelete) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/deleteStock`, { id: id });
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
        name: name,
        unitPrice: unitPrice,
        quantity: quantity,
        customerName,
        email,
        phoneNumber
      });

      if (response.status === 200) {
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/updateStockQuantityAtSales`, { name: name, quantity: quantity });
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
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/allStocks`);
      if (response.status === 200) {
        const data = await response.json();
        setStockData(data.stocks);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const filteredStockData = stockData?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center justify-center ">
        {isAddModalOpen && <Modal closeModal={closeAddModal} />}
        {isSalesModalOpen && <SalesModal closeModal={closeSalesModal} handleSales={handleSales} currentMedicine={currentMedicine} />}
      </div>
      <div className='lg:flex md:flex justify-between max-w-full items-center p-2 mb-1'>
        <div className='bg-gray-50 rounded-lg outline-blue-500 border flex items-center'>
          <button className='rounded-tl-lg rounded-bl-lg p-3 text-center bg-blue-500'>
            <FaMagnifyingGlass className='text-white mr-1' />
          </button>
          <input
            placeholder='Search drugs ...'
            onChange={(e) => setSearchTerm(e.target.value)}
            className='bg-gray-50 px-2 w-auto overflow-hidden bg-none focus:outline-none'
          />
        </div>
        <div>
          <button
            onClick={openAddModal}
            className='bg-green-500 hover:bg-green-400 transition-all duration-300 rounded-lg lg:mt-auto md:mt-auto mt-2 lg:w-auto md:w-auto w-full p-2 text-white'
          >
            New Drug
          </button>
        </div>
      </div>

      <div className='w-full overflow-scroll'>
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
              <tr key={item._id} className='border h-12 hover:bg-gray-50'>
                <td className='whitespace-nowrap text-sm px-4 py-2'>{item._id}</td>
                <td className='whitespace-nowrap text-sm px-4 py-2'>{item.name}</td>
                <td className='whitespace-nowrap text-sm px-4 py-2'>GH&cent;{item.unitPrice.toFixed(2)}</td>
                <td className='whitespace-nowrap text-sm px-4 py-2'>{item.quantity}</td>
                <td className='whitespace-nowrap text-sm px-4 py-2'>GH&cent;{(item.unitPrice * item.quantity).toFixed(2)}</td>
                <td className=''>
                  <div className='flex lg:justify-around sm:justify-between lg:gap-x-3 gap-x-5 px-3'>
                    {window.sessionStorage.getItem("role") == "admin" ?
                      <>
                        <a href={`updateStock?id=${item._id}&name=${item.name}&unitPrice=${item.unitPrice}&quantity=${item.quantity}`}>
                          <FaPenToSquare className='text-blue-600' />
                        </a>
                        <FaTrash className='text-red-500' onClick={() => deleteStock(item._id, item.name)} />
                      </> : 
                      <FaShoppingCart className={`flex justify-self-center ${item.quantity < 1 ? 'text-green-200':'text-green-600'}`} onClick={() => item.quantity > 1 && openSalesModal(item)} />
                    }
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StockListTable;
