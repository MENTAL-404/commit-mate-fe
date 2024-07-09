import styles from '../../styles/IssueList.module.css'
import IssueItem from '../../components/issue/IssueItem'
import { useEffect, useState } from 'react'

import {
  getSelectedRepo,
  SERVER_URL,
  ORGANIZATION,
  AUTH_HEADER,
} from '../../utils/static'

export default function IssueList({ type }) {
  const [issues, setIssues] = useState()

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/issues`,
          {
            headers: AUTH_HEADER,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch access token')
        }
        const data = await response.json()
        setIssues(data.data)
      } catch (error) {
        console.error('Error fetching repositories:', error)
      }
    }

    fetchIssues()
  }, [])

  const openIssues = issues?.filter((issue) => issue.state === 'open')
  const closedIssues = issues?.filter((issue) => issue.state === 'closed')

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
        {displayedIssues?.map((issue, index) => (
          <IssueItem
            key={index}
            title={issue.title}
            assignees={issue.assignees}
            type={issue.state}
            url={issue.url}
          />
        ))}
      </div>
    </div>
  )
}
