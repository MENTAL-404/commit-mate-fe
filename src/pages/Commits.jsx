import Layout from '../components/Layout'
import SearchCommit from '../components/SearchCommit'
import styles from '../styles/Commits.module.css'
import timeline from '../images/timeline.png'
import contribution from '../images/contribution.png'
import CommitRank from '../components/CommitRank'

export default function Commits() {
  return (
    <Layout>
      <SearchCommit />
      <div className={styles.main}>
        <div className={styles.innerContainer}>
          <div className={styles.timelineContainer}>
            <div className={styles.title}>커밋 타임라인</div>
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
              <div className={styles.title}>커밋 기여도</div>
              <div className={styles.graph}>
                <img
                  src={contribution}
                  alt='graph'
                  className={styles.graphImage}
                />
              </div>
            </div>
            <div className={styles.ranking}>
              <div className={styles.title}>커밋 기여도 순위</div>
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
