import React, { useEffect, useState } from 'react'
import  useAuthContext  from '../hooks/useAuthContext';
import useDataContext from '../hooks/useDataContext'
import axios from 'axios';
import toast from 'react-hot-toast';
import { URL } from '../config/config';

const Settings = () => {

  const payStackUserData = useAuthContext()?.authState?.user?.payStackUserData;
  const userData = useAuthContext()?.authState?.user?.userData;


  if (!payStackUserData || !userData) {
    // Handle the case where payStackUserData is not available
    return <div className=' relative top-[10vh]'>Loading...</div>
  }

  const {authState} = useAuthContext()
  
  const { email, first_name, last_name, customer_code, metadata, identifications, phone } = payStackUserData;
  const { isVerified, account_number, bvn, country, bank } = userData;

  const { bankList, countryList } = useDataContext()

  console.log(countryList);

  const [userProfile, setUserProfile] = useState({ email, first_name, last_name, phone })
  const [error,setError] = useState(null)
  const [userVerification, setUserVerification] = useState({ account_number:account_number, bank:bank, bvn:bvn, account_name: "", country:country , type:"bank_account"})

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUserProfile({ ...userProfile, [name]: value })
  }

  const getBankDetails = async () => {


    try {
      
    
    const data = await axios.get(`https://api.paystack.co/bank/resolve?account_number=${userVerification.account_number}&bank_code=${userVerification.bank}`,
    {
      headers:{
        Authorization:`Bearer sk_live_5479790335103d804effa8749752b79e9ac962f4`
      }
    })


    setUserVerification({...userVerification, account_name:await data.data.data.account_name })
    } catch (error) {

      console.log(error);
      setError(error?.response?.data?.message)
      
    }

  }
  const handleVerificationInput = (e) => {
    const { value, name } = e.target;

    if (name === 'account_number' && value?.toString()?.length >= 11) {
      return
    }

    setUserVerification({ ...userVerification, [name]: value })


  }

  const handleSubmit = async(e)=>{
    e.preventDefault();

 /*    { 
      "country": "NG",
      "type": "bank_account",
      "account_number": "0123456789",
      "bvn": "200123456677",
      "bank_code": "007",
      "first_name": "Asta",
      "last_name": "Lavista"
    } */

    try {
      const {country, type, bvn, bank, account_number} = userVerification
      const {first_name, last_name} = userProfile;

      if(!country || !type || !bank || !account_number || !bvn || !first_name || !last_name) throw Error("Please enter all fields")

      const dataToBeSent = {
        country: country,
        type: type,
        account_number: account_number,
        bvn: bvn,
        bank_code: bank,
        first_name: first_name,
        last_name: last_name
      }

      

      await toast.promise(
         axios.post(`${URL}/api/paystack/validate`, dataToBeSent, {
        headers:{
          Authorization: `Bearer ${authState?.user?.token}`
        }
      }).then((response)=>{
        console.log(response);
      }),
      {
        success: "Success ! Your verification is being processed!",
        loading: "Request is loading...",
        error:"Request failed"
      }
      )

    } catch (error) {

      console.log(error);
      toast.error(error?.message)
      
    }


  }

  useEffect(()=>{

    if(userVerification.bank && userVerification.account_number?.toString().length === 10){
      console.log("WE're good");

      const account_name = getBankDetails()
    
    }


  },[userVerification.bank, userVerification.account_number])

  return (

    
    <div className='w-full h-full flex justify-center flex-col items-center'>
      <form className="w-full max-w-lg px-4 py-5 lg:border-2 lg:px-12 lg:py-12 lg:rounded-md relative h-full top-0 bottom-0 " onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
              First Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"
              name='first_name'
              value={userProfile.first_name}
              onChange={handleChange}
              disabled={isVerified ==="true" && true}

            />
            {false && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Last Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"
              name='last_name'
              value={userProfile.last_name}
              onChange={handleChange}
              required
              disabled={isVerified ==="true" && true}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Email
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="tonto@dikeh.com"
              name='email'
              value={userProfile.email}
              onChange={handleChange}
              required
              disabled={isVerified ==="true" && true}
            />
            <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
          </div>
        </div>
        <div className='my-3 text-red-500'>
          <h6 className='text-xs'> Account verification details</h6>
          <hr />
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Account number
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="number" placeholder="tonto@dikeh.com"
              name='account_number'
              value={userVerification.account_number}
              onChange={handleVerificationInput}
              required
              disabled={isVerified ==="true" && true}
            />

          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Bank
            </label>
            <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="tonto@dikeh.com"
              name='bank'
              value={userVerification.bank}
              onChange={handleVerificationInput}
              required
              disabled={isVerified ==="true" && true}
            >
              {
                bankList?.map((each) => {

                  const { active, name, code } = each


                  return (
                    code && <option value={code} key={code && code}>{name}</option>
                  )

                })
              }
              /</select>

          </div>
         { !error ?<p className='px-3 -mt-3 mb-3'>{userVerification.account_name}</p>:<p className='px-3 text-red-500 -mt-3 mb-3'>{error}</p>
}
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              BVN
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" 
            type="number" placeholder={ isVerified ==="true" && "*********"}
              name='bvn'
              value={ (!(isVerified ==="true") && userVerification.bvn)}
              onChange={handleVerificationInput}
              
              required
              disabled={isVerified ==="true" && true}
              
            />

          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
        
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              Country
            </label>
            <div className="relative">
              <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
              name='country'
              value={userVerification?.country}
              onChange={handleVerificationInput}
              required
              disabled={isVerified ==="true" && true}
              
              >
                <option value="">Select Country</option>
                {
                  countryList?.map((_)=>{
                    const {iso_code, name,active_for_dashboard_onboarding} = _
                    return (
                      active_for_dashboard_onboarding && <option key={iso_code} value={iso_code}>{name}</option>
                    )
                  })
                }
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

        </div>
        <div className='w-full mt-4 '>
          <button   disabled={isVerified ==="true" && true} className='w-full py-2 rounded-md bg-blue-500 text-white' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Settings
