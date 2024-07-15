import React from 'react';
import styles from '../../styles/MobileSidebar.module.css';

const MobileSidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.sidebarContent}>
        <button className={styles.closeButton} onClick={onClose}></button>
        {/* Add your sidebar content here */}
      </div>
    </div>
  );
};

export default MobileSidebar;
