'use client';

import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function DeleteDataModal({ isOpen, onClose, onConfirm, item }) {
  if (!isOpen) return null;

  const onClickDeleteHandler = () =>{
    onConfirm(item.id);
    onClose();
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="delete-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-sm shadow-2xl relative text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">⚠️ Confirm Delete</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Do you want to delete <strong>{item.name}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-lg"
              >
                ❌ Cancel
              </button>
              <button
                onClick={onClickDeleteHandler}
                className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg"
              >
                ✅ Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
