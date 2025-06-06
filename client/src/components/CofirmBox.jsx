import React from 'react'
import { IoClose } from "react-icons/io5"

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-neutral-800 bg-opacity-70 p-4 flex justify-center items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <div className="bg-white w-full max-w-md p-5 rounded shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 id="confirm-dialog-title" className="text-lg font-semibold">
            Permanent Delete
          </h2>
          <button
            onClick={close}
            aria-label="Close confirmation dialog"
            className="text-gray-600 hover:text-gray-900"
          >
            <IoClose size={24} />
          </button>
        </div>

        <p id="confirm-dialog-description" className="text-sm text-gray-700 mb-6">
          Are you sure you want to permanently delete this item?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={cancel}
            className="px-4 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="px-4 py-1 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ConfirmBox)
