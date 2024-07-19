import styles from '../../styles/BottomTag.module.css'
import LoadingLottie from '../LoadingLottie'

export default function BottomTag({ image, title, bottom, loading }) {
  return (
    <div className={styles.bottomInner}>
      <img src={image} alt='tag' className={styles.innerImage} />
      <div className={styles.bottomText}>
        {loading ? (
          <LoadingLottie width={'30px'} />
        ) : (
          <div className={styles.textTitle}>{title}</div>
        )}
        <div className={styles.textBottom}>{bottom}</div>
      </div>
    </div>
  )
}
