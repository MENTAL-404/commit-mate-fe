import styles from '../../styles/IssueItem.module.css';

export default function IssueItem({ type, title, assignees }) {
  return (
    <div className={`${styles.container} ${type === 'open' ? styles.open : styles.closed}`}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.statusBar} style={{ backgroundColor: type === 'open' ? '#4caf50' : '#EB763C' }}></div>
      <div className={styles.assignees}>
        {assignees.map((assignee, index) => (
          <div key={index} className={styles.assignee}></div>
        ))}
      </div>
    </div>
  );
}
