// import React, { useEffect, useRef, useState } from 'react'
// import { FaRegEyeSlash } from "react-icons/fa6";
// import { FaRegEye } from "react-icons/fa6";
// import toast from 'react-hot-toast';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import AxiosToastError from '../utils/AxiosToastError';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const OtpVerification = () => {
//     const [data, setData] = useState(["","","","","",""])
//     const navigate = useNavigate()
//     const inputRef = useRef([])
//     const location = useLocation()

//     console.log("location",location)

//     useEffect(()=>{
//         if(!location?.state?.email){
//             navigate("/forgot-password")
//         }
//     },[])

//     const valideValue = data.every(el => el)

//     const handleSubmit = async(e)=>{
//         e.preventDefault()

//         try {
//             const response = await Axios({
//                 ...SummaryApi.forgot_password_otp_verification,
//                 data : {
//                     otp : data.join(""),
//                     email : location?.state?.email
//                 }
//             })
            
//             if(response.data.error){
//                 toast.error(response.data.message)
//             }

//             if(response.data.success){
//                 toast.success(response.data.message)
//                 setData(["","","","","",""])
//                 navigate("/reset-password",{
//                     state : {
//                         data : response.data,
//                         email : location?.state?.email
//                     }
//                 })
//             }

//         } catch (error) {
//             console.log('error',error)
//             AxiosToastError(error)
//         }



//     }

//     return (
//         <section className='w-full container mx-auto px-2'>
//             <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
//                 <p className='font-semibold text-lg'>Enter OTP</p>
//                 <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
//                     <div className='grid gap-1'>
//                         <label htmlFor='otp'>Enter Your OTP :</label>
//                         <div className='flex items-center gap-2 justify-between mt-3'>
//                             {
//                                 data.map((element,index)=>{
//                                     return(
//                                         <input
//                                             key={"otp"+index}
//                                             type='text'
//                                             id='otp'
//                                             ref={(ref)=>{
//                                                 inputRef.current[index] = ref
//                                                 return ref 
//                                             }}
//                                             value={data[index]}
//                                             onChange={(e)=>{
//                                                 const value =  e.target.value
//                                                 console.log("value",value)

//                                                 const newData = [...data]
//                                                 newData[index] = value
//                                                 setData(newData)

//                                                 if(value && index < 5){
//                                                     inputRef.current[index+1].focus()
//                                                 }


//                                             }}
//                                             maxLength={1}
//                                             className='bg-green-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold'
//                                         />
//                                     )
//                                 })
//                             }
//                         </div>
                        
//                     </div>
             
//                     <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }    text-white py-2 rounded font-semibold my-3 tracking-wide`}>Verify OTP</button>

//                 </form>

//                 <p>
//                     Already have account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
//                 </p>
//             </div>
//         </section>
//     )
// }

// export default OtpVerification

import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'

const OtpVerification = () => {
    const [data, setData] = useState(["", "", "", "", "", ""])
    const navigate = useNavigate()
    const inputRef = useRef([])
    const location = useLocation()

    useEffect(() => {
        if (!location?.state?.email) {
            navigate("/forgot-password")
        }
    }, [location, navigate])

    const valideValue = data.every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data: {
                    otp: data.join(""),
                    email: location?.state?.email
                }
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }

            if (response.data.success) {
                toast.success(response.data.message)
                setData(["", "", "", "", "", ""])
                navigate("/reset-password", {
                    state: {
                        data: response.data,
                        email: location?.state?.email
                    }
                })
            }

        } catch (error) {
            console.log('error', error)
            AxiosToastError(error)
        }
    }

    const handleChange = (e, index) => {
        const { value } = e.target
        // Only allow digits
        if (!/^\d*$/.test(value)) return

        const newData = [...data]
        newData[index] = value
        setData(newData)

        // Move to next field if filled
        if (value && index < data.length - 1) {
            inputRef.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (data[index] === "") {
                // Move to previous input
                if (index > 0) {
                    inputRef.current[index - 1]?.focus()
                }
            }
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('Text')
        if (!/^\d+$/.test(pastedData)) return

        const otpArray = pastedData.split('').slice(0, data.length)
        const newData = [...data]

        otpArray.forEach((num, idx) => {
            newData[idx] = num
        })

        setData(newData)

        // Move focus to last filled input
        const nextIndex = otpArray.length >= data.length ? data.length - 1 : otpArray.length
        inputRef.current[nextIndex]?.focus()
    }

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='font-semibold text-lg'>Enter OTP</p>
                <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='otp'>Enter Your OTP :</label>
                        <div className='flex items-center gap-2 justify-between mt-3'>
                            {
                                data.map((element, index) => {
                                    return (
                                        <input
                                            key={"otp" + index}
                                            type='text'
                                            id='otp'
                                            ref={(ref) => inputRef.current[index] = ref}
                                            value={element}
                                            onChange={(e) => handleChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            onPaste={handlePaste}
                                            maxLength={1}
                                            className='bg-green-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold text-lg'
                                        />
                                    )
                                })
                            }
                        </div>

                    </div>

                    <button disabled={!valideValue} className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}>Verify OTP</button>

                </form>

                <p>
                    Already have account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default OtpVerification




