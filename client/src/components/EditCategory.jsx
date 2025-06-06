import React, { useState } from 'react'
import { IoClose } from "react-icons/io5"
import uploadImage from '../utils/UploadImage'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const EditCategory = ({ close, fetchData, data: categoryData }) => {
  const [formData, setFormData] = useState({
    _id: categoryData._id,
    name: categoryData.name || '',
    image: categoryData.image || ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.image) {
      toast.error("Please fill in all fields.")
      return
    }

    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.updateCategory,
        data: formData
      })
      const { data: res } = response

      if (res.success) {
        toast.success(res.message)
        fetchData?.()
        close?.()
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setLoading(true)
      const response = await uploadImage(file)
      const { data: imageRes } = response
      setFormData(prev => ({ ...prev, image: imageRes.data.url }))
    } catch (error) {
      toast.error("Image upload failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="fixed inset-0 z-50 p-4 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">Update Category</h1>
          <button onClick={close} className="hover:text-red-500">
            <IoClose size={25} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-1">
            <label htmlFor="categoryName" className="font-medium">Name</label>
            <input
              type="text"
              id="categoryName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter category name"
              className="bg-green-50 p-2 border rounded focus:border-primary-200 outline-none disabled:cursor-not-allowed"
            />
          </div>

          <div className="grid gap-2">
            <label className="font-medium">Image</label>
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="h-36 w-full lg:w-36 bg-green-50 border rounded flex items-center justify-center overflow-hidden">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="category"
                    title="Category Image"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-neutral-500 text-sm">No Image</span>
                )}
              </div>
              <label htmlFor="uploadImage">
                <div
                  className={`px-4 py-2 rounded font-medium text-center border cursor-pointer transition-colors
                  ${formData.name
                      ? "border-primary-200 hover:bg-primary-100"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Uploading..." : "Upload Image"}
                </div>
                <input
                  type="file"
                  id="uploadImage"
                  onChange={handleImageUpload}
                  disabled={!formData.name || loading}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!formData.name || !formData.image || loading}
            className={`w-full py-2 font-semibold rounded transition-colors
              ${formData.name && formData.image && !loading
                ? "bg-primary-200 hover:bg-primary-100"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {loading ? "Updating..." : "Update Category"}
          </button>
        </form>
      </div>
    </section>
  )
}

export default EditCategory
