import { useRouter } from 'next/router';
import React, { useState } from 'react';
import axios from 'axios';

function UpdateStock() {
  const router = useRouter();
  const { id, name, unitPrice, quantity } = router.query;

  // Define state variables to hold updated values
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedUnitPrice, setUpdatedUnitPrice] = useState(unitPrice);
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);

  // Function to handle the update and send data to the API
  const handleUpdate = async () => {
    try {
      // Create an object with the updated data
      const updatedData = {
        id: id,
        name: updatedName,
        unitPrice: updatedUnitPrice,
        quantity: updatedQuantity,
      };



      const response = await axios.post(`http://localhost:5000/updateStock/`, updatedData);

      console.log('Update successful', response.data);

      router.push('/stocks');
    } catch (error) {
      // Handle errors
      console.error('Error updating data', error);
    }
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <div>
        <h4 className='font-bold text-[30px]'>Update a Record</h4>
        <div className='my-5'>You are about to update <b>{name}</b></div>

        <div className='mt-3'>
          <label className='font-bold flex justify-between'>Current Medicine Name 👉 <p className='text-sm font-200 text-orange-300'>{name}</p></label>
          <input type='text' value={updatedName} defaultValue={updatedName} placeholder='New Medicine Name' onChange={(e) => setUpdatedName(e.target.value)} className='p-5 border w-auto rounded-lg w-full'/>
        </div>
        <div className='mt-3'>
          <label className='font-bold flex justify-between'>Current Price 👉 <p className='text-sm font-200 text-orange-300'>{unitPrice}</p></label>
          <input type='text' value={updatedUnitPrice} defaultValue={updatedUnitPrice} placeholder='New Price' onChange={(e) => setUpdatedUnitPrice(e.target.value)} className='p-5 border w-auto rounded-lg w-full'/>
        </div>
        <div className='mt-3'>
          <label className='font-bold flex justify-between'>Current Quantity 👉 <p className='text-sm font-200 text-orange-300'>{quantity}</p></label>
          <input type='number' value={updatedQuantity} defaultValue={updatedQuantity} placeholder='New quantity' onChange={(e) => setUpdatedQuantity(e.target.value)} className='p-5 border w-auto rounded-lg w-full'/>
        </div>
        <p className='text-red-400 pt-1 text-sm'>Kindly Cancel you've not entered any data!</p>
        <div className='mt-4 flex justify-between w-full'>
          <button onClick={handleUpdate} className='bg-black rounded-lg text-white p-3'>Update</button>
          <a href='/stocks' className='bg-gray-600 rounded-lg text-white p-3'>Cancel</a>
        </div>
      </div>
    </div>
  );
}

export default UpdateStock;
