import styles from '../../styles/IssueItem.module.css';

export default function IssueItem({ title, assignees }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.statusBar}></div>
      <div className={styles.assignees}>
        {assignees.map((assignee, index) => (
          <div key={index} className={styles.assignee}></div>
        ))}
      </div>
    </div>
  );
}
