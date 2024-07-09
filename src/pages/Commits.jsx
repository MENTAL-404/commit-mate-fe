import Layout from '../components/Layout'
import SearchCommit from '../components/SearchCommit'
import styles from '../styles/Commits.module.css'
import CommitRank from '../components/CommitRank'
import CommitLineChart from '../components/analytics/CommitLineChart'
import MyWordcloud from '../components/analytics/WordCloud'


export default function Commits() {
  return (
    <Layout>
      <SearchCommit />
      <div className={styles.main}>
        <div className={styles.innerContainer}>
          <h1 className={styles.title}>커밋메시지 워드클라우드</h1>
          <div className={styles.wordCloudContainer}>
            <MyWordcloud />
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.contribution}>
              <h1 className={styles.title}>커밋 기여도</h1>
              <div className={styles.graph}>
                <CommitLineChart />
              </div>
            </div>
            {/*<div className={styles.ranking}>*/}
            {/*  <h1 className={styles.title}>커밋 기여도 순위</h1>*/}
            {/*  <div className={styles.rankContainer}>*/}
            {/*    <CommitRank />*/}
            {/*    <CommitRank />*/}
            {/*    <CommitRank />*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </Layout>
  )
}
