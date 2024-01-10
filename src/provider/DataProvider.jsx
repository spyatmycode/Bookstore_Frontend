import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';
import  useAuthContext  from '../hooks/useAuthContext';
import { URL } from '../config/config';




export const DataContext = createContext();


const DataProvider = ({ children }) => {


  const [data, setData] = useState(null);

  const [sideBar, showSideBar] = useState(false);

  const defaultView = JSON.parse(localStorage.getItem("view")) || false

  const [view, setView ] = useState(defaultView)

  const [bankList, setBankList] = useState(null)
  const [countryList, setCountryList] = useState(null)

  const { authState } = useAuthContext();

  useEffect(()=>{

    localStorage.setItem("view", JSON.stringify(view))

  },[view])





  const getData = async () => {
   try {
    const fetchedData = await axios.get(`${URL}/books`, {
      headers: {
        Authorization: `Bearer ${authState?.user?.token}`
      }
    })

    setData(fetchedData.data);




    const getBanks = await axios.get("https://api.paystack.co/bank",{
      headers:{
        Authorization: 'Bearer sk_live_5479790335103d804effa8749752b79e9ac962f4'
      }
    })

    const getCountries = await axios.get("https://api.paystack.co/country",{
      headers:{
        Authorization: 'Bearer sk_live_5479790335103d804effa8749752b79e9ac962f4'
      }
    })

    setBankList(getBanks.data.data)

    setCountryList(getCountries.data.data)

    
   } catch (error) {

    console.log(error);
    
   }

    

  }





  useEffect(() => {


    getData();


  }, [authState?.user?.token]);

  return (
    <DataContext.Provider value={{ data, setData, getData, view, setView, sideBar, showSideBar, bankList, countryList }}>
      {children}
    </DataContext.Provider>
  )
}



export default DataProvider
