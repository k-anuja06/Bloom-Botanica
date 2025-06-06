import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <main className='min-h-screen flex items-center justify-center bg-red-50 px-4'>
      <div className='w-full max-w-md bg-red-100 border border-red-300 p-6 rounded-lg shadow text-center'>
        <h1 className='text-red-800 text-2xl font-bold mb-4'>Order Cancelled</h1>
        <p className='text-red-700 mb-6'>Your transaction was not completed.</p>
        <Link
          to="/"
          className="inline-block border border-red-800 text-red-800 px-5 py-2 rounded hover:bg-red-800 hover:text-white transition duration-200"
        >
          Go to Home
        </Link>
      </div>
    </main>
  );
};

export default Cancel;
