import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'

function NavbarSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const [isCategoryOpen, setIsCategoryOpen] = useState(false); // State for category dropdown
    const sidebarRef = useRef(null); // Ref for the sidebar

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleCategory = () => {
        setIsCategoryOpen(!isCategoryOpen); // Toggle category visibility
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarRef]);
    
    
    return (
        <React.Fragment>
            <button onClick={toggleSidebar} className="p-3">
                {/* <i className="text-black text-2xl fa-solid fa-bars"></i> */}
                <i className='text-black mx-2  text-2xl  fa-solid fa-bars'></i>

            </button>
            <div ref={sidebarRef} className={` fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-2xl border p-4 transform transition-transform duration-300 ${isOpen ? 'translate-x-0 z-[2322122]' : '-translate-x-full z-[2322122]'}`}>
                <button onClick={toggleSidebar} className="text-black border-b me-auto flex justify-end text-end w-full text-xl p-2 mb-4 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <ul >
                    <li className="text-black hover:text-gray-800 mb-2 p-2">
                        <Link className='cursor-pointer px-4 tracking-widest' to={'/Home'}>Home</Link>
                    </li>
                    <li className="text-gray-700 hover:text-gray-800 mb-2 p-2">
                        <div onClick={toggleCategory} className="cursor-pointer flex justify-between items-center">
                            <p className='px-4 tracking-widest'>
                                products
                            </p>
                            <i className="text-[14px] text-gray-700 fa-solid fa-chevron-up fa-rotate-180"></i>
                        </div>
                        {isCategoryOpen && (
                            <ul className="pl-4 border-b">
                                <li className="text-black hover:text-gray-800 p-2">
                                    <Link className='cursor-pointer px-4 tracking-widest' to={'/Categories'}>Categories</Link>
                                </li>
                                <li className="text-black hover:text-gray-800 p-2">
                                    <Link className='cursor-pointer px-4 tracking-widest' to={'/Shorts'}>Shorts</Link>
                                </li>
                                <li className="text-black hover:text-gray-800 p-2">
                                    <Link className='cursor-pointer px-4 tracking-widest' to={'/Tshirts'}>T-Shirts</Link>
                                </li>
                            
                            </ul>
                        )}
                    </li>
                    <li className="text-black hover:text-gray-800 mb-2 p-2">
                        <Link className='cursor-pointer px-4 tracking-widest' to={'/AboutUs'}>AboutUs</Link>
                    </li>
                    <li className="text-black hover:text-gray-800 mb-2 p-2">
                        <Link className='cursor-pointer px-4 tracking-widest' to={'/ContentUs'}>ContentUs</Link>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default NavbarSidebar