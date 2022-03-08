import React from 'react';
export default function SuccessModal({ message, closeSuccess }) {

  const CloseModalIcon = () => {
    return (
      <svg
        className="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    );
  };

  return (
    <div className="rounded-md bg-slate-200 p-4">
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm font-medium text-black">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              title="Close Modal"
              type="button"
              className="inline-flex bg-slate-100 rounded-md p-1.5 text-black-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 focus:ring-slate-600"
              onClick={closeSuccess}
            >
              <span className="sr-only">Dismiss</span>
              <CloseModalIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};