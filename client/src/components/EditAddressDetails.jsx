import React from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { IoClose } from "react-icons/io5"
import { useGlobalContext } from '../provider/GlobalProvider'

const EditAddressDetails = ({ close, data }) => {
  const { fetchAddress } = useGlobalContext()

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      _id: data._id,
      userId: data.userId,
      address_line: data.address_line,
      city: data.city,
      state: data.state,
      country: data.country,
      pincode: data.pincode,
      mobile: data.mobile,
    }
  })

  const onSubmit = async (formData) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateAddress,
        data: formData,
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        reset()
        fetchAddress()
        close?.()
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="fixed inset-0 z-50 bg-black bg-opacity-70 h-screen overflow-auto flex items-start justify-center pt-8">
      <div className="bg-white w-full max-w-lg p-6 rounded shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Address</h2>
          <button onClick={close} className="hover:text-red-500">
            <IoClose size={25} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            { label: 'Address Line', name: 'address_line' },
            { label: 'City', name: 'city' },
            { label: 'State', name: 'state' },
            { label: 'Pincode', name: 'pincode' },
            { label: 'Country', name: 'country' },
            { label: 'Mobile No.', name: 'mobile' },
          ].map(({ label, name }) => (
            <div key={name} className="grid gap-1">
              <label htmlFor={name}>{label}:</label>
              <input
                id={name}
                type="text"
                {...register(name, { required: true })}
                className="border bg-green-50 p-2 rounded w-full"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-2 bg-primary-200 font-semibold hover:bg-primary-100 transition-colors rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}

export default EditAddressDetails
