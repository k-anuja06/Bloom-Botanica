import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Divider from './Divider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { logout } from '../store/userSlice';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { HiOutlineExternalLink } from 'react-icons/hi';
import isAdmin from '../utils/isAdmin';

const UserMenu = ({ close }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUserAdmin = isAdmin(user.role);

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout });
      if (response.data.success) {
        close?.();
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate('/');
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => close?.();

  const adminLinks = [
    { to: '/dashboard/category', label: 'Category' },
    { to: '/dashboard/subcategory', label: 'Sub Category' },
    { to: '/dashboard/upload-product', label: 'Upload Product' },
    { to: '/dashboard/product', label: 'Product' }
  ];

  const userLinks = [
    { to: '/dashboard/myorders', label: 'My Orders' },
    { to: '/dashboard/address', label: 'Save Address' }
  ];

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile}
          {isUserAdmin && <span className="text-medium text-red-600"> (Admin)</span>}
        </span>
        <Link onClick={handleClose} to="/dashboard/profile" className="hover:text-primary-200">
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>

      <Divider />

      <div className="text-sm grid gap-1">
        {isUserAdmin &&
          adminLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={handleClose}
              className="px-2 hover:bg-orange-200 py-1"
            >
              {link.label}
            </Link>
          ))}

        {userLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            onClick={handleClose}
            className="px-2 hover:bg-orange-200 py-1"
          >
            {link.label}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="text-left px-2 hover:bg-orange-200 py-1"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
