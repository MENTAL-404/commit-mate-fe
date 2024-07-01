import styles from '../styles/Login.module.css'
import logo from '../images/logo.png'
import logo2 from '../images/logo2.png'
import apple from '../images/apple.png'
import facebook from '../images/facebook.png'
import google from '../images/google.png'

export default function Login() {
  return (
    <div className={styles.main}>
      <img src={logo} alt='logo' className={styles.logo} />
      <div className={styles.container}>
        <img src={logo2} alt='logo2' className={styles.logo2} />
        <div className={styles.signIn}>
          <div className={styles.title}>Sign in</div>
          <div className={styles.inputContainer}>
            <input
              required
              type='email'
              id={styles.emailInput}
              placeholder='Enter email'
            />
            <input
              required
              type='password'
              id={styles.passwordInput}
              placeholder='Enter password'
            />
          </div>
          <div className={styles.loginBtn}>Login</div>
          <div className={styles.other}>
            <div className={styles.text}>or continue with</div>
            <div className={styles.loginIcon}>
              <img src={facebook} alt='facebook' className={styles.icon} />
              <img src={apple} alt='apple' className={styles.icon} />
              <img src={google} alt='google' className={styles.icon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
