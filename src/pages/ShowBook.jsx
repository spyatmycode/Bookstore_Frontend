import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { DetailsModal, LoadingModal } from '../components/Modals';
import useAuthContext  from '../hooks/useAuthContext';
import { URL } from '../config/config';

const ShowBook = () => {
  const {id} = useParams();

  const {authState} = useAuthContext();

  const [loading, setLoading] = useState(true);

  const [pageData, setPageData] = useState(null)

  useEffect(() => {
    const getBookData = async()=>{
      await axios.get(`${URL}/books/${id}`,{
        headers:{
          Authorization:`Bearer ${authState.user.token}`
        }

      })
      .then((res)=>{
        setPageData(res.data);
        setLoading(false)
      }).catch((err)=>{
        console.log(err);
      })
    }

    getBookData()
  }, []);



  return (
    loading ? <LoadingModal loading={loading}/>: <DetailsModal data={pageData}/>
    
  )
}

export default ShowBook
