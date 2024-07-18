import React from 'react'
import styles from '../../styles/mobile/MobileFooter.module.css'
import issue from '../../assets/images/sidebar/issue.png'
import setting from '../../assets/images/sidebar/setting.png'
import homeOrange from '../../assets/images/sidebar/homeOrange.png'
import home from '../../assets/images/sidebar/home.png'
import commit from '../../assets/images/sidebar/commit.png'
import commitOrange from '../../assets/images/sidebar/commitOrange.png'
import settingOrange from '../../assets/images/sidebar/settingOrange.png'
import issueOrange from '../../assets/images/sidebar/issueOrange.png'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { getAccessToken, URL } from '../../utils/static'

const MobileFooter = () => {
  const location = useLocation()
  const path = location.pathname

  const auth = getAccessToken()

  if (!auth) {
    return <Navigate to={URL.logIn} />
  }
  return (
    <footer className={styles.footer}>
      <Link
        to={URL.home}
        className={`${styles.tab} ${path.includes('home') && styles.clicked}`}
      >
        <img
          src={path.includes('home') ? homeOrange : home}
          alt='home icon'
          className={styles.icon}
        />
        홈
      </Link>
      <Link
        to={URL.commits}
        className={`${styles.tab} ${path.includes('commit') && styles.clicked}`}
      >
        <img
          src={path.includes('commit') ? commitOrange : commit}
          className={styles.icon}
          alt='commit icon'
        />
        커밋
      </Link>
      <Link
        to={URL.issues}
        className={`${styles.tab} ${path.includes('issue') && styles.clicked}`}
        alt='issue tab'
      >
        <img
          src={path.includes('issue') ? issueOrange : issue}
          className={styles.icon}
          alt='issue icon'
        />
        이슈
      </Link>
      <Link
        to={URL.settings}
        className={`${styles.tab} ${path.includes('setting') && styles.clicked}`}
      >
        <img
          src={path.includes('setting') ? settingOrange : setting}
          className={styles.icon}
          alt='setting icon'
        />
        설정
      </Link>
    </footer>
  )
}

export default MobileFooter
