import React from 'react';
import styles from '../../styles/MobileSidebar.module.css';

const MobileSidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.sidebarContent}>
        <div className={styles.profileSection}>
          <div className={styles.profileDetails}>
            <div className={styles.profileImage}> </div>
            <div>
              <div className={styles.profileName}>commit-mate-fe</div>
              <div className={styles.profileChange}>레포지토리 변경</div>
            </div>
          </div>
          <button className={styles.logoutButton}>로그아웃</button>
        </div>
        {/* Add your sidebar content here */}
        <div className={styles.menuItem}>환경설정</div>
        <div className={styles.menuItem}>할 일 목록</div>
        <hr />
        <div className={styles.menuItem}>홈</div>
        <div className={styles.menuItem}>커밋</div>
        <div className={styles.menuItem}>이슈</div>
      </div>
    </div>
  );
};

export default MobileSidebar;
