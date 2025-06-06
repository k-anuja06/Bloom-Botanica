import React, { useEffect, useRef } from 'react';
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({ close, value, onChange, submit }) => {
  const inputRef = useRef(null);

  // Focus input on modal open
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle key events: Enter to submit, Escape to close
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') submit();
    if (e.key === 'Escape') close();
  };

  return (
    <section
      className="fixed inset-0 bg-neutral-900 bg-opacity-70 z-50 flex justify-center items-center p-4"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white rounded p-4 w-full max-w-md">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold text-lg">Add Field</h1>
          <button
            onClick={close}
            className="text-gray-600 hover:text-red-500"
            aria-label="Close modal"
          >
            <IoClose size={25} />
          </button>
        </div>

        <input
          ref={inputRef}
          type="text"
          className="bg-green-50 my-3 p-2 border outline-none focus:border-primary-100 rounded w-full"
          placeholder="Enter field name"
          value={value}
          onChange={onChange}
          aria-label="Field name input"
        />

        <button
          onClick={submit}
          className="bg-primary-200 hover:bg-primary-100 px-4 py-2 rounded mx-auto w-fit block font-medium"
        >
          Add Field
        </button>
      </div>
    </section>
  );
};

export default React.memo(AddFieldComponent);
