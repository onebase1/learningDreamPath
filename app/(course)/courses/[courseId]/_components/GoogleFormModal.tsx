// File: GoogleFormModal.tsx
"use client";

interface GoogleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoogleFormModal = ({ isOpen, onClose }: GoogleFormModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Semi-transparent overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Modal container */}
      <div className="relative bg-white p-4 rounded shadow-lg max-w-3xl w-full mx-4 z-10">
        <div className="mb-4">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfOgBhAHD7tt0cahKXtIay2EB6c64djJLGsM5mn_62jznBwRw/viewform?embedded=true" 
            // width="640" height="2842" frameborder="0" marginheight="0" marginwidth="0">Loading…
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
          >
            Loading…
          </iframe>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleFormModal;
