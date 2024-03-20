import React, {useEffect, useState} from 'react'
import {FaTrash, FaPenToSquare, FaMagnifyingGlass} from 'react-icons/fa6'
import Modal from './AddMedicineModal';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';

function StockListTable({}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [stockData, setStockData] = useState([]);  // Change this line
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  
  const openModal = () => {
    if (window.sessionStorage.getItem("username") === "admin123"){
      setModalOpen(true);
    }
    else {
      alert("Only admins can add stocks.")
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const deleteStock = async (id, name) => {
    const confirmDelete = confirm(`Are you sure you want to delete ${name}`)

    if (confirmDelete){
      const response = await axios.post("http://localhost:5000/deleteStock", {id: id})

      if (response.status === 200){
        // alert(`${name} deleted successfully`)
      }
    }
  }

  const makeSales = async (medicineId, medicineName, unitPrice) => {
    const quantity = prompt(`How many ${medicineName} do you want to sell?`)
    
    if (quantity !== ""){
      const response = await axios.post("http://localhost:5000/makeSales", {name: medicineName, unitPrice: unitPrice, quantity: quantity})
      
      if (response.status == 200){
        const res = await axios.post("http://localhost:5000/updateStockQuantityAtSales", {name: medicineName, quantity: quantity})
        if (res.status == 200){
          alert (res.data.message)
        }
        
      }
    }
    else {
      alert("This field can't be empty")
    }

    
  }
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/allStocks');
      
      if (response.status === 200){ 
        const data = await response.json();
        setStockData(data.stocks);
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
    <div className="flex items-center justify-center ">
      {isModalOpen && (
        <Modal closeModal={closeModal}/>
      )}
      
    </div>
      <div className='flex justify-between items-center p-2 mb-1'>
        <div className='bg-gray-50 rounded-lg outline-blue-500 border flex items-center'>
          <button className='rounded-tl-lg rounded-bl-lg p-3 text-center bg-blue-500'>
            <FaMagnifyingGlass className='text-white mr-1'/>
          </button>
          <input placeholder='Search drugs ...' onChange={(e) => setSearchTerm(e.target.value)} className='bg-gray-50 px-2 focus:outline-none'/>
        </div>
        <div>
        {
          
          <>
            <button onClick={openModal} className='bg-green-500 hover:bg-green-400 transition-all duration-300 rounded-lg p-2 text-white'>
              Add 
            </button>
          </>
        }
        </div>
      </div>
    
      <div className='w-full overflow-scroll'>
        
        <table className='w-full'>
          <thead className='bg-slate-200'>
            <tr className='h-12 break'>
              <th className='whitespace-nowrap'>Medicine ID</th>
              <th className='whitespace-nowrap'>Name</th>
              <th className='whitespace-nowrap'>Unit Price</th>
              <th className='whitespace-nowrap'>Quantity</th>
              <th className='whitespace-nowrap'>Total Price</th>
              <th className='whitespace-nowrap'>Action</th>
            </tr>
          </thead>
          <tbody className='text-center'>
          { filteredStockData.map((item, index) => (
            <tr key={item._id} className='border h-12 hover:bg-gray-50'>
              <td className='whitespace-nowrap'>{item._id}</td>
              <td className='whitespace-nowrap'>{item.name}</td>
              <td className='whitespace-nowrap'>GH&cent;{item.unitPrice.toFixed(2)}</td>
              <td className='whitespace-nowrap'>{item.quantity}</td>
              <td className='whitespace-nowrap'>GH&cent;{(item.unitPrice * item.quantity).toFixed(2)}</td>
              <td>
                <div className='flex justify-around'>
                  <FaShoppingCart className='text-green-600' onClick={() => makeSales(item._id, item.name, item.unitPrice)}/>
                  {window.sessionStorage.getItem("username") === "admin123" &&
                    <>
                      <a href={`updateStock?id=${item._id}&name=${item.name}&unitPrice=${item.unitPrice}&quantity=${item.quantity}`}>
                        <FaPenToSquare className='text-blue-600'/>
                      </a>
                      <FaTrash className='text-red-500' onClick={() => deleteStock(item._id, item.name)}/>
                    </>
                  }
                  
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default StockListTable