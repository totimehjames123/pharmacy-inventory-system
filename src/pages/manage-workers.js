import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner, FaTrash, FaPenToSquare, FaMagnifyingGlass, FaPlus } from 'react-icons/fa6';
import { FaExclamationTriangle } from 'react-icons/fa';
import NavBar from '@/Components/NavBar';
import SideBar from '@/Components/SideBar';
import AddWorkerModal from '@/Components/AddWorkerModal';
import checkIsAdminAndNavigate from './../../utils/checkIsAdminAndNavigate'
import checkIsLoggedInAndNavigate from './../../utils/checkIsLoggedInAndNavigate'


function ManageWorkers() {
  checkIsLoggedInAndNavigate ("/manage-workers", "/login")
  checkIsAdminAndNavigate()

  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [currentWorker, setCurrentWorker] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/workers`);
      setWorkers(response.data.workers);
    } catch (error) {
      toast.error(error.response.data.message || 'Error fetching workers', { theme: 'colored' });
    } finally {
      setLoading(false);
    }
  };

  const deleteWorker = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);

    if (confirmDelete) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/delete-worker`, { id });
        if (response.status === 200) {
          toast.success(`${name} deleted successfully`, { theme: 'colored' });
          fetchData();
        }
      } catch (error) {
        toast.error(error.response.data.message || 'Error deleting worker', { theme: 'colored' });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const openEditModal = (worker) => {
    setCurrentWorker(worker);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setCurrentWorker(null);
  };

  const addOrUpdateWorker = (worker) => {
    fetchData();
  };

  const filteredWorkers = workers.filter((worker) =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex max-w-full overflow-hidden max-h-screen'>
      <SideBar />
      <div className='w-full h-screen overflow-scroll'>
        <NavBar title={'Manage Workers'} profilePicture={'/background.jpeg'} username={'John Buamah'} />

        <div className='h-[90%]'>
          <div>
            <ToastContainer position='top-left' autoClose={5000} hideProgressBar={false} theme='colored' />
            <div className='lg:flex md:flex justify-between max-w-full items-center p-2 mb-1'>
              <div className='bg-white rounded-lg outline-blue-500 overflow-hidden border flex items-center'>
                <button className='rounded-tl-lg rounded-bl-lg p-3 text-center bg-blue-500'>
                  <FaMagnifyingGlass className='text-white mr-1' />
                </button>
                <input
                  placeholder='Search workers ...'
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='bg-white px-2 w-auto overflow-hidden bg-none focus:outline-none'
                />
              </div>
              <div>
                <button
                  onClick={openAddModal}
                  className='bg-green-700 flex gap-2 items-center justify-center hover:bg-green-500 transition-all duration-300 rounded-md lg:mt-auto md:mt-auto mt-2 lg:w-auto md:w-auto w-full p-2 px-4 text-white'
                >
                  <FaPlus /> New Worker
                </button>
              </div>
            </div>
            {isAddModalOpen && (
              <AddWorkerModal closeModal={closeAddModal} notifySuccess={toast.success} notifyError={toast.error} addOrUpdateWorker={addOrUpdateWorker} />
            )}
            {isEditModalOpen && (
              <AddWorkerModal closeModal={closeEditModal} worker={currentWorker} notifySuccess={toast.success} notifyError={toast.error} addOrUpdateWorker={addOrUpdateWorker} />
            )}
            <div className='w-full overflow-scroll text-gray-500'>
              {loading ? (
                <div className='flex justify-center items-center'>
                  <FaSpinner className='animate-spin text-gray-500 text-4xl' />
                </div>
              ) : filteredWorkers.length === 0 ? (
                <div className='flex flex-col items-center justify-center text-gray-500'>
                  <FaExclamationTriangle className='text-red-500 text-6xl mb-2' />
                  <p>No workers found</p>
                </div>
              ) : (
                <>
                  <table className='w-full'>
                    <thead className='bg-slate-200'>
                      <tr className='h-12'>
                        <th className='whitespace-nowrap'>Worker ID</th>
                        <th className='whitespace-nowrap'>Name</th>
                        <th className='whitespace-nowrap'>Username</th>
                        <th className='whitespace-nowrap'>Email</th>
                        <th className='whitespace-nowrap'>Action</th>
                      </tr>
                    </thead>
                    <tbody className='text-center'>
                      {filteredWorkers.map((worker) => (
                        <tr key={worker._id} className='border h-12 hover:bg-gray-100'>
                          <td className='whitespace-nowrap text-sm px-4 py-2'>{worker._id}</td>
                          <td className='whitespace-nowrap text-sm px-4 py-2'>{worker.name}</td>
                          <td className='whitespace-nowrap text-sm px-4 py-2'>{worker.username}</td>
                          <td className='whitespace-nowrap text-sm px-4 py-2'>{worker.email}</td>
                          <td>
                            <div className='flex lg:justify-around sm:justify-between lg:gap-x-3 gap-x-5 px-3'>
                              <FaPenToSquare className='text-blue-600 hover:text-blue-300 cursor-pointer' onClick={() => openEditModal(worker)} />
                              <FaTrash className='text-red-500 hover:text-red-300 cursor-pointer' onClick={() => deleteWorker(worker._id, worker.name)} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredWorkers.length === 0 && (
                    <div className='flex flex-col items-center justify-center text-gray-500 mt-4'>
                      <FaMagnifyingGlass className='text-gray-500 text-6xl mb-2' />
                      <p>No results found for your search</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageWorkers;
