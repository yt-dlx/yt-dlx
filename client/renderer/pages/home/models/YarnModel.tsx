import react from "react";
import { motion } from "framer-motion";

const YarnModel: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <react.Fragment>
      {isOpen && (
        <motion.div
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Install Using Yarn</h2>
            <p className="text-lg">Modal content here...</p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </react.Fragment>
  );
};

export default YarnModel;
