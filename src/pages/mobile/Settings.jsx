import styles from '../../styles/Settings.module.css'
import MobileLayout from '../../components/mobile/MobileLayout'

export default function SettingsMobile() {
  return (
    <MobileLayout>
      <div className={styles.mobileContainer}>설정</div>
    </MobileLayout>
  )
}
