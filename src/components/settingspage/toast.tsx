import React from 'react';

export type ToastProps = {
  message: string;
  show: boolean;
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, show, onClose }) => {
  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50 transition-all animate-fade-in">
      {message}
    </div>
  );
};

export default Toast;
