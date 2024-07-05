import styles from '../../styles/IssueItem.module.css'

export default function IssueItem({ type, title, assignees }) {
  return (
    <div
      className={`${styles.container} ${type === 'open' ? styles.open : styles.closed}`}
    >
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
      </div>
      <div
        className={styles.statusBar}
        style={{ backgroundColor: type === 'open' ? '#4caf50' : '#EB763C' }}
      ></div>
      <div className={styles.assignees}>
        {assignees.map((assignee, index) => (
          <img key={index} src={assignee} alt={`Assignee ${index}`} className={styles.assignee}></img>
        ))}
      </div>
    </div>
  )
}
