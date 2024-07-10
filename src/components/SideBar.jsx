import styles from '../styles/Sidebar.module.css'
import logo3 from '../images/logo3.png'
import { Link } from 'react-router-dom'
import { URL } from '../utils/static'
import { useLocation } from 'react-router-dom'
import home from '../images/home.png'
import commit from '../images/commit.png'
import issue from '../images/category.png'
import setting from '../images/setting.png'
import logout from '../images/logout.png'
import logo2 from '../images/logo2.png'
import homeOrange from '../images/homeOrange.png'
import commitOrange from '../images/commitOrange.png'
import settingOrange from '../images/settingOrange.png'
import { toast } from 'react-toastify'
import issueOrange from '../images/categoryOrange.png'
import { SERVER_URL, getHeader } from '../utils/static'
import { useNavigate } from 'react-router-dom'

export default function SideBar() {
  const location = useLocation()
  const path = location.pathname
  const navigate = useNavigate()

  const handleClickLogout = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/auth/logout`, {
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
      navigate('/')
    } catch (error) {
      console.error('Error logout:', error)
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.topContainer}>
        <img src={logo3} alt='logo' className={styles.logo} />
        <div className={styles.tab}>
          <Link
            to={URL.home}
            className={`${styles.home} ${
              path.includes('home') && styles.clicked
            }`}
          >
            <div className={`${styles.whiteRound}`}>
              <img
                src={path.includes('home') ? homeOrange : home}
                alt='home'
                className={styles.homeIcon}
              />
            </div>
            홈
          </Link>
          <Link
            to={URL.commits}
            className={`${styles.commit} ${
              path.includes('commits') && styles.clicked
            }`}
          >
            <div className={`${styles.whiteRound}`}>
              <img
                src={path.includes('commits') ? commitOrange : commit}
                alt='commit'
                className={styles.commitIcon}
              />
            </div>
            커밋
          </Link>
          <Link
            to={URL.issues}
            className={`${styles.issue} ${
              path.includes('issues') && styles.clicked
            }`}
          >
            <div className={`${styles.whiteRound}`}>
              <img
                src={path.includes('issues') ? issueOrange : issue}
                alt='issue'
                className={styles.issueIcon}
              />
            </div>
            이슈
          </Link>
          <Link
            to={URL.settings}
            className={`${styles.setting} ${
              path.includes('settings') && styles.clicked
            }`}
          >
            <div className={`${styles.whiteRound}`}>
              <img
                src={path.includes('settings') ? settingOrange : setting}
                alt='setting'
                className={styles.settingIcon}
              />
            </div>
            환경설정
          </Link>
          <div onClick={handleClickLogout} className={styles.logout}>
            <div className={`${styles.whiteRound}`}>
              <img src={logout} alt='logout' className={styles.logoutIcon} />
            </div>
            로그아웃
          </div>
        </div>
      </div>
      <img src={logo2} alt='logo' className={styles.logoCat} />
    </div>
  )
}
