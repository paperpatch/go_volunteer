import React from 'react';
import EventForm from "../EventForm";

export default function EventModal({ onClose, showSuccessMod }) {
  return (
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          aria-hidden="true"
        ></div>

        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          <EventForm
            onEventSubmit={onClose}
            showSuccessMod={showSuccessMod}
          />
          <div className="mt-5 sm:mt-6">
            <button
              onClick={onClose}
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-black border border-transparent rounded-md shadow-sm bg-sky-100 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-200 sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};