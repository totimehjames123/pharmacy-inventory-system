import React, {useEffect, useState} from 'react'
import {FaMagnifyingGlass} from 'react-icons/fa6'
import Modal from './MakeSalesModal';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

function SalesListTable({isLightMode}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [stockData, setStockData] = useState([]);  // Change this line
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  console.log(stockData)

  const openModal = () => {
    if (window.sessionStorage.getItem("username") == "admin123"){
      setModalOpen(true);
    }
    else{
      alert("Only admin can perform")
    }
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };

  const deleteSaleRecord = async (id) => {
    const response = await axios.post("https://pharmacy-inventory-system-backend.onrender.com/deleteSaleRecord", {id: id})
    if (response.status === 200) {
      window.location.reload();    }
    else {
      alert("Failed to delete")
    }
  }
  
  const fetchData = async () => {
    try {
      const response = await fetch('https://pharmacy-inventory-system-backend.onrender.com/allSales');
      
      if (response.status === 200){ 
        const data = await response.json();
        setStockData(data.sales);
      }
      else{
        setErrorMessage(response.data.message)
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
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <>
    <div className={`flex items-center justify-center ${!isLightMode && 'bg-gray-900'}`}>
      {isModalOpen && (
        <Modal closeModal={closeModal}/>
      )}
    </div>
      <div className={`lg:flex md:flex  justify-between max-w-full items-center p-2 mb-1 ${!isLightMode && 'bg-gray-900'}`}>
        <div className='bg-gray-50 rounded-lg outline-blue-500 border flex items-center'>
          <button className='rounded-tl-lg rounded-bl-lg p-3 text-center bg-blue-500'>
            <FaMagnifyingGlass className='text-white mr-1'/>
          </button>
          <input placeholder='Search drugs' onChange={(e) => setSearchTerm(e.target.value)} className='bg-gray-50 px-2 focus:outline-none'/>
        </div>
        <div>

          <button onClick={openModal} disabled={filteredStockData.length === 0 && true} className={`bg-red-500 ${filteredStockData.length === 0 ? 'pointer-events-none bg-red-200': 'bg-red-500'} hover:bg-red-400 transition-all duration-300 rounded-lg lg:mt-auto md:mt-auto mt-2 lg:w-auto md:w-auto w-full p-2 text-white`}>
            Clear All Records
          </button>
        </div>
      </div>
    
      <div className={`w-full overflow-scroll`}>
        
        <table className={`w-full h-full ${!isLightMode && 'bg-gray-900'}`}>
          <thead className={`${!isLightMode ? 'bg-gray-900 text-white': 'bg-slate-200'}`}>
            <tr className='h-12 break'>
              <th className='whitespace-nowrap'>Sale ID</th>
              <th className='whitespace-nowrap'>Medicine Name</th>
              <th className='whitespace-nowrap'>Unit Price</th>
              <th className='whitespace-nowrap'>Quantity</th>
              <th className='whitespace-nowrap'>Total Price</th>
              <th className='whitespace-nowrap'>Purchase Date</th>
              <th className='whitespace-nowrap'>Action</th>              
            </tr>
          </thead>
          <tbody className={`text-center ${!isLightMode && 'bg-gray-900 text-white'}`}>
          { filteredStockData.map((item) => (
            <tr key={item._id} className={`border h-12 ${!isLightMode ? 'bg-gray-900 hover:bg-gray-700' : ' hover:bg-gray-50'}`} title={item.date}>
              <td className={`whitespace-nowrap text-sm`}>{item._id}</td>
              <td className='whitespace-nowrap text-sm'>{item.name}</td>
              <td className='whitespace-nowrap text-sm'>GH&cent;{item.unitPrice.toFixed(2)}</td>
              <td className='whitespace-nowrap text-sm'>{item.quantity}</td>
              <td className='whitespace-nowrap text-sm'>GH&cent;{(item.unitPrice * item.quantity).toFixed(2)}</td>
              <td className='whitespace-nowrap text-sm'>
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
              <td className='whitespace-nowrap text-sm text-center '>
                {window.sessionStorage.getItem("username") === "admin123" ?
                  <button  className='hover:bg-red-200 hover:text-white p-3 rounded-full' onClick={() => deleteSaleRecord(item._id)}>
                    <FaTimes className='text-red-500' />
                  </button> :
                  <button  className='hover:bg-red-200 hover:text-white p-3 rounded-full' onClick={() => alert("Only admin can delete sale records!")}>
                    <FaTimes className='text-red-500' />
                  </button> 
                }                               
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default SalesListTable