import styles from '../../styles/BottomTag.module.css'

export default function BottomTag({ image, title, bottom }) {
  return (
    <div className={styles.bottomInner}>
      <img src={image} alt='tag' className={styles.innerImage} />
      <div className={styles.bottomText}>
        <div className={styles.textTitle}>{title}</div>
        <div className={styles.textBottom}>{bottom}</div>
      </div>
    </div>
  )
}
