import DashboardCard from '@/Components/DashboardCard'
import FilterSelect from '@/Components/FilterSelect'
import NavBar from '@/Components/NavBar'
import SideBar from '@/Components/SideBar'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaFilter, FaMoneyBill, FaSortNumericDown, FaUser } from 'react-icons/fa'
import { FaMagnifyingGlass } from 'react-icons/fa6'

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All Customers');
  const [isLightMode, setIsLightMode] = useState(true);
  const [data, setData] = useState({
    stockData: [],
    salesData: [],
    lastSalesData: [],
    totalMedicines: 0,
    medicinesSold: 0,
    overallMedicinesSold: 0,
    totalSales: 0,
    totalSalesOverall: 0,
    totalStock: 0,
    totalStockOverall: 0,
    activeCustomers: 0,
    totalCustomers: 0,
    lastPurchase: null,
    customerLastPurchase: {},
    totalAmountInStock: 0,
    sumOfAllTransactions: 0,
  });

  // console.log(data)

  const toggleThemeMode = () => {
    setIsLightMode(!isLightMode);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/fetch-transaction-info`);
        // console.log("Fetched Data:", response.data);  // Check data structure
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Filtering and search logic
  

  const filteredStockData = data.lastSalesData.filter(item => {
    const matchesSearch = item.customerName?.toLowerCase().includes(searchTerm?.toLowerCase());
    if (filterStatus === 'All Customers') {
      return matchesSearch;
    }
    const lastPurchaseDate = new Date(item.date);
    const now = new Date();
    const diffInDays = Math.floor((now - lastPurchaseDate) / (1000 * 60 * 60 * 24));
    const isActive = diffInDays < 30;
    if (filterStatus === 'Active Customers') {
      return matchesSearch && isActive;
    }
    if (filterStatus === 'Inactive Customers') {
      return matchesSearch && !isActive;
    }
    return matchesSearch;
  });
  




  const calculatePercentage = (part, total) => total === 0 ? 0 : (part / total) * 100;

  const getStatusColor = (item) => {
    const lastPurchaseDate = new Date(item.date);
    const now = new Date();
    const diffInDays = Math.floor((now - lastPurchaseDate) / (1000 * 60 * 60 * 24));
    return diffInDays < 30 ? 'text-green-500' : 'text-yellow-500';
  };

  const getStatus = (item) => {
    const lastPurchaseDate = new Date(item.date);
    const now = new Date();
    const diffInDays = Math.floor((now - lastPurchaseDate) / (1000 * 60 * 60 * 24));
    return diffInDays < 30 ? 'Active' : 'Inactive';
  };

  return (
    <div className='flex max-w-full bg-gray-50 overflow-hidden max-h-screen'>
      <SideBar />
      <div className='w-full h-screen overflow-scroll'>
        <NavBar
          toggleThemeMode={toggleThemeMode}
          isLightMode={isLightMode}
          title={'DashBoard'}
          profilePicture={'/background.jpeg'}
          username={'John Buamah'}
        />
        <div className='px-4 lg:flex md:flex lg:justify-between md:justify-between items-center'>
          <div className='bg-white rounded-lg overflow-hidden outline-blue-500 border flex items-center'>
            <button className='rounded-tl-lg rounded-bl-lg p-3 text-center bg-blue-500'>
              <FaMagnifyingGlass className='text-white mr-1' />
            </button>
            <input 
              placeholder='Search here...' 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className='bg-white px-2 py-1 focus:outline-none'
            />
          </div>          
          <div className='flex items-center gap-2 mt-3 overflow-hidden '>
            <div className='flex gap-1 items-center'>
              <p className='flex items-center whitespace-nowrap overflow-scroll bg-black border-none rounded-lg text-xs p-2 mr-2 text-white'>
                <FaFilter size={8} />
                <span className=''> &nbsp; Filter by</span>&nbsp;
              </p>
            </div>
            <FilterSelect
              filterType={'Customers'}
              options={['All Customers', 'Active Customers', 'Inactive Customers']}
              onChange={setFilterStatus}
            />

          </div>
        </div>
                
        <div className='grid lg:grid-cols-4 grid-cols-1 gap-2 p-2 md:grid-cols-2'>
          <DashboardCard
            title={`Active Customers`}
            value={data.activeCustomers}
            borderColor="border-blue-300" 
            pathColor="#A7C6ED" 
            textClass="text-blue-300" 
            textColor="#A7C6ED" 
            trailColor="#F3F4F6" 
            backgroundColor="#f8f8f8"
            percentage={calculatePercentage(data.activeCustomers, data.totalCustomers)}
            period='Up from 3 days ago'
          />
          <DashboardCard
            title={`Total Sales`}
            value={data.totalSales}
            borderColor="border-red-300"
            pathColor="#FEB2B2"
            textClass="text-red-300"
            textColor="#FEB2B2"
            trailColor="#F3F4F6"
            backgroundColor="#f8f8f8"
            percentage={calculatePercentage(data.totalSales, data.totalStock)}
          />
          <DashboardCard
            title={`Total Medicines`}
            value={data.totalMedicines}
            borderColor="border-yellow-300" 
            pathColor="#FDE68A" 
            textClass="text-yellow-300" 
            textColor="#FDE68A" 
            trailColor="#F3F4F6" 
            backgroundColor="#f8f8f8"
            percentage={calculatePercentage(data.overallMedicinesSold, data.totalAmountInStock)}
            period='Up till today'
          />
          <DashboardCard
            title={`Total Amount Sold (GHC)`}
            value={data.medicinesSold.toFixed(2)}
            borderColor="border-green-300" 
            pathColor="#9AE6B4" 
            textClass="text-green-300" 
            textColor="#9AE6B4" 
            trailColor="#F3F4F6" 
            backgroundColor="#f8f8f8"
            percentage={calculatePercentage(data.medicinesSold, data.totalAmountInStock)}
          />
          
          
        </div>
        
        <div className={`w-full overflow-scroll`}>
          <h5 className='font-bold text-gray-500 m-2 text-sm'>All Customers</h5>
          <table className={`w-full ${!isLightMode && 'bg-gray-900'}`}>
            <thead className={`${!isLightMode ? 'bg-gray-900 text-white' : 'bg-slate-200'}`}>
              <tr className='h-16'>
                <th className='whitespace-nowrap px-4 py-2'>Customer Name</th>
                <th className='whitespace-nowrap px-4 py-2'>Phone Number</th>
                <th className='whitespace-nowrap px-4 py-2'>Email</th>
                <th className='whitespace-nowrap px-4 py-2'>Status</th>
                <th className='whitespace-nowrap px-4 py-2'>Last Medicine Bought</th>
                <th className='whitespace-nowrap px-4 py-2'>Price</th>
                <th className='whitespace-nowrap px-4 py-2'>Quantity</th>
                <th className='whitespace-nowrap px-4 py-2'>Total Amount</th>
                <th className='whitespace-nowrap px-4 py-2'>Overall Purchase</th>
                <th className='whitespace-nowrap px-4 py-2'>Last Seen</th>
              </tr>
            </thead>
            <tbody className={`text-center ${!isLightMode && 'bg-gray-900 text-white'}`}>
              {filteredStockData?.map((item) => (
                <tr key={item._id} className={`border h-16 `} title={item.date}>
                  <td className='whitespace-nowrap text-sm px-4 py-2'>{item.customerName}</td>
                  <td className='whitespace-nowrap text-sm px-4 py-2'>{item.phoneNumber}</td>
                  <td className='whitespace-nowrap text-sm px-4 py-2'>{item.email}</td>
                  <td className={`whitespace-nowrap text-sm px-4 py-2 ${getStatusColor(item)}`}>
                    {getStatus(item)}
                  </td>
                  <td className='whitespace-nowrap text-sm px-4 py-2'>{item.name}</td>
                  <td className='whitespace-nowrap text-sm px-4 py-2'>GH&cent;{item.unitPrice.toFixed(2)}</td>
                  <td className='whitespace-nowrap text-sm px-4 py-2'>{item.quantity}</td>
                  <td className='whitespace-nowrap text-sm px-4 py-2'>GH&cent;{(item.unitPrice * item.quantity).toFixed(2)}</td>
                  <td className='whitespace-nowrap text-sm px-4 py-2'>GH&cent;{item.sumOfAllTransactions.toFixed(2)}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;