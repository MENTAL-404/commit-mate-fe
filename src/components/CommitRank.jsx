import styles from '../styles/CommitRank.module.css'
import hong from '../images/hong.png'

export default function CommitRank() {
  return (
    <div className={styles.main}>
      <img src={hong} alt='profile' className={styles.profileImage} />
      <div className={styles.profile}>
        <div className={styles.name}>태양 홍</div>
        <div className={styles.number}>40 commits</div>
      </div>
    </div>
  )
}
