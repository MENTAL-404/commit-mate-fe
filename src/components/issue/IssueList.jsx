import styles from '../../styles/IssueList.module.css';
import IssueItem from '../../components/issue/IssueItem';

export default function IssueList() {
  const issues = [
    { title: "오픈된 이슈 1 오픈된 이슈 1 오픈된 이슈 1 오픈된 이슈 1", assignees: [1] },
    { title: "오픈된 이슈 2", assignees: [1, 2] },
    { title: "오픈된 이슈 3", assignees: [1, 2] },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span></span>
        <div className={styles.title}>오픈된 이슈</div>
      </div>
      <div className={styles.issueList}>
        {issues.map((issue, index) => (
          <IssueItem key={index} title={issue.title} assignees={issue.assignees} />
        ))}
      </div>
    </div>
  );
}
