import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { updatedAvatar } from '../store/userSlice';
import { IoClose } from 'react-icons/io5';

const UserProfileAvatarEdit = ({ close }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });
      const { data: responseData } = response;
      dispatch(updatedAvatar(responseData.data.avatar));
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center z-50">
      <div className="bg-white max-w-sm w-full rounded p-4 relative">
        <button onClick={close} className="absolute top-3 right-3 text-neutral-800">
          <IoClose size={20} />
        </button>

        <div className="flex flex-col items-center justify-center mt-4">
          <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
            {user.avatar ? (
              <img
                alt={user.name || 'User Avatar'}
                src={user.avatar}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaRegUserCircle size={65} />
            )}
          </div>

          <label htmlFor="uploadProfile" className="mt-4 w-fit">
            <div
              className={`border border-primary-200 px-4 py-1 rounded text-sm cursor-pointer transition ${
                loading ? 'bg-gray-200 text-neutral-500 cursor-not-allowed' : 'hover:bg-primary-200'
              }`}
            >
              {loading ? 'Uploading...' : 'Upload Avatar'}
            </div>
            <input
              type="file"
              id="uploadProfile"
              className="hidden"
              onChange={handleUploadAvatarImage}
              disabled={loading}
            />
          </label>
        </div>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
