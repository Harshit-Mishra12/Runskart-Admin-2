import React, { useEffect, useState } from 'react';
import styles from './Snackbar.module.css';

const Snackbar = ({ message, severity = 'info', onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 3000); // Show for 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className={`${styles.snackbar} ${styles[severity]}`}>
      {message}
    </div>
  );
};

export default Snackbar;
