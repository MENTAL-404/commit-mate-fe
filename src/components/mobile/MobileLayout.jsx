import styles from '../../styles/MobileLayout.module.css'
import React from 'react'
import MobileHeader from './MobileHeader'
import MobileFooter from './MobileFooter'

export default function MobileLayout({ children }) {
  return (
    <div className={styles.container}>
      <MobileHeader />
      <main className={styles.mainContent}>{children}</main>
      <MobileFooter />
    </div>
  )
}
