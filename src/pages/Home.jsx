import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import BottomTag from '../components/home/BottomTag'

import MyWordcloud from '../components/analytics/WordCloud'
import IssueList from '../components/issue/IssueList'
import ActiveBarChart from '../components/analytics/ActiveBarChart'

import { totalCommit, commitKing, totalPR } from '.././data/homeData'
import totalCommitImg from '../images/totalCommit.png'
import commitKingImg from '../images/commitKing.png'
import mergePrImg from '../images/mergePr.png'

export default function Home() {
  return (
    <Layout>
      <div className={styles.topContainer}>
        📌 커밋메이트는 프로젝트 협업 관리 툴로, 깃허브 활동 상황을 실시간으로
        볼 수 있는 대시보드입니다.
      </div>
      <div className={styles.bottomOuterContainer}>
        <div className={styles.wordCloudContainer}>
          <h1 className={styles.title}>커밋메시지 워드클라우드</h1>
          <div className={styles.innerContainer}>
            <MyWordcloud />
          </div>
        </div>
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
        <div className={styles.bottomContainer}>
          <BottomTag
            image={totalCommitImg}
            bottom='총 커밋수'
            title={totalCommit.data.commit_count}
          />
          <BottomTag
            image={commitKingImg}
            bottom='저번주 커밋왕'
            title={commitKing.data.nickname}
          />
          <BottomTag
            image={mergePrImg}
            bottom='Merge / PR'
            title={`${totalPR.data.merged} / ${totalPR.data.total_pr}`}
          />
        </div>
      </div>
    </Layout>
  )
}
