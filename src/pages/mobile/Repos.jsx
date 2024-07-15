import styles from '../../styles/Repos.module.css'
import MobileLayout from '../../components/mobile/MobileLayout'

export default function ReposMobile() {
  return (
    <MobileLayout>
      <div className={styles.mobileContainer}>레포 선택</div>
    </MobileLayout>
  )
}
