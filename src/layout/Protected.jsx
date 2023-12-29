import React, { useState } from 'react'
import  useAuthContext  from '../hooks/useAuthContext'
import { Navigate } from 'react-router-dom';

const Protected = ({component}) => {
    const {authState} = useAuthContext();

  return (
    (authState?.user?.token) ? component : <Navigate to={"/auth"}/>
  )
}

export default Protected
