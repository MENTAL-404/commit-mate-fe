import SideBar from './SideBar'
import RightSideBar from './RightSideBar'
import styles from '../styles/Layout.module.css'
import RightSideTopContainer from './RightSideTopContainer'
export default function Layout({ children }) {
  return (
    <div className={styles.main}>
      <RightSideTopContainer customStyle='topContainerInHome' />
      <SideBar />
      <div className={styles.children}>{children}</div>
      <RightSideBar className={styles.rightSideBar} />
    </div>
  )
}
