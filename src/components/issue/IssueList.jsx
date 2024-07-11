import styles from '../../styles/IssueList.module.css'
import IssueItem from '../../components/issue/IssueItem'
import { API_URL } from '../../utils/static'
import useFetchData from '../../hooks/useFetchData'
import LoadingLottie from '../LoadingLottie'

export default function IssueList({ type }) {
  const { loading, response, error } = useFetchData(API_URL().issue)
  const issues = response ? response.data : []

  const openIssues = issues?.filter((issue) => issue.state === 'open')
  const closedIssues = issues?.filter((issue) => issue.state === 'closed')

  const displayedIssues = type === 'open' ? openIssues : closedIssues

  if (error) {
    return <div>Error fetching issues</div>
  }

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
      {loading ? (
        <div className={styles.lottie}>
          <LoadingLottie width={'30px'} />
        </div>
      ) : (
        <div className={styles.issueList}>
          {displayedIssues?.length > 0
            ? displayedIssues?.map((issue, index) => (
                <IssueItem
                  key={index}
                  title={issue.title}
                  assignees={issue.assignees}
                  type={issue.state}
                  url={issue.url}
                />
              ))
            : '이슈가 없습니다'}
        </div>
      )}
    </div>
  )
}
