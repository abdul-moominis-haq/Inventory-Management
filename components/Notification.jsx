import { useState, useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose(); 
    }, 5000); 
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-0 right-0 mt-4 mr-4 p-4 rounded-md ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white ${show ? 'block' : 'hidden'}`}
    >
      {message}
    </div>
  );
};

export default Notification;
