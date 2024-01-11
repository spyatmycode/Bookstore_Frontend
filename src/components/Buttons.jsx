import React, { useState } from 'react'
import { AddModal } from './Modals'

export const AddBook = () => {

  const [show, setShow] = useState(false)
  return (
    <>
    <div className='px-4 py-3 rounded-md bg-green-500 text-sm text-white' onClick={()=>setShow(true)}>
      Add
    </div>
    <AddModal show={show} setShow={setShow}/>
    </>
  )
}
export const Logout= () => {


  return (
    <>
    <div className='px-4 py-3 text-sm rounded-md bg-red-500 text-white'>
      Logout
    </div>

    </>
  )
}



