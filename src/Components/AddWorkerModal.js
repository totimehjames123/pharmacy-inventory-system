import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

function AddWorkerModal({ closeModal, worker, notifySuccess, notifyError, addOrUpdateWorker }) {
  const [name, setName] = useState(worker?.name || '');
  const [username, setUsername] = useState(worker?.username || '');
  const [email, setEmail] = useState(worker?.email || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (worker) {
      setName(worker.name);
      setUsername(worker.username);
      setEmail(worker.email);
    }
  }, [worker]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous error messages

    if (!name || !username || !email) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }

    try {
      const response = worker
        ? await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/update-worker`, { id: worker._id, name, username, email })
        : await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-worker`, { name, username, email });

      if (response.status === 200) {
        closeModal();
        notifySuccess(response.data.message);
        addOrUpdateWorker(response.data.worker);
      } else if (response.status === 409) {
        notifyError(response.data.message);
      }
    } catch (error) {
      notifyError(error?.response?.data?.message || 'Error adding/updating worker');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-lg font-bold mb-4'>{worker ? 'Edit Worker' : 'Add Worker'}</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block mb-2'>Name</label>
            <input
              type='text'
              className='w-full p-2 border rounded'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter Name'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Username</label>
            <input
              type='text'
              className='w-full p-2 border rounded'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter username'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Email</label>
            <input
              type='email'
              className='w-full p-2 border rounded'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter email'
            />
          </div>
          {error && <div className='mb-4 text-red-500'>{error}</div>}
          <div className='flex justify-end'>
            
            <button type='submit' className='p-2 bg-black text-white rounded-lg mr-2' disabled={loading}>
              {loading ? <FaSpinner className='animate-spin' /> : worker ? 'Update' : 'Submit'}
            </button>
            <button type='button' onClick={closeModal} className=' p-2 bg-gray-500 text-white rounded-lg'>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddWorkerModal;
