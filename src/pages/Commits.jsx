import Layout from '../components/Layout'
import SearchCommit from '../components/SearchCommit'
import styles from '../styles/Commits.module.css'
import timeline from '../images/timeline.png'
import contribution from '../images/contribution.png'
import CommitRank from '../components/CommitRank'
import CommitLineChart from '../components/analytics/CommitLineChart'

export default function Commits() {
  return (
    <Layout>
      <SearchCommit />
      <div className={styles.main}>
        <div className={styles.innerContainer}>
          <div className={styles.timelineContainer}>
            <h1 className={styles.title}>커밋 타임라인</h1>
            <div className={styles.timeline}>
              <img
                src={timeline}
                alt='timeline'
                className={styles.timelineImage}
              />
            </div>
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.contribution}>
              <h1 className={styles.title}>커밋 기여도</h1>
              <div className={styles.graph}>
                <CommitLineChart />
              </div>
            </div>
            <div className={styles.ranking}>
              <h1 className={styles.title}>커밋 기여도 순위</h1>
              <div className={styles.rankContainer}>
                <CommitRank />
                <CommitRank />
                <CommitRank />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
