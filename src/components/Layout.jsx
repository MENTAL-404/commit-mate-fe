import SideBar from './SideBar'
import RightSideBar from './RightSideBar'
import styles from '../styles/Layout.module.css'
import RightSideTopContainer from './RightSideTopContainer'
import { getAccessToken } from '../utils/static'
import { useNavigate } from 'react-router-dom'

export default function Layout({ children }) {
  const navigate = useNavigate()
  const accessToken = getAccessToken()
  if (!accessToken || accessToken === null || accessToken === '') {
    navigate('/')
  }

  return (
    <div className={styles.main}>
      <RightSideTopContainer customStyle='topContainerInHome' />
      <SideBar />
      <div className={styles.children}>{children}</div>
      <RightSideBar className={styles.rightSideBar} />
    </div>
  )
}
