import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from "react-icons/fa"
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import imageEmpty from '../assets/empty_cart.webp'
import toast from 'react-hot-toast'

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
  const cartItem = useSelector(state => state.cartItem.cart)
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      navigate("/checkout")
      close?.()
    } else {
      toast("Please Login")
    }
  }

  return (
    <section className="fixed inset-0 bg-neutral-900 bg-opacity-70 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 shadow-md gap-3">
          <h2 className="font-semibold">Cart</h2>
          <Link to="/" className="lg:hidden">
            <IoClose size={25} />
          </Link>
          <button onClick={close} className="hidden lg:block">
            <IoClose size={25} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="min-h-[75vh] lg:min-h-[80vh] max-h-[calc(100vh-150px)] bg-green-50 p-2 flex flex-col gap-4 overflow-y-auto">
          {cartItem?.length > 0 ? (
            <>
              {/* Savings Banner */}
              <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full">
                <p>Your total savings</p>
                <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
              </div>

              {/* Cart Items */}
              <div className="bg-white rounded-lg p-4 grid gap-5 max-h-[40vh] overflow-y-auto">
                {cartItem.map((item, index) => (
                  <div key={`${item?._id}-cartItem-${index}`} className="flex gap-4">
                    <div className="w-16 h-16 bg-red-100 border rounded overflow-hidden">
                      <img
                        src={item?.productId?.image?.[0]}
                        alt={item?.productId?.name || 'Product Image'}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="line-clamp-2">{item?.productId?.name}</p>
                      <p className="text-neutral-400">{item?.productId?.unit}</p>
                      <p className="font-semibold">
                        {DisplayPriceInRupees(pricewithDiscount(
                          item?.productId?.price,
                          item?.productId?.discount
                        ))}
                      </p>
                    </div>
                    <AddToCartButton data={item?.productId} />
                  </div>
                ))}
              </div>

              {/* Bill Details */}
              <div className="bg-white p-4">
                <h3 className="font-semibold mb-2">Bill Details</h3>
                <div className="flex justify-between text-sm mb-1">
                  <p>Items Total</p>
                  <p className="flex gap-2 items-center">
                    <span className="line-through text-neutral-400">
                      {DisplayPriceInRupees(notDiscountTotalPrice)}
                    </span>
                    <span>{DisplayPriceInRupees(totalPrice)}</span>
                  </p>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <p>Quantity</p>
                  <p>{totalQty} item{totalQty > 1 ? 's' : ''}</p>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <p>Delivery Charge</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between font-semibold text-base mt-2">
                  <p>Grand Total</p>
                  <p>{DisplayPriceInRupees(totalPrice)}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white flex flex-col justify-center items-center p-4">
              <img
                src={imageEmpty}
                alt="Empty cart"
                className="w-full h-full object-contain"
                loading="lazy"
              />
              <Link
                to="/"
                onClick={close}
                className="mt-4 bg-green-600 px-4 py-2 text-white rounded"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        {cartItem?.length > 0 && (
          <div className="p-2">
            <div className="bg-green-700 text-white px-4 py-4 font-bold text-base rounded flex items-center justify-between">
              <span>{DisplayPriceInRupees(totalPrice)}</span>
              <button onClick={redirectToCheckoutPage} className="flex items-center gap-1">
                Proceed
                <FaCaretRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default DisplayCartItem
