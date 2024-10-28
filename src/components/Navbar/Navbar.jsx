
import React, { useState, useEffect } from 'react';
import WAT2 from '../../image/lront.png';
import { Link } from 'react-router-dom';
import NavbarCart from '../NavbarCart/NavbarCart';
import NavbarSidebar from '../NavbarSidebar/NavbarSidebar';

function Navbar() {
    const [isSticky, setIsSticky] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <React.Fragment>
            <div className={` ${isSticky ? 'bg-white border-b fixed top-0 right-0 left-0 transition-all duration-300 z-[2322122]' : 'bg-transparent  fixed top-0 right-0 left-0 text-white shadow-2xl z-[212313122]'}`}>
                <span className={` 
                ${isSticky ? 'bg-black text-white hidden font-semibold text-[10px] text-center mx-auto justify-center pt-2 tracking-[0.2rem]' :
                        'bg-black text-white font-semibold text-[10px] text-center mx-auto flex justify-center pt-2 tracking-[0.2rem]'}`}>
                    CONSPIRE COLLECTION IS LIVE NOW!
                </span>
                <div className="border-b  py-3 border-white px-5 mx-auto">
                    <div className="flex items-center mx-4 justify-end">
                        <i className='text-black mx-2 fa-brands fa-facebook'></i>
                        <i className='text-black mx-2 fa-brands fa-instagram'></i>
                        <i className='text-black mx-2 fa-brands fa-x-twitter'></i>
                        <i className='text-black mx-2 fa-brands fa-linkedin'></i>
                        <i className='text-black mx-2 fa-brands fa-whatsapp'></i>
                        <Link to={'/'} className='ms-auto flex  md:hidden lg:hidden justify-center'>
                            <img className="ms-auto flex md:hidden lg:hidden justify-center rotate w-8" src={WAT2} alt="" />
                        </Link>
                    </div>
                </div>
                <div className="container flex justify-between items-center px-5 mx-auto">
                    <NavbarSidebar />
                    <Link to={'/'} className='w-full  mx-auto flex justify-center'>
                        <img className="hidden mx-auto md:flex lg:flex justify-center rotate   w-20 py-5" src={WAT2} alt="" />
                    </Link>
                    <div className="flex items-center">
                        <NavbarCart />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default Navbar;
