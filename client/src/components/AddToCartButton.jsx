import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ data }) => {
  const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector(state => state.cartItem.cart);

  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetails, setCartItemDetails] = useState();

  useEffect(() => {
    const product = cartItem.find(item => item.productId?._id === data?._id);
    setIsAvailableCart(!!product);
    setQty(product?.quantity || 0);
    setCartItemDetails(product);
  }, [data, cartItem]);

  const handleADDTocart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addTocart,
        data: { productId: data?._id }
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem?.();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cartItemDetails?._id) return;

    const response = await updateCartItem(cartItemDetails._id, qty + 1);
    if (response.success) {
      toast.success("Item added");
    }
  };

  const decreaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cartItemDetails?._id) return;

    if (qty === 1) {
      deleteCartItem(cartItemDetails._id);
    } else {
      const response = await updateCartItem(cartItemDetails._id, qty - 1);
      if (response.success) {
        toast.success("Item removed");
      }
    }
  };

  return (
    <div className='w-full max-w-[150px]'>
      {isAvailableCart ? (
        <div className='flex w-full h-full gap-1'>
          <button
            onClick={decreaseQty}
            disabled={loading}
            className='border border-green-600 text-green-600 hover:bg-green-600 hover:text-white flex-1 p-1 rounded flex items-center justify-center transition-colors disabled:opacity-50'
          >
            <FaMinus />
          </button>
          <p className='flex-1 font-semibold px-1 flex items-center justify-center'>{qty}</p>
          <button
            onClick={increaseQty}
            disabled={loading}
            className='border border-green-600 text-green-600 hover:bg-green-600 hover:text-white flex-1 p-1 rounded flex items-center justify-center transition-colors disabled:opacity-50'
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleADDTocart}
          disabled={loading}
          className='border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-2 lg:px-4 py-1 rounded transition-colors w-full disabled:opacity-50'
        >
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  );
};

export default React.memo(AddToCartButton);
