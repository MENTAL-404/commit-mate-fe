import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import BottomTag from '../components/home/BottomTag'
import ComemonGo from '../components/analytics/comemon/ComemonGo'
import IssueList from '../components/issue/IssueList'
import ActiveBarChart from '../components/analytics/ActiveBarChart'
import useFetchData from '../hooks/useFetchData'
import totalCommitImg from '../images/totalCommit.png'
import commitKingImg from '../images/commitKing.png'
import mergePrImg from '../images/mergePr.png'
import { API_URL } from '../utils/static'

export default function Home() {
  const {
    loading: loadingTotalCommit,
    response: totalCommitResponse,
    error: errorTotalCommit,
  } = useFetchData(API_URL().commit_total)
  const {
    loading: loadingCommitKing,
    response: commitKingResponse,
    error: errorCommitKing,
  } = useFetchData(API_URL().commit_king)
  const {
    loading: loadingMergePR,
    response: mergePRResponse,
    error: errorMergePR,
  } = useFetchData(API_URL().pr)

  const totalCommit = totalCommitResponse
    ? totalCommitResponse.data.commit_count
    : ''
  const commitKing = commitKingResponse ? commitKingResponse.data.nickname : ''
  const mergePr = mergePRResponse ? mergePRResponse.data : {}

  const truncateNickname = (nickname) => {
    if (Array.isArray(nickname)) {
      nickname = nickname[0]
    }
    return nickname.length > 10 ? `${nickname.substring(0, 10)}..` : nickname
  }

  if (errorTotalCommit && errorCommitKing && errorMergePR) {
    return <div>Error fetching data</div>
  }

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
            <div className={styles.bottomContainer}>
              {' '}
              {loadingTotalCommit && loadingCommitKing && loadingMergePR ? (
                'loading...'
              ) : (
                <>
                  {' '}
                  <BottomTag
                    image={totalCommitImg}
                    bottom='총 커밋수'
                    title={totalCommit}
                  />
                  <BottomTag
                    image={commitKingImg}
                    bottom='저번주 커밋왕'
                    title={truncateNickname(commitKing)}
                  />
                  <BottomTag
                    image={mergePrImg}
                    bottom='Merge / PR'
                    title={`${mergePr?.merge_count} / ${mergePr?.pr_count}`}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
