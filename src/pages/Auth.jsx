
import React, { useEffect, useState } from 'react'
import illustration from '../assets/Photos-bro (1).svg'
import { FaEye } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSignUp } from '../hooks/useSignUp'
import { useLogIn } from '../hooks/useLogin'
import loader from '../assets/circleLoading.gif'


const SignIn = ({ toggle }) => {



    const navigate = useNavigate();

    const { login, loading, error } = useLogIn();



    const [signInInputs, setSignInInputs] = useState({ password: "", email: "" })
    const [viewPWD, setViewPWD] = useState(false)

    const handleChange = (e) => {
        setSignInInputs({ ...signInInputs, [e.target.name]: e.target.value })

    }

    const location = useLocation()

    const from = location.state?.from?.pathname || "/"

    const handleSignIn = async (e) => {

        e.preventDefault();

        try {
            if (!signInInputs.email || !signInInputs.password) {
                throw Error("Please enter all required fields");
            }

            await login(signInInputs.email, signInInputs.password);

            navigate("/")

            console.log(signInInputs);

        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }



    }


    return (
        <form className='w-full bg-white h-full py-5' onSubmit={(e) => handleSignIn(e)}>

            <div className='w-full flex justify-end items-center gap-10 pr-10 pt-4 pb-10'>
                <p className='font-medium  text-gray-300 text-sm'>Don't have an account?</p>
                <button className=' uppercase rounded-full  border-2 text-xs  text-gray-300 border-gray-300 font-bold px-3 py-1' onClick={() => toggle(true)}>
                    Sign up
                </button>
            </div>

            <div className='px-[10%] py-5'>
                <h1 className='font-extrabold text-2xl'>Welcome to your Galeria!</h1>
                <p className='font-medium text-lg text-gray-300'>Sign into your account</p>
            </div>

            <div className='px-[10%] flex flex-col gap-5'>

                <div className='w-full  flex flex-col gap-2'>
                    <label htmlFor="name" className='font-medium text-xl'>Email</label>
                    <input type="email" className='text-black  border-[#2A69CE]  p-2 border-2 rounded-md w-full outline-[#92B5E3]' placeholder='johndoe@email.com' name='email' onChange={(e) => handleChange(e)} value={signInInputs.email} />

                </div>
                <div className='w-full  flex flex-col gap-2'>
                    <label htmlFor="name" className='font-medium text-xl'>Password</label>
                    <span className='relative flex items-center'>
                        <input type={viewPWD ? "text" : "password"} className='text-black  border-[#2A69CE]  p-2 border-2 rounded-md w-full outline-[#92B5E3]' placeholder='Enter password' name='password' onChange={(e) => handleChange(e)} value={signInInputs.password} />
                        <FaEye className="absolute right-6 text-gray-300 cursor-pointer" onClick={() => setViewPWD(!viewPWD)
                        } />
                    </span>

                </div>


                <div className=''>
                    {!loading ? <button className='rounded-full px-11 font-semibold py-3 shadow-lg bg-[#2A69CE] text-white'>
                        Login
                    </button> :
                        <button className='rounded-full px-11 font-semibold py-3 shadow-lg bg-[#2A69CE] text-white'>
                            <img src={loader} className="w-10 h-10" alt="" />
                        </button>
                    }
                </div>
            </div>

        </form>
    )

}

const SignUp = ({ toggle }) => {

    const navigate = useNavigate()

    const { signup, loading, error } = useSignUp()



    const [signupInputs, setSignUpInputs] = useState({first_name:"",last_name:"", password: "", email: "", phone:null })
    const [viewPWD, setViewPWD] = useState(false)

    const handleChange = (e) => {

        const {name, value} = e.target;

        if(name === "phone" && value.toString().length > 11 ){
            
            alert("Phone number can only be a max of 11 digits")
            return ;
        }

        setSignUpInputs({ ...signupInputs, [e.target.name]: e.target.value })

    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            if (!signupInputs.email || !signupInputs.password || !signupInputs.first_name || !signupInputs.phone || !signupInputs.last_name) {
                throw Error("Please input all the required fields")
            };
            
            await signup(signupInputs.email, signupInputs.password, signupInputs.first_name, signupInputs.last_name, signupInputs.phone);
            navigate("/")

            console.log(signupInputs);
        } catch (error) {

            console.log(error);
            toast.error(error.message)

        }


    }



    console.log(signupInputs)
    return (
        <form className='w-full bg-white h-full py-5' onSubmit={handleSignUp}>

            <div className='w-full flex justify-end items-center gap-10 pr-10 pt-4 pb-10'>
                <p className='font-medium  text-gray-300 text-sm'>Already have an account?</p>
                <button className=' uppercase rounded-full  border-2 text-xs  text-gray-300 border-gray-300 font-bold px-3 py-1' onClick={() => toggle(false)}>
                    Sign In
                </button>
            </div>

            <div className='px-[10%] py-5'>
                <h1 className='font-extrabold text-2xl'>Welcome to your Galeria!</h1>
                <p className='font-medium text-lg text-gray-300'>Register your account</p>
            </div>

            <div className='px-[10%] flex flex-col gap-5'>
                <div className='w-full  flex flex-col gap-2'>
                    <label htmlFor="name" className='font-medium text-xl'>First Name</label>
                    <input type="text" className='text-black  border-[#2A69CE]  p-2 border-2 rounded-md w-full outline-[#92B5E3]' placeholder='John Doe' name='first_name' onChange={(e) => handleChange(e)} value={signupInputs.first_name} required />

                </div>
                <div className='w-full  flex flex-col gap-2'>
                    <label htmlFor="name" className='font-medium text-xl'>Last Name</label>
                    <input type="text" className='text-black  border-[#2A69CE]  p-2 border-2 rounded-md w-full outline-[#92B5E3]' placeholder='John Doe' name='last_name' onChange={(e) => handleChange(e)} value={signupInputs.last_name} required/>

                </div>
                <div className='w-full  flex flex-col gap-2'>
                    <label htmlFor="name" className='font-medium text-xl'>Phone Number</label>
                    <input type="number" className='text-black  border-[#2A69CE]  p-2 border-2 rounded-md w-full outline-[#92B5E3]' maxLength={"10"} placeholder='08123456789' name='phone' onChange={(e) => handleChange(e)} value={signupInputs.phone} required/>

                </div>

                <div className='w-full  flex flex-col gap-2'>
                    <label htmlFor="name" className='font-medium text-xl'>Email</label>
                    <input type="email" className='text-black  border-[#2A69CE]  p-2 border-2 rounded-md w-full outline-[#92B5E3]' placeholder='johndoe@email.com' name='email' onChange={(e) => handleChange(e)} value={signupInputs.email} required/>

                </div>
                <div className='w-full  flex flex-col gap-2'>
                    <label htmlFor="name" className='font-medium text-xl'>Password</label>
                    <span className='relative flex items-center'>
                        <input type={viewPWD ? "text" : "password"} className='text-black  border-[#2A69CE]  p-2 border-2 rounded-md w-full outline-[#92B5E3]' placeholder='Enter password' name='password' onChange={(e) => handleChange(e)} value={signupInputs.password} />
                        <FaEye className="absolute right-6 text-gray-300 cursor-pointer" onClick={() => setViewPWD(!viewPWD)
                        } required/>
                    </span>

                </div>


                <div className=''>
                    {!loading ? <button className='rounded-full px-11 font-semibold py-3 shadow-lg bg-[#2A69CE] text-white'>
                        Sign up
                    </button> :
                        <button className='rounded-full px-11 font-semibold py-3 shadow-lg bg-[#2A69CE] text-white'>
                            <img src={loader} className="w-10 h-10" alt="" />
                        </button>
                    }
                </div>
            </div>

        </form>
    )
}

const RenderAuth = () => {
    const lsShowSignUp = localStorage.getItem("lsShowSignUp") ? JSON.parse(localStorage.getItem("lsShowSignUp")) : false
    const [showSignUp, setShowSignUp] = useState(lsShowSignUp)

    useEffect(()=>{

        localStorage.setItem("lsShowSignUp", showSignUp)

    }, [showSignUp])
    
    return (
        <div className="w-full h-screen flex justify-center items-center bg-[#ebeaee]">

            <div className={`flex ${showSignUp &&  "lg:h-auto"} ${!showSignUp &&  "lg:h-5/6"}  lg:w-2/3 w-full h-full lg:shadow-lg`}>
                <div className='hidden bg-[#98c1f739] w-2/5 lg:flex justify-center items-center'>
                    <img src={illustration} className='' alt="" width={"350px"} />
                </div>

                <div className='lg:w-3/5 w-full'>
                    {showSignUp ? <SignUp toggle={setShowSignUp} /> : <SignIn toggle={setShowSignUp} />}
                </div>
            </div>




        </div>
    )
}

export default RenderAuth
// 92B5E3