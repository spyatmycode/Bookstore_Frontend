import React, { useState } from 'react'
import Book from '../components/Book'
import useDataContext from '../hooks/useDataContext';
import { DeleteModal, EditModal, LoadingModal, RefundModal } from '../components/Modals';

const Books = () => {
  const { data } = useDataContext()

  if(!data) return <div className=' relative top-[10vh]'>Loading...</div>


  if(data?.count <= 0)
  { return(
    <div className='w-full text-center my-10'>

      No books at this time, add a new book

    </div>
  )}

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [refundModal, setRefundModal] = useState(false);
  const [id, setID] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [transactionId, setTransactionId] = useState(null);



  return (
    <>

      <DeleteModal show={deleteModal} setShow={setDeleteModal} imageFileName={imageName} id={id} />
      <EditModal setShow={setEditModal} show={editModal} id={id} />
      <RefundModal setShow={setRefundModal} show={refundModal} transactionId={transactionId} />
      <div className='w-full flex flex-wrap items-center md:justify-normal md:flex-row flex-col md:items-baseline px-10 gap-10 my-10'>

        {

          data?.books?.map((book)=>{

            return(
            <Book key={id} deleteModal={deleteModal} editModal={editModal} setEditModal={setEditModal} setDeleteModal={setDeleteModal} imageFileName={imageName} id={id} book={book} setImageName={setImageName} setID={setID} transactionId={transactionId} setRefundModal={setRefundModal} setTransactionId={setTransactionId}/>)
          })

        }

      </div>
      </>
  )
}

export default Books
