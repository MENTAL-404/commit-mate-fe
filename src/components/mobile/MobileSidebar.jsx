import React from 'react'
import styles from '../../styles/mobile/MobileSidebar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL, getHeader, URL, getSelectedRepo } from '../../utils/static'
import { toast } from 'react-toastify'
import Loading from '../../components/LoadingLottie'
import useFetchData from '../../hooks/useFetchData'

const MobileSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  const selectedRepo = getSelectedRepo()
  const { loading, response } = useFetchData(API_URL().organization)

  const handleClickLogout = async () => {
    try {
      const response = await fetch(API_URL().logout, {
        method: 'POST',
        headers: getHeader(),
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error('Failed to logout')
      }

      localStorage.removeItem('access_token')
      localStorage.removeItem('selected_repo')
      localStorage.removeItem('avatar_url')
      toast.success('로그아웃 완료')
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      console.error('Error logout:', error)
    }
  }

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      {isOpen && <div className={styles.overlay} onClick={onClose}></div>}
      <div className={styles.sidebarContent}>
        <div className={styles.profileSection}>
          <div className={styles.profileImage}>
            {loading ? (
              <div className={styles.loadingContainer}>
                <Loading />
              </div>
            ) : (
              <img
                src={response?.data[0]?.avatar_url}
                alt='profile'
                className={styles.profileImage}
              />
            )}
          </div>
          <div className={styles.profileName}>{selectedRepo}</div>
          <Link to={URL.settings} className={styles.profileChange}>
            레포지토리 변경
          </Link>
        </div>
        <div className={styles.linkGroup}>
          <hr className={styles.horizontalLine} />
          <Link to={URL.home}>
            <div className={styles.menuItem}>홈</div>
          </Link>
          <Link to={URL.todo}>
            <div className={styles.menuItem}>할 일 목록</div>
          </Link>
          <Link to={URL.commits}>
            <div className={styles.menuItem}>커밋</div>
          </Link>
          <Link to={URL.issues}>
            <div className={styles.menuItem}>이슈</div>
          </Link>
          <hr className={styles.horizontalLine} />
        </div>
        <button className={styles.logoutButton} onClick={handleClickLogout}>
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default MobileSidebar
