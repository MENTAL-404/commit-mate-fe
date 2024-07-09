import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Login.module.css'
import logo from '../images/logo.png'
import logo2 from '../images/logo2.png'
import github from '../images/github.png'
import { GITHUB_LOGIN, SERVER_URL, getAccessToken } from '../utils/static'

export default function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken) {
      navigate('/home')
    }

    const fetchAccessToken = async (code) => {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/github/callback?code=${code}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch access token')
        }

        const data = await response.json()
        const accessToken = data.data.access_token
        // 액세스 토큰을 로컬 스토리지에 저장
        localStorage.setItem('access_token', accessToken)

        // 홈 화면으로 리다이렉트
        navigate('/home')
      } catch (error) {
        console.error('Error fetching access token:', error)
      }
    }

    // URL에서 인증 코드를 확인하는 로직
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    if (code) {
      fetchAccessToken(code)
    }
  }, [navigate])

  return (
    <div className={styles.main}>
      <img src={logo} alt='logo' className={styles.logo} />
      <div className={styles.container}>
        <img src={logo2} alt='logo2' className={styles.logo2} />
        <div className={styles.signIn}>
          <div className={styles.title}>Sign in</div>
          <a className={styles.loginBtn} href={GITHUB_LOGIN}>
            <img src={github} className={styles.githubIcon} /> Github
          </a>
        </div>
      </div>
    </div>
  )
}
