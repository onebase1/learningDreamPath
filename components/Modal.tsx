// app/components/Modal.tsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * A simple modal component that renders its children in a React Portal.
 * Clicking on the backdrop calls onClose (and clicking inside the modal
 * content stops propagation so that the modal doesn’t immediately close).
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Use a portal root if you have one in your HTML, otherwise fallback to document.body.
  const modalRoot = document.getElementById("modal-root") || document.body;

  // If the modal is closed, render nothing.
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // clicking on the backdrop closes the modal
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()} // prevent clicks inside the modal from closing it
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
