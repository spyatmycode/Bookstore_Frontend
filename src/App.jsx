import React, { useEffect } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import ShowBook from './pages/ShowBook'
import toast, { Toaster } from 'react-hot-toast'
import Nav from './components/Nav'
import RenderAuth from './pages/Auth'
import Protected from './layout/Protected'
import  useAuthContext  from './hooks/useAuthContext'
import Settings from './pages/Settings'
import { useLogout } from './hooks/useLogout'
import io from 'socket.io-client'
import { URL } from './config/config'

const App = () => {

  const { authState } = useAuthContext()

  const { logout } = useLogout()



  const socket = io.connect(`${URL}`);

  useEffect(()=>{

    socket.on("*",(data)=>{
      toast(data?.message)
    })
   
    socket.on("customeridentification.success", (data)=>{


      const {message} = data;

      toast.success(message)

      setTimeout(()=>{
        window.location.reload()
      }, 5000)
    })


    socket.on("charge.success", (data)=>{

      const {message} = data

      toast.success(message)
      
    })

  },[])



  //This is to logout the user if token is expired

  useEffect(() => {

    const token = JSON.parse(localStorage.getItem("user"))?.token || null;

    if (!token) return

    const { exp } = token && JSON.parse(atob(token?.split('.')[1]));

    if (exp * 1000 < Date.now()) {
      // Token has expired, log the user out

      console.log("Expired tokennnn");

      logout();



    }


  }, [])



  const router = createBrowserRouter(
    [
      {
        path: '/auth',
        element: !(authState?.user?.token) ? <RenderAuth /> : <Navigate to={"/"} />,
      },
      {
        path: '/',
        element: <Protected component={<Nav />} />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: "/settings",
            element: <Settings />
          }
        ]
      },
      {
        path: '/books/:id',
        element: <Protected component={<ShowBook />} />
      },


    ]
  )
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          duration: 10000
        }}
        
      />

      <RouterProvider router={router} />

    </>

  )
}

export default App
