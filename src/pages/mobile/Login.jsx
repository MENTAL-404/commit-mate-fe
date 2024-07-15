import styles from '../../styles/Login.module.css'
import { MdAlarmOff } from 'react-icons/md'
import MobileLayout from '../../components/mobile/MobileLayout'

export default function LoginMobile() {

  return (
    <MobileLayout>
    <div className={styles.mobileContainer}>
      로그인
    </div>
    </MobileLayout>
  )
}
