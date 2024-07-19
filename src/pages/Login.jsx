import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Login.module.css'
import logo from '../images/logo.png'
import logo2 from '../images/logo2.png'
import github from '../images/github.png'
import { GITHUB_LOGIN, SERVER_URL, getAccessToken } from '../utils/static'
import React from 'react'

export default function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken) {
      navigate('/repos')
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
