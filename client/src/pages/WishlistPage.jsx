import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from '../store/wishlistSlice';
import ProductCard from '../components/CardProduct';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>Your Wishlist</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {
          items.length ? items.map(({ productId }) => (
            <ProductCard key={productId._id} product={productId} />
          )) : <p>No items in wishlist</p>
        }
      </div>
    </div>
  );
};

export default WishlistPage;
