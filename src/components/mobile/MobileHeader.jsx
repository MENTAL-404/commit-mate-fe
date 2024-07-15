import React from 'react';
import styles from '../../styles/MobileHeader.module.css';
import logo from '../../../src/assets/images/mobileLogo.png';
import { IoSearch } from "react-icons/io5";
import { Fade as Hamburger } from 'hamburger-react';
import { useNavigate } from 'react-router-dom';

const MobileHeader = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/menu');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="mobile logo" />
      </div>
      <div className={styles.searchMenuContainer}>
        <div className={styles.searchIcon}>
          <IoSearch />
        </div>
        <div className={styles.hamburgerMenu}>
          <Hamburger size={20} onToggle={handleMenuClick} />
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
