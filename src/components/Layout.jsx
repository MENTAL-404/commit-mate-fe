import SideBar from './SideBar'
import RightSideBar from './RightSideBar'
import styles from '../styles/Layout.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.main}>
      <SideBar />
      <div className={styles.chilren}>{children}</div>
      <RightSideBar />
    </div>
  )
}
