import React from 'react'
import styles from '../../styles/mobile/MobileSidebar.module.css'
import { Link } from 'react-router-dom'

const MobileSidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      {isOpen && <div className={styles.overlay} onClick={onClose}></div>}
      <div className={styles.sidebarContent}>
        <div className={styles.profileSection}>
          <div className={styles.profileImage}></div>
          <div className={styles.profileName}>commit-mate-fe</div>
          <div className={styles.profileChange}>레포지토리 변경</div>
        </div>
        <div className={styles.linkGroup}>
          <hr className={styles.horizontalLine} />
          <Link to='/settings'>
            <div className={styles.menuItem}>환경설정</div>
          </Link>
          <Link to='/todo'>
            <div className={styles.menuItem}>할 일 목록</div>
          </Link>
          <Link to='/home'>
            <div className={styles.menuItem}>홈</div>
          </Link>
          <Link to='/commits'>
            <div className={styles.menuItem}>커밋</div>
          </Link>
          <Link to='/issues'>
            <div className={styles.menuItem}>이슈</div>
          </Link>
          <hr className={styles.horizontalLine} />
        </div>
        <button className={styles.logoutButton}>로그아웃</button>
      </div>
    </div>
  )
}

export default MobileSidebar
