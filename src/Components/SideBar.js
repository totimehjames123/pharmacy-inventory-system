import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaGauge, FaTablets, FaTableList, FaRightFromBracket, FaUserPlus } from 'react-icons/fa6';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function SideBar() {
    const router = useRouter();
    const [isCloseSideBar, setIsCloseSideBar] = useState(true);
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setRole(window.sessionStorage.getItem("role"));
        }
    }, []);

    const toggleSideBar = () => {
        setIsCloseSideBar(!isCloseSideBar);
    };

    const notifyLogout = () => {
        sessionStorage.clear();
        toast.success("You've logged out successfully!", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        router.push('/login');
    };

    const navLinks = [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: <FaGauge size={20} />,
            role: 'both'
        }, {
            title: "Stock",
            path: "/stocks",
            icon: <FaTablets size={20} />,
            role: 'both',
        },
        {
            title: "Sales",
            path: "/sales",
            icon: <FaTableList size={20} />,
            role: 'both'
        },
        {
            title: "New Attendant",
            path: "/manage-workers",
            icon: <FaUserPlus size={20} />,
            role: 'admin'
        },
    ];

    return (
        <aside className={`relative bg-black h-screen text-white transform transition-width pt-2 ${isCloseSideBar ? 'w-12' : 'w-auto lg:w-[20%]'} duration-500`}>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className={`flex justify-between m-2 mb-9`}>
                {!isCloseSideBar && <h4 className='text-blue-300 text-lg'>Epha<span className='text-white'>Medicals</span></h4>}
                <button onClick={toggleSideBar} className='border-2 rounded-full transition-all duration-500 w-8 h-8 hover:bg-slate-600 font-thin text-lg'>{isCloseSideBar ? '>' : '<'}</button>
            </div>
            <div className='h-[80%]'>
                {navLinks.map((navLink, index) =>
                    (navLink.role === role || navLink.role === "both") &&
                    <a key={index} href={navLink.path} className={`relative hover:bg-slate-900 flex items-center${router.pathname === navLink.path ? 'text-blue-500 bg-slate-700' : ''}`}>
                        {router.pathname === navLink.path && (
                            <span className="absolute inset-y-0 left-0 w-1 bg-blue-500" aria-hidden="true"></span>
                        )}
                        <span className='flex m-3'>
                            {navLink.icon}
                            <span className='ml-2 text-sm'>
                                {!isCloseSideBar && navLink.title}
                            </span>
                        </span>
                    </a>
                )}
            </div>
            <div className=''>
                <button className='flex ml-3 text-sm' onClick={notifyLogout}><FaRightFromBracket size={20} className='mr-3' />{!isCloseSideBar && 'Logout'}</button>
            </div>
        </aside>
    );
}

export default SideBar;
