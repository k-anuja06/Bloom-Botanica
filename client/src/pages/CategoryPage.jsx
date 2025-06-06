import React, { useEffect, useState } from 'react';
import UploadCategoryModel from '../components/UploadCategoryModel';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import EditCategory from '../components/EditCategory';
import CofirmBox from '../components/CofirmBox';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const CategoryPage = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(null);

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await Axios(SummaryApi.getCategory);
      const { data } = response;

      if (data.success) {
        setCategoryData(data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!deleteCategory?._id) return;
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: { _id: deleteCategory._id },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section>
      {/* Header */}
      <div className='p-2 bg-white shadow-md flex justify-between items-center'>
        <h2 className='font-semibold text-lg'>Category</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'
        >
          Add Category
        </button>
      </div>

      {/* Category Grid */}
      {!loading && categoryData.length === 0 && <NoData />}

      <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {categoryData.map((category) => (
          <div key={category._id} className='w-32 h-56 rounded shadow-md bg-white flex flex-col items-center justify-between p-2'>
            <img
              alt={category.name || 'Category'}
              src={category.image}
              className='w-full h-32 object-contain'
              loading='lazy'
            />
            <div className='text-center text-sm font-medium mt-2 truncate w-full'>{category.name}</div>
            <div className='flex gap-2 mt-2 w-full'>
              <button
                onClick={() => {
                  setOpenEdit(true);
                  setEditData(category);
                }}
                className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 text-sm py-1 rounded'
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setOpenConfirmBoxDelete(true);
                  setDeleteCategory(category);
                }}
                className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 text-sm py-1 rounded'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />
      )}

      {openEdit && editData && (
        <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategory} />
      )}

      {openConfirmBoxDelete && (
        <CofirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;
