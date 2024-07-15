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
import { Link, useLocation } from 'react-router-dom'
import { URL } from '../../utils/static'

const MobileFooter = () => {
  const location = useLocation()
  const path = location.pathname

  return (
    <footer className={styles.footer}>
      <Link
        to={URL.home}
        className={`${styles.tab} ${path.includes('home') && styles.clicked}`}
      >
        <img
          src={path.includes('home') ? homeOrange : home}
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
        />
        커밋
      </Link>
      <Link
        to={URL.issues}
        className={`${styles.tab} ${path.includes('issue') && styles.clicked}`}
      >
        <img
          src={path.includes('issue') ? issueOrange : issue}
          className={styles.icon}
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
        />
        설정
      </Link>
    </footer>
  )
}

export default MobileFooter
