import React from 'react'
import { createPortal } from 'react-dom'
import { FaCog, FaHome, FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import useDataContext from '../hooks/useDataContext'

const SideBar = () => {
    const {sideBar, showSideBar} = useDataContext();
    return sideBar && createPortal(
        <div className='h-[100vh] fixed top-0 bottom-0 flex w-full z-[99999]'>
            <div className='lg:w-2/5 w-3/5 h-full flex pt-6 flex-col bg-white'>


                <span className='flex items-center justify-between px-5 py-10 '>
                <p className='font-bold text-xs md:text-lg select-none'>DEDICATEDVAS</p>
                <FaTimes className='text-xl font-extralight cursor-pointer' onClick={()=>showSideBar(false)}/>


                </span>
                <ul className='w-full flex flex-col gap-10 items-start px-5 py-10'>

                    <li className='w-full'>
                        <NavLink
                            to={'/'}
                            className={(nav) => nav.isActive ? "flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-4 w-full" :  "hover:bg-gray-100 flex items-center gap-2 rounded-2xl px-4 py-4 w-full"}
                        >
                            <FaHome />
                            <p className='font-bold text-lg'>Home</p>

                        </NavLink>
                    </li>
                    <li className='w-full'>
                        <NavLink
                            to={'/settings'}
                            className={(nav) => nav.isActive ? "flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-4 w-full" : "hover:bg-gray-100 flex items-center gap-2 rounded-2xl px-4 py-4 w-full"}
                        >
                            <FaCog />
                            <p className='font-bold text-lg'>Settings</p>

                        </NavLink>
                    </li>

                </ul>

            </div>
            <div className='lg:w-4/5 w-3/5 bg-black opacity-40 h-full' onClick={()=>showSideBar(false)}>

            </div>
        </div>,
        document.getElementById("sidebar")
    )
}

export default SideBar
