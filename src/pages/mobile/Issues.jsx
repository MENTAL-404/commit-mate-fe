import styles from '../../styles/Issues.module.css'
import MobileLayout from '../../components/mobile/MobileLayout'

export default function IssuesMobile() {
  return (
    <MobileLayout>
      <div className={styles.mobileContainer}>이슈</div>
    </MobileLayout>
  )
}
