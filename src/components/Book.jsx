import React, { useState } from 'react'
import useDataContext from '../hooks/useDataContext'
import { FaEye, FaTrash, FaMoneyCheckAlt, FaEllipsisV, FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Book = ({setDeleteModal, setImageName, setID, book, setEditModal, setTransactionId, setRefundModal}) => {

    const { data } = useDataContext()

    if (!data) return <h1>Loading...</h1>

    

    const { author, createdAt, image, publishYear, title, updatedAat, userId, _id } = book

    

    const [show, setShow] = useState(false)


    return (
        <div className='md:w-[250px] w-full  border-gray-400 rounded-md border-2 h-[300px] relative shadow-xl' id="book">

            <img src={image?.imageDownLoadUrl} className='absolute w-full h-full' id='book-image' alt="" />

            <div id='overlay' className='absolute bottom-0 flex flex-col w-full items-left pl-4 font-["poppins",sans-serif]'>

                <span className='font-bold text-2xl capitalize text-white'>{title}</span>
                <span className='font-semibold text-xl capitalize text-white'>{author}</span>
                <span className='font-semibold text-md capitalize text-white'>{publishYear}</span>



            </div>

            <div className='absolute right-3 bottom-3 z-40 cursor-pointer w-6 h-6 rounded-full flex justify-center items-center bg-white' onClick={() => setShow(true)}>
                <FaEllipsisV />
            </div>




            {show && (

                <div>
                    <div className='w-full h-full absolute' onClick={() => setShow(false)}>

                    </div>

                    <ul className='bg-white w-1/2 absolute right-3 bottom-3 text-black px-2 py-2 rounded-md cursor-pointer flex flex-col gap-3 shadow-md' id="menu-options">

                        <li><Link  className='flex justify-between pr-9 items-center gap-2 text-blue-500' to={`/books/${_id}`}><p>View</p> <FaEye /></Link></li>

                        <li className='flex justify-between pr-9 items-center gap-2 text-gray-500' 
                        onClick={(()=>{
                            setID(_id);setEditModal(true)
                        })}
                        
                        ><p>Edit</p> <FaEdit /></li>

                        <li className='flex justify-between pr-9 items-center gap-2 text-red-500' 
                        onClick={(()=>{
                            setID(_id);
                            setDeleteModal(true);
                            setImageName(image?.fileName)
                        })}
                        
                        ><p>Delete</p> <FaTrash /></li>

                        <li className='flex justify-between pr-9 items-center gap-2 text-green-500'
                        onClick={()=>{
                            setTransactionId(book?.transactionId);
                            setRefundModal(true);
                        }}
                        
                        ><p>Refund</p> <FaMoneyCheckAlt /></li>


                    </ul>
                </div>

            )}


        </div>
    )
}

export default Book
