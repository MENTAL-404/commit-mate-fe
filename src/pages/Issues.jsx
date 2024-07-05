import Layout from '../components/Layout'
import styles from '../styles/Issues.module.css'
import IssueList from '../components/issue/IssueList'

import issuePieChart from '../images/issuePieChart.png'
import issueStatus from '../images/issueStatus.png'

export default function Issues() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.issueListSection}>
          <h1>이슈 리스트</h1>
          <div className={styles.issueListContainer}>
            <IssueList type='open' />
            <IssueList type='close' />
          </div>
        </div>
        <div className={styles.issueStatisticsSection}>
          <h2 className={styles.issueStatisticsTitle}>이슈 통계 및 분석</h2>
          <div className={styles.issueStatisticsItems}>
            <div className={styles.issueStatisticsItem}>
              <span className={styles.issueStatisticsSubTitle}>
                📌 이슈 상태 통계
              </span>
              <img
                src={issuePieChart}
                alt='issuePieChart'
                className={styles.issuePieChart}
              />
            </div>
            <div className={styles.issueStatisticsItem}>
              <span className={styles.issueStatisticsSubTitle}>
                📌 담당자별 이슈 현황
              </span>
              <img
                src={issueStatus}
                alt='issueStatus'
                className={styles.issueStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
