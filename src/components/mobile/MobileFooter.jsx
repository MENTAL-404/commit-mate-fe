import React from 'react'
import styles from '../../styles/MobileFooter.module.css'
import issue from '../../assets/images/sidebar/issue.png'
import setting from '../../assets/images/sidebar/setting.png'
import homeOrange from '../../assets/images/sidebar/homeOrange.png'
import commit from '../../assets/images/sidebar/commit.png'

const MobileFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.tab}>
        <img src={homeOrange} className={styles.icon} />홈
      </div>
      <div className={styles.tab}>
        <img src={commit} className={styles.icon} />
        커밋
      </div>
      <div className={styles.tab}>
        <img src={issue} className={styles.icon} />
        이슈
      </div>
      <div className={styles.tab}>
        <img src={setting} className={styles.icon} />
        설정
      </div>
    </footer>
  )
}

export default MobileFooter
