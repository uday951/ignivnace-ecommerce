import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const Toast = ({ toast }) => {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed top-6 right-6 z-[9999] flex items-center space-x-3 px-5 py-4 rounded-xl shadow-xl border bg-white border-gray-100 min-w-[300px]"
        >
          {toast.type === 'success' ? (
            <CheckCircle className="text-[#22C55E]" size={24} />
          ) : (
            <XCircle className="text-red-500" size={24} />
          )}
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-sm">
              {toast.type === 'success' ? '✔ Added to Cart' : 'Notification'}
            </span>
            <span className="font-medium text-xs text-gray-500">{toast.message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
