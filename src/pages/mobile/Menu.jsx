import styles from '../../styles/Repos.module.css'
import MobileLayout from '../../components/mobile/MobileLayout'

export default function MenuMobile() {

  return (
    <MobileLayout>
    <div className={styles.mobileContainer}>
      메뉴
    </div>
    </MobileLayout>
  )
}
