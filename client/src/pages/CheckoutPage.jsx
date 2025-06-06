import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import AddAddress from '../components/AddAddress';
import { useSelector } from 'react-redux';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder } = useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const [selectAddress, setSelectAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);
  const [addressListState, setAddressListState] = useState([]);
  const cartItemsList = useSelector((state) => state.cartItem.cart);
  const navigate = useNavigate();
  const reduxAddressList = useSelector((state) => state.addresses.addressList);

  useEffect(() => {
    // Simulating fetch delay if redux already populated
    setAddressLoading(true);
    const timeout = setTimeout(() => {
      setAddressListState(reduxAddressList);
      setAddressLoading(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, [reduxAddressList]);

  const handleCashOnDelivery = async () => {
    if (selectAddress === null || !addressListState[selectAddress]) {
      return toast.error('Please select a valid address');
    }

    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: addressListState[selectAddress]._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchCartItem?.();
        fetchOrder?.();
        navigate('/success', { state: { text: 'Order' } });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleOnlinePayment = async () => {
    if (selectAddress === null || !addressListState[selectAddress]) {
      return toast.error('Please select a valid address');
    }

    const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
    const stripePromise = await loadStripe(stripePublicKey);

    toast.promise(
      Axios({
        ...SummaryApi.payment_url,
        data: {
          list_items: cartItemsList,
          addressId: addressListState[selectAddress]._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      }),
      {
        loading: 'Redirecting to payment...',
        success: async (response) => {
          await stripePromise.redirectToCheckout({ sessionId: response.data.id });
          fetchCartItem?.();
          fetchOrder?.();
          return 'Redirected to Stripe';
        },
        error: (err) => AxiosToastError(err),
      }
    );
  };

  return (
    <section className='bg-green-50 min-h-screen overflow-y-auto overflow-x-hidden'>
      <div className='container mx-auto p-4 flex flex-col lg:flex-row gap-5'>
        {/* Address Selection */}
        <div className='w-full'>
          <h3 className='text-lg font-semibold mb-2'>Choose your address</h3>
          <div className='bg-white p-4 rounded shadow-md space-y-4 min-h-[200px]'>
            {addressLoading ? (
              <>
                {[...Array(2)].map((_, idx) => (
                  <div key={idx} className='h-20 bg-gray-100 animate-pulse rounded'></div>
                ))}
              </>
            ) : addressListState.length === 0 ? (
              <p className='text-gray-500 text-center'>No address found. Please add one.</p>
            ) : (
              addressListState.map((address, index) => (
                address.status && (
                  <label key={address._id} htmlFor={`address${index}`} className='block cursor-pointer'>
                    <div className={`border rounded p-3 flex gap-3 hover:bg-green-50 ${selectAddress === index ? 'border-green-600' : ''}`}>
                      <input
                        type='radio'
                        id={`address${index}`}
                        name='address'
                        value={index}
                        checked={selectAddress === index}
                        onChange={() => setSelectAddress(index)}
                      />
                      <div>
                        <p>{address.address_line}</p>
                        <p>{address.city}, {address.state}</p>
                        <p>{address.country} - {address.pincode}</p>
                        <p>Mobile: {address.mobile}</p>
                      </div>
                    </div>
                  </label>
                )
              ))
            )}

            <div
              onClick={() => setOpenAddress(true)}
              className='h-16 bg-green-50 border-2 border-dashed flex justify-center items-center cursor-pointer rounded text-green-700 font-medium'
            >
              + Add new address
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className='w-full max-w-md bg-white py-4 px-5 rounded shadow-md'>
          <h3 className='text-lg font-semibold mb-4'>Summary</h3>
          <div className='space-y-3 text-sm'>
            <div className='flex justify-between'>
              <span>Items total</span>
              <span>
                <span className='line-through text-gray-400 mr-2'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                <span>{DisplayPriceInRupees(totalPrice)}</span>
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Quantity</span>
              <span>{totalQty} item{totalQty > 1 ? 's' : ''}</span>
            </div>
            <div className='flex justify-between'>
              <span>Delivery Charge</span>
              <span>Free</span>
            </div>
            <div className='flex justify-between font-semibold border-t pt-3'>
              <span>Grand Total</span>
              <span>{DisplayPriceInRupees(totalPrice)}</span>
            </div>
          </div>

          {/* Payment Options */}
          <div className='mt-6 space-y-3'>
            <button
              onClick={handleOnlinePayment}
              disabled={selectAddress === null || addressLoading}
              className={`w-full py-2 px-4 font-semibold rounded ${
                selectAddress === null || addressLoading
                  ? 'bg-green-200 text-white cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              Pay with Card / UPI
            </button>
            <button
              onClick={handleCashOnDelivery}
              disabled={selectAddress === null || addressLoading}
              className={`w-full py-2 px-4 font-semibold rounded border-2 ${
                selectAddress === null || addressLoading
                  ? 'border-green-200 text-green-300 cursor-not-allowed'
                  : 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
              }`}
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;
