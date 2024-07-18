import styles from '../../styles/mobile/Login.module.css'
import MobileLayout from '../../components/mobile/MobileLayout'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useFetchData from '../../hooks/useFetchData'
import logo2 from '../../assets/images/logos/logo2.webp'
import github from '../../assets/images/github.webp'
import { GITHUB_LOGIN, SERVER_URL, getAccessToken } from '../../utils/static'
import React from 'react'

export default function LoginMobile() {
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

      navigate('/organizations')
    }
  }, [navigate, response])

  return (
    <MobileLayout>
      <div className={styles.mobileContainer}>
        <div className={styles.title}>Sign in</div>
        <div className={styles.subTitle}>
          깃허브 계정으로 로그인하려면 아래 버튼을 클릭하세요.
        </div>
        <a className={styles.loginBtn} href={GITHUB_LOGIN}>
          <img src={github} className={styles.githubIcon} alt='Github icon' />{' '}
          Github
        </a>
        <img src={logo2} alt='logo2' className={styles.logo2} />
      </div>
    </MobileLayout>
  )
}
