import React from 'react'
import { AddBook, Logout } from './Buttons'
import { Outlet, useLocation } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import  useAuthContext  from '../hooks/useAuthContext'
import SideBar from './SIdeBar'
import { FaBars } from 'react-icons/fa'
import useDataContext from '../hooks/useDataContext'

const Nav = () => {

    const {logout} = useLogout();
    const {authState} = useAuthContext();
    const {showSideBar} = useDataContext()

    const location = useLocation()

   


    return (
        <>
            <div className='w-full p-4 px-10 flex justify-between gap-3 items-center'>

                <div className='' onClick={()=>showSideBar(true)}>
                    <FaBars className='text-2xl cursor-pointer'/>
                </div>


               <div className='flex justify-end gap-3 items-center'>
               <span className='cursor-pointer'>
                   {authState?.user?.email}
                </span>
                <span className='cursor-pointer'>
                   {authState?.user?.email}
                </span>
                <span className='cursor-pointer'>
                    {location.pathname==="/" && <AddBook />}
                </span>
               {authState?.user?.email && <span className='cursor-pointer' onClick={logout}>
                    <Logout />
                </span>}
               </div>
                
            </div>

            <SideBar/>
            <div className='w-full h-[90vh]'> 
            <Outlet />
            </div>
        </>
    )
}

export default Nav
