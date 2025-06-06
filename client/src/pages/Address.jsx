import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddAddress from '../components/AddAddress';
import { MdDelete, MdEdit } from "react-icons/md";
import EditAddressDetails from '../components/EditAddressDetails';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider';

const Address = () => {
  const addressList = useSelector(state => state.addresses.addressList);
  const [openAddress, setOpenAddress] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const { fetchAddress } = useGlobalContext();

  const handleDisableAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data: { _id: id }
      });

      if (response.data.success) {
        toast.success("Address removed");
        fetchAddress?.();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleEditClick = (address) => {
    setEditData(address);
    setOpenEdit(true);
  };

  return (
    <div>
      <div className='bg-white shadow-lg px-4 py-3 flex justify-between items-center'>
        <h2 className='font-semibold text-lg'>Saved Addresses</h2>
        <button
          onClick={() => setOpenAddress(true)}
          className='border border-primary-200 text-primary-200 px-3 py-1 rounded-full hover:bg-primary-200 hover:text-black transition'
        >
          Add Address
        </button>
      </div>

      <div className='bg-green-50 p-4 grid gap-4'>
        {addressList
          .filter(address => address.status)
          .map((address, index) => (
            <div key={address._id} className='bg-white border rounded p-4 flex justify-between items-start'>
              <div className='text-sm leading-relaxed'>
                <p>{address.address_line}</p>
                <p>{address.city}, {address.state}</p>
                <p>{address.country} - {address.pincode}</p>
                <p>Mobile: {address.mobile}</p>
              </div>
              <div className='flex flex-col gap-2 items-center'>
                <button
                  onClick={() => handleEditClick(address)}
                  className='bg-green-200 p-2 rounded hover:bg-green-600 hover:text-white transition'
                  title="Edit Address"
                >
                  <MdEdit size={18} />
                </button>
                <button
                  onClick={() => handleDisableAddress(address._id)}
                  className='bg-red-200 p-2 rounded hover:bg-red-600 hover:text-white transition'
                  title="Remove Address"
                >
                  <MdDelete size={18} />
                </button>
              </div>
            </div>
          ))
        }

        <div
          onClick={() => setOpenAddress(true)}
          className='h-16 bg-green-50 border-2 border-dashed flex justify-center items-center cursor-pointer hover:bg-green-100 transition rounded'
        >
          + Add New Address
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
      {openEdit && <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />}
    </div>
  );
};

export default Address;
