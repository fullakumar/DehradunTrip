'use client';

import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function UpdateFormModal({ isOpen, onClose, onSubmit, defaultData = {} }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const updatedData = {
      id: defaultData.id,
      name: form.get("name"),
      price: form.get("price"),
      paid_by: form.get("paid_by"),
    };
    onSubmit(updatedData);
    onClose();
  };

  if (typeof window === 'undefined') return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl w-full max-w-lg shadow-2xl relative"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
              ✏️ Update Trip
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={defaultData.name}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue={defaultData.price}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Paid By
                </label>
                <select
                  name="paid_by"
                  defaultValue={defaultData.paid_by}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                >
                  <option value="Sumit">Sumit</option>
                  <option value="Yash">Yash</option>
                  <option value="Vidu">Vidu</option>
                  <option value="Shivam">Shivam</option>
                </select>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition duration-200 shadow-md"
                >
                  ✅ Update
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-5 py-2 rounded-lg transition duration-200"
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );

}
