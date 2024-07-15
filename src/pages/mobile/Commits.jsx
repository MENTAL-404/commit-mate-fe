import styles from '../../styles/Commits.module.css'
import MobileLayout from '../../components/mobile/MobileLayout'



export default function CommitsMobile() {
  return (
    <MobileLayout>
      <div className={styles.mobileContainer}>
       커밋
      </div>
    </MobileLayout>
  )
}
