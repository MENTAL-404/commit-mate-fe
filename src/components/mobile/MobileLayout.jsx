import styles from '../../styles/mobile/MobileLayout.module.css'
import React from 'react'
import MobileHeader from './MobileHeader'
import MobileFooter from './MobileFooter'
import { useLocation } from 'react-router-dom'

export default function MobileLayout({ children }) {
  const location = useLocation()
  const path = location.pathname

  return (
    <div className={styles.container}>
      <MobileHeader />
      <main className={styles.mainContent}>{children}</main>
      {path === '/' || <MobileFooter />}
    </div>
  )
}
