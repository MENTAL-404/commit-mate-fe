import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/Login.module.css'
import logo from '../../assets/images/logos/logo.png'
import logo2 from '../../assets/images/logos/logo2.png'
import github from '../../assets/images/github.png'
import { GITHUB_LOGIN, SERVER_URL, getAccessToken } from '../../utils/static'
import useFetchData from '../../hooks/useFetchData'

export default function Login() {
  const navigate = useNavigate()
  const accessToken = getAccessToken()
  useEffect(() => {
    if (accessToken) {
      navigate('/home')
    }
  }, [navigate, accessToken])

  // URL에서 인증 코드를 확인하는 로직
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')

  const { response } = useFetchData(
    code ? `${SERVER_URL}/auth/github/callback?code=${code}` : null
  )

  useEffect(() => {
    if (response) {
      const accessToken = response.data.access_token
      // 액세스 토큰을 로컬 스토리지에 저장
      localStorage.setItem('access_token', accessToken)

      // 홈 화면으로 리다이렉트
      navigate('/organizations')
    }
  }, [navigate, response])

  return (
    <div className={styles.main}>
      <img src={logo} alt='logo' className={styles.logo} />
      <div className={styles.container}>
        <img src={logo2} alt='logo2' className={styles.logo2} />
        <div className={styles.signIn}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>Sign in</div>
            <div className={styles.subTitle}>
              깃허브 계정으로 로그인하려면 아래 버튼을 클릭하세요.
            </div>
          </div>
          <a className={styles.loginBtn} href={GITHUB_LOGIN}>
            <img src={github} className={styles.githubIcon} alt='Github icon' />{' '}
            Github
          </a>
        </div>
      </div>
    </div>
  )
}
