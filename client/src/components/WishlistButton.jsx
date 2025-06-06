import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWishlistItem, removeWishlistItem } from '../store/wishlistSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const WishlistButton = ({ productId }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items);

  const isWishlisted = useMemo(() => {
    return wishlist.some(item => item.productId._id === productId);
  }, [wishlist, productId]);

  const toggleWishlist = () => {
    isWishlisted
      ? dispatch(removeWishlistItem(productId))
      : dispatch(addWishlistItem(productId));
  };

  return (
    <button
      onClick={toggleWishlist}
      aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      className="text-xl transition-colors duration-200 hover:scale-110 active:scale-95"
    >
      {isWishlisted ? (
        <FaHeart className="text-green-500" />
      ) : (
        <FaRegHeart className="text-gray-500" />
      )}
    </button>
  );
};

export default WishlistButton;
