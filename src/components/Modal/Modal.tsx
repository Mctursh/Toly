import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
  showCloseButton?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = "w-[32%]",
  showCloseButton = true,
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`relative ${width} max-w-2xl bg-[#121417] rounded-2xl shadow-xl overflow-hidden max-h-[80vh] flex flex-col ${className}`}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-baseline">
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
          </div>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          )}
        </div>

        <div className="p-6 border-b border-white/10">
          {children}
        </div>

        {footer && (
          <div className="flex-1 overflow-y-auto p-6">
            {footer}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Modal;