import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';

import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';

const EditProductAdmin = ({ close, data: propsData, fetchProductData }) => {
  const [data, setData] = useState({
    _id: propsData._id,
    name: propsData.name,
    image: propsData.image || [],
    category: propsData.category || [],
    subCategory: propsData.subCategory || [],
    unit: propsData.unit,
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {},
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");

  const allCategory = useSelector(state => state.product.allCategory);
  const allSubCategory = useSelector(state => state.product.allSubCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageLoading(true);
    try {
      const response = await uploadImage(file);
      const imageUrl = response?.data?.data?.url;
      if (imageUrl) {
        setData(prev => ({ ...prev, image: [...prev.image, imageUrl] }));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setImageLoading(false);
    }
  };

  const handleDeleteImage = (index) => {
    setData(prev => {
      const newImages = [...prev.image];
      newImages.splice(index, 1);
      return { ...prev, image: newImages };
    });
  };

  const handleRemoveCategory = (index) => {
    setData(prev => {
      const newCategory = [...prev.category];
      newCategory.splice(index, 1);
      return { ...prev, category: newCategory };
    });
  };

  const handleRemoveSubCategory = (index) => {
    setData(prev => {
      const newSubCategory = [...prev.subCategory];
      newSubCategory.splice(index, 1);
      return { ...prev, subCategory: newSubCategory };
    });
  };

  const handleAddField = () => {
    if (!fieldName) return;
    setData(prev => ({
      ...prev,
      more_details: { ...prev.more_details, [fieldName]: "" }
    }));
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({ ...SummaryApi.updateProductDetails, data });
      const responseData = response?.data;

      if (responseData?.success) {
        successAlert(responseData.message);
        close?.();
        fetchProductData?.();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className='fixed inset-0 bg-black bg-opacity-70 z-50 p-4'>
      <div className='bg-white w-full max-w-2xl h-full max-h-[95vh] mx-auto rounded overflow-y-auto p-4'>
        <div className='flex justify-between items-center p-2 shadow-md bg-white'>
          <h2 className='font-semibold'>Upload Product</h2>
          <button onClick={close}><IoClose size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className='grid gap-4 p-3'>
          <InputField id="name" label="Name" name="name" value={data.name} onChange={handleChange} />
          <TextareaField id="description" label="Description" name="description" value={data.description} onChange={handleChange} />

          {/* Image Upload Section */}
          <div className='grid gap-1'>
            <label className='font-medium'>Image</label>
            <label htmlFor='productImage' className='bg-green-50 h-24 border rounded flex justify-center items-center cursor-pointer'>
              {imageLoading ? <Loading /> : <UploadPlaceholder />}
              <input id='productImage' type='file' accept='image/*' onChange={handleUploadImage} className='hidden' />
            </label>

            <div className='flex flex-wrap gap-4'>
              {data.image.map((img, i) => (
                <ImageThumbnail key={img + i} src={img} onDelete={() => handleDeleteImage(i)} onView={() => setViewImageURL(img)} />
              ))}
            </div>
          </div>

          <SelectList
            label="Category"
            value={selectCategory}
            options={allCategory}
            onChange={(e) => {
              const selected = allCategory.find(c => c._id === e.target.value);
              if (selected) {
                setData(prev => ({ ...prev, category: [...prev.category, selected] }));
              }
              setSelectCategory("");
            }}
            selectedItems={data.category}
            onRemove={handleRemoveCategory}
          />

          <SelectList
            label="Sub Category"
            value={selectSubCategory}
            options={allSubCategory}
            onChange={(e) => {
              const selected = allSubCategory.find(c => c._id === e.target.value);
              if (selected) {
                setData(prev => ({ ...prev, subCategory: [...prev.subCategory, selected] }));
              }
              setSelectSubCategory("");
            }}
            selectedItems={data.subCategory}
            onRemove={handleRemoveSubCategory}
          />

          <InputField id="unit" label="Unit" name="unit" value={data.unit} onChange={handleChange} />
          <InputField id="stock" label="Number of Stock" name="stock" type="number" value={data.stock} onChange={handleChange} />
          <InputField id="price" label="Price" name="price" type="number" value={data.price} onChange={handleChange} />
          <InputField id="discount" label="Discount" name="discount" type="number" value={data.discount} onChange={handleChange} />

          {/* More Fields */}
          {Object.entries(data.more_details).map(([key, value]) => (
            <InputField key={key} id={key} label={key} value={value} onChange={(e) => {
              const val = e.target.value;
              setData(prev => ({
                ...prev,
                more_details: { ...prev.more_details, [key]: val }
              }));
            }} />
          ))}

          <div onClick={() => setOpenAddField(true)} className='w-32 py-1 px-3 text-center font-semibold border rounded bg-white hover:bg-primary-200 cursor-pointer'>
            Add Fields
          </div>

          <button type='submit' className='bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold'>
            Update Product
          </button>
        </form>

        {viewImageURL && <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />}
        {openAddField && (
          <AddFieldComponent
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleAddField}
            close={() => setOpenAddField(false)}
          />
        )}
      </div>
    </section>
  );
};

const InputField = ({ id, label, ...props }) => (
  <div className='grid gap-1'>
    <label htmlFor={id} className='font-medium'>{label}</label>
    <input id={id} {...props} className='bg-green-50 p-2 outline-none border rounded' required />
  </div>
);

const TextareaField = ({ id, label, ...props }) => (
  <div className='grid gap-1'>
    <label htmlFor={id} className='font-medium'>{label}</label>
    <textarea id={id} rows={3} {...props} className='bg-green-50 p-2 outline-none border rounded resize-none' required />
  </div>
);

const UploadPlaceholder = () => (
  <div className='text-center flex flex-col items-center'>
    <FaCloudUploadAlt size={35} />
    <p>Upload Image</p>
  </div>
);

const ImageThumbnail = ({ src, onDelete, onView }) => (
  <div className='h-20 w-20 bg-green-50 border relative group'>
    <img src={src} alt="Product" className='w-full h-full object-scale-down cursor-pointer' onClick={onView} />
    <div onClick={onDelete} className='absolute bottom-0 right-0 p-1 bg-red-600 text-white rounded hidden group-hover:block cursor-pointer'>
      <MdDelete />
    </div>
  </div>
);

const SelectList = ({ label, value, options, onChange, selectedItems, onRemove }) => (
  <div className='grid gap-1'>
    <label className='font-medium'>{label}</label>
    <select className='bg-green-50 border w-full p-2 rounded' value={value} onChange={onChange}>
      <option value="">Select {label}</option>
      {options.map(opt => <option key={opt._id} value={opt._id}>{opt.name}</option>)}
    </select>
    <div className='flex flex-wrap gap-3 mt-2'>
      {selectedItems.map((item, index) => (
        <div key={`${item._id}-${index}`} className='text-sm flex items-center gap-1 bg-green-50 p-1 rounded'>
          <span>{item.name}</span>
          <IoClose size={18} className='cursor-pointer hover:text-red-500' onClick={() => onRemove(index)} />
        </div>
      ))}
    </div>
  </div>
);

export default EditProductAdmin;
