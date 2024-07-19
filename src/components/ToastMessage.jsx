import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/ToastMessage.module.css';

const ToastMessage = () => {
  return <ToastContainer className={styles['custom-toast-container']} />;
};

export default ToastMessage;
