import Layout from '../../components/Layout'
import styles from '../../styles/Home.module.css'
import ComemonGo from '../../components/analytics/comemon/ComemonGo'
import IssueList from '../../components/issue/IssueList'
import ActiveBarChart from '../../components/analytics/ActiveBarChart'
import Honor from '../../components/Honor'

export default function Home() {
  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.topContainer}>
          📌 커밋메이트는 프로젝트 협업 관리 툴로, 깃허브 활동 상황을 실시간으로
          볼 수 있는 대시보드입니다.
        </div>
        <div className={styles.bottomOuterContainer}>
          <ComemonGo />
          <div className={styles.middleContainer}>
            <div className={styles.activeContainer}>
              <h1 className={styles.title}>활동차트</h1>
              <div className={styles.activeChart}>
                <ActiveBarChart />
              </div>
            </div>
            <div className={styles.issueContainer}>
              <h1 className={styles.title}>깃헙 이슈</h1>
              <div className={styles.issue}>
                <IssueList className={styles.issue} type='open' />
              </div>
            </div>
          </div>
          <div className={styles.etcContainer}>
            <h1 className={styles.title}>명예의 전당</h1>
            <Honor />
          </div>
        </div>
      </div>
    </Layout>
  )
}
