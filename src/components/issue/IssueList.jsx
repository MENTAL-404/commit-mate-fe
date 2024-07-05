import styles from '../../styles/IssueList.module.css'
import IssueItem from '../../components/issue/IssueItem'
import issueData from '../../data/issueData'


export default function IssueList({ type }) {
  const issues = [
    {
      title: '오픈된 이슈 1 오픈된 이슈 1 오픈된 이슈 1 오픈된 이슈 1',
      assignees: ['https://randomuser.me/api/portraits/women/2.jpg'],
      type: 'open',
    },
    { title: '오픈된 이슈 2', assignees: ['https://randomuser.me/api/portraits/women/2.jpg', 'https://randomuser.me/api/portraits/men/5.jpg'], type: 'open' },
    { title: '오픈된 이슈 3', assignees: ['https://randomuser.me/api/portraits/women/2.jpg'], type: 'open' },
    { title: '해결된 이슈 1', assignees: ['https://randomuser.me/api/portraits/women/2.jpg'], type: 'closed' },
    { title: '해결된 이슈 2', assignees: ['https://randomuser.me/api/portraits/women/2.jpg'], type: 'closed' },
    { title: '해결된 이슈 3', assignees: ['https://randomuser.me/api/portraits/women/2.jpg'], type: 'closed' },
    { title: '해결된 이슈 4', assignees: ['https://randomuser.me/api/portraits/women/2.jpg'], type: 'closed' },
  ]

  const openIssues = issues.filter((issue) => issue.type === 'open')
  const closedIssues = issues.filter((issue) => issue.type === 'closed')

  const displayedIssues = type === 'open' ? openIssues : closedIssues

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span
          style={{ backgroundColor: type === 'open' ? '#4caf50' : '#EB763C' }}
        ></span>
        <div className={styles.title}>
          {type === 'open' ? '오픈된 이슈' : '해결된 이슈'}
        </div>
      </div>
      <div className={styles.issueList}>
        {displayedIssues.map((issue, index) => (
          <IssueItem
            key={index}
            title={issue.title}
            assignees={issue.assignees}
            type={issue.type}
          />
        ))}
      </div>
    </div>
  )
}
