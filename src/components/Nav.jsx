import React from 'react'
import { AddBook, Logout } from './Buttons'
import { Outlet, useLocation } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import useAuthContext from '../hooks/useAuthContext'
import SideBar from './SideBar'
import { FaBars } from 'react-icons/fa'
import useDataContext from '../hooks/useDataContext'

const Nav = () => {

    const { logout } = useLogout();
    const { authState } = useAuthContext();
    const {setView, view} = useDataContext()
    const { showSideBar } = useDataContext()

    const location = useLocation()




    return (
        <>
            <div className='w-full p-4 fixed top-0 px-10 flex justify-between shadow-lg gap-5 items-center bg-white'>

                <div className='' onClick={() => showSideBar(true)}>
                    <FaBars className='text-2xl cursor-pointer' />
                </div>


                <div className='flex justify-end gap-1 md:gap-3 items-center w-full overflow-x-scroll'>
                    <span className='cursor-pointer hidden md:block'>
                        {authState?.user?.email}
                    </span>

                    <button className='px-4 py-3 text-sm rounded-md bg-blue-500 text-white' onClick={()=>setView(!view)}>
                        Switch view 
                    </button>

                    <span className='cursor-pointer'>
                        {location.pathname === "/" && <AddBook />}
                    </span>
                    {authState?.user?.email && <span className='cursor-pointer' onClick={logout}>
                        <Logout />
                    </span>}
                </div>

            </div>

            <SideBar />
            <div className='w-full top-[10vh] bottom-0 fixed overflow-y-auto overflow-x-hidden'>
                <Outlet />
            </div>
        </>
    )
}

export default Nav
