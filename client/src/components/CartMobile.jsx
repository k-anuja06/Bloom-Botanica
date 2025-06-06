import React from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { FaCartShopping } from 'react-icons/fa6'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { FaCaretRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const CartMobileLink = () => {
  const { totalPrice, totalQty } = useGlobalContext()
  const cartItem = useSelector(state => state.cartItem.cart)

  if (cartItem.length === 0) return null

  return (
    <div className="sticky bottom-4 p-2 lg:hidden z-50">
      <div className="bg-green-600 px-2 py-2 rounded text-neutral-100 text-sm flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-green-500 rounded">
            <FaCartShopping />
          </div>
          <div className="text-xs leading-tight">
            <p>{totalQty} item{totalQty > 1 && 's'}</p>
            <p>{DisplayPriceInRupees(totalPrice)}</p>
          </div>
        </div>
        <Link to="/cart" className="flex items-center gap-1 hover:underline">
          <span className="text-sm font-medium">View Cart</span>
          <FaCaretRight />
        </Link>
      </div>
    </div>
  )
}

export default React.memo(CartMobileLink)
