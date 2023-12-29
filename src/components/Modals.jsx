import React, { useEffect, useState } from 'react'
import ReactDOM, { createPortal } from 'react-dom'
import { FaTimes } from 'react-icons/fa'
import { addBook, editBook } from '../functions/functions'
import { deleteBook } from "../functions/functions";
import circleLoading from '../assets/circleLoading.gif'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAuthContext  from '../hooks/useAuthContext'
import useDataContext from '../hooks/useDataContext'

export const AddModal = ({ show, setShow }) => {

  const {authState} = useAuthContext();

  const [inputs, setInputs] = useState({ title: "", author: "", year: "" });

  const { getData } = useDataContext();


  const handleChange = (e) => {

    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value })

  }



  const handleSubmit = async (e) => {

    e.preventDefault();

    const { title, author, year } = inputs
    if (!title || !author || !year) return;

    addBook(title, year, author, getData, authState.user.token)

    setShow(false)
  }


  return ReactDOM.createPortal(

    (show && <>
      <div className='fixed flex justify-center items-center w-full h-[100vh] z-50 top-0 bottom-0'>
        <div className='w-full h-[100vh] opacity-50 absolute block bg-black' onClick={() => setShow(false)}>

        </div>
        <form className='w-1/2 absolute bg-white px-4 py-5 rounded-md' onSubmit={handleSubmit}>
          <div className='flex justify-between items-center my-2 '>
            <h1 className='text-2xl '>
              Add a New Book !
            </h1>

            <span onClick={() => setShow(false)}>
              <FaTimes className='text-2xl cursor-pointer' />
            </span>
          </div>
          {/* Inputs */}
          <div className='flex justify-start flex-col gap-5'>
            <div className='flex flex-col gap-2 justify-start px-3'>
              <label htmlFor="author">Title</label>
              <input type="text" name='title' placeholder='Enter book title' className='px-4 py-3 bg-gray-100 text-sm placeholder:text-gray-500 outline-gray-200 rounded-md' onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-2 justify-start px-3'>
              <label htmlFor="author">Author</label>
              <input type="text" name='author' placeholder="Enter book's author" className='px-4 py-3 bg-gray-100 text-sm placeholder:text-gray-500 outline-gray-200 rounded-md' onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-2 justify-start px-3'>
              <label htmlFor="author">Year</label>
              <input type="number" name='year' placeholder="Enter the book's year" className='px-4 py-3 bg-gray-100 text-sm placeholder:text-gray-500 outline-gray-200 rounded-md' onChange={handleChange} />
            </div>

          </div>

          <div className='w-full px-3'>
            <button type="submit" className='w-full py-3 rounded-md px-3 text-white font-bold bg-blue-500 my-5' >Add new book</button>
          </div>
        </form>

      </div>
    </>)
    ,
    document.getElementById("modal")

  )
}
export const DetailsModal = ({ data }) => {

  const {
    author,
    title,
    createdAt,
    updatedAt,
    _id,
    publishYear
  } = data.book




  return ReactDOM.createPortal(

    (data ? <>
      <div className='fixed flex justify-center items-center w-full h-[100vh] z-50 top-0 bottom-0'>
        <div className='w-full h-[100vh] opacity-50 absolute block bg-black' >

        </div>
        <div className='w-1/2 absolute bg-white px-4 py-5 rounded-md' >
          <div className='flex justify-between items-center my-2 flex-shrink-0'>
            <h1 className='lg:text-2xl text-black text-xs sm:text-base'>
              {_id}
            </h1>

            <span >
              <Link to={-1}>
                <FaTimes className='text-2xl cursor-pointer' />
              </Link>
            </span>
          </div>
          {/* Inputs */}
          <div className='flex justify-start flex-col gap-5'>
            <div className='flex flex-col gap-2 justify-start px-3'>
              <label htmlFor="author">Title</label>
              <h1 className='px-4 py-3 bg-gray-100 text-sm placeholder:text-gray-500 outline-gray-200 rounded-md'>
                {title}
              </h1>
            </div>
            <div className='flex flex-col gap-2 justify-start px-3'>
              <label htmlFor="author">Author</label>
              <h1 className='px-4 py-3 bg-gray-100 text-sm placeholder:text-gray-500 outline-gray-200 rounded-md'  >
                {author}
              </h1>

            </div>
            <div className='flex flex-col gap-2 justify-start px-3'>
              <label htmlFor="year">Year</label>
              <h1 className='px-4 py-3 bg-gray-100 text-sm placeholder:text-gray-500 outline-gray-200 rounded-md'>
                {publishYear}
              </h1>
            </div>

          </div>

          <div className='w-full px-3'>
            <Link to={-1}>
              <button className='w-full py-3 rounded-md px-3 text-white font-bold bg-blue-500 my-5' >Go Back</button>
            </Link>
          </div>
        </div>

      </div>
    </> : <h1>An error has occured</h1>)
    ,
    document.getElementById("modal")

  )
}


export const DeleteModal = ({ show, setShow, id }) => {
  const {authState} = useAuthContext();
  const { getData } = useDataContext();
  return show && createPortal(

    <div className='fixed flex justify-center items-center w-full h-[100vh] z-50 top-0 bottom-0'>
      <div className='w-full h-[100vh] opacity-50 absolute block bg-black' onClick={() => setShow(false)}>

      </div>

      <div className='w-1/2 absolute bg-white px-4 py-5 rounded-md flex flex-col gap-10 items-center'>

        <h1 >
          Are you sure you want to delete this?
        </h1>

        <div className='flex items-center gap-5 w-full justify-center'>
          <button className='rounded-md px-4 py-3 bg-red-600 text-white' onClick={() => setShow(false)}>
            Cancel
          </button>
          <button className='rounded-md px-4 py-3 bg-green-600 text-white' onClick={() => { deleteBook(id, getData,authState.user.token ); setShow(false) }}>
            Delete
          </button>

        </div>

      </div>
    </div>,
    document.getElementById('modal')

  )
}

export const LoadingModal = ({ loading }) => {

  return loading && createPortal(

    <div className='fixed flex justify-center items-center w-full h-[100vh] z-50 top-0 bottom-0'>
      <div className='w-full h-[100vh] opacity-50 absolute block bg-black'>

      </div>

      <div className=' absolute bg-white px-4 py-5 rounded-md flex flex-col gap-10 items-center '>

        <img src={circleLoading} width={"50px"} alt="loading" />

      </div>
    </div>,
    document.getElementById('modal')

  )
}

export const EditModal = ({ setShow, show, id }) => {
  const { data, getData } = useDataContext()
  const {authState} = useAuthContext();

  console.log(data);

  const currentBook = data?.books?.find((book) => book._id === id);

  if (!currentBook) return;

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [currentBook])


  const [inputs, setInputs] = currentBook && useState({ title: currentBook.title, author: currentBook.author, publishYear: currentBook.publishYear })

  useEffect(() => {
    setInputs(currentBook)
  }, [id])


  const handleChange = (e) => {

    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value })


  }



  const handleSubmit = async (e) => {

    e.preventDefault();

    const { title, author, publishYear, _id } = inputs

    if (!title || !author || !publishYear) {
      toast.error("You're missing something");
      return;
    }

    editBook(id, title, publishYear, author, getData, authState.user.token)

    setShow(false)
  }

  console.log(inputs);




  return ReactDOM.createPortal(

    currentBook ? (show && <>
      <div className='fixed flex justify-center items-center w-full h-[100vh] z-50 top-0 bottom-0'>
        <div className='w-full h-[100vh] opacity-50 absolute block bg-black' onClick={() => setShow(false)}>

        </div>
        <form className='w-1/2 absolute bg-white px-4 py-5 rounded-md' onSubmit={handleSubmit}>
          <div className='flex justify-between items-center my-2 '>
            <h1 className='text-2xl '>
              Edit this Book !
            </h1>

            <span onClick={() => setShow(false)}>
              <FaTimes className='text-2xl cursor-pointer' />
            </span>
          </div>
          {/* Inputs */}
          <div className='flex justify-start flex-col gap-5'>
            <div className='flex flex-col gap-2 justify-start px-3'>
              <label htmlFor="author">Title</label>
              <input type="text" name='title' placeholder='Enter book title' value={inputs.title} className='px-4 py-3 bg-gray-100 text-sm placeholder:text-gray-500 outline-gray-200 rounded-md' onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-2 justify-start px-3'>
              <label htmlFor="author">Author</label>
              <input type="text" name='author' placeholder="Enter book's author" value={inputs.author} className='px-4 py-3 bg-gray-100 text-sm placeholder:text-gray-500 outline-gray-200 rounded-md' onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-2 justify-start px-3'>
              <label htmlFor="author">Year</label>
              <input type="number" name='publishYear' placeholder="Enter the book's year" value={inputs.publishYear} className='px-4 py-3 bg-gray-100 text-sm placeholder:text-gray-500 outline-gray-200 rounded-md' onChange={handleChange} />
            </div>

          </div>

          <div className='w-full px-3'>
            <button type="submit" className='w-full py-3 rounded-md px-3 text-white font-bold bg-blue-500 my-5' >Update Book</button>
          </div>
        </form>

      </div>
    </>) : <LoadingModal loading={loading} />
    ,
    document.getElementById("modal")

  )
}





