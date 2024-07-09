import styles from '../../styles/IssueItem.module.css'

export default function IssueItem({ type, title, assignees, url }) {
  const handleClick = () => {
    window.location.href = url // URL로 리디렉션
  }

  return (
    <div
      className={`${styles.container} ${type === 'open' ? styles.open : styles.closed}`}
      onClick={handleClick}
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
          <img
            key={index}
            src={assignee.avatar_url}
            alt={`Assignee ${index + 1}`}
            className={styles.assignee}
          ></img>
        ))}
      </div>
    </div>
  )
}
