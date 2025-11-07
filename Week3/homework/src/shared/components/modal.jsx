import { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, children }) => {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="min-w-[280px] rounded-2xl bg-white p-6 text-center shadow-xl">
        {children}
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
