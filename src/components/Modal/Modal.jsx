import React, { useEffect } from 'react';
import styles from './Modal.module.css';

export const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyClose = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyClose);
    return () => {
      window.removeEventListener('keydown', handleKeyClose);
    };
  }, [onClose]);

  const handleOverlayClose = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={styles.Overlay} onClick={handleOverlayClose}>
      <div className={styles.Modal}>
        <img src={image} alt="" />
      </div>
    </div>
  );
};
