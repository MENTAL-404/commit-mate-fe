import useFetchData from '../hooks/useFetchData'
import totalCommitImg from '../assets/images/totalCommit.png'
import commitKingImg from '../assets/images/commitKing.png'
import styles from '../styles/Home.module.css'
import mergePrImg from '../assets/images/mergePr.png'
import { API_URL } from '../utils/static'

import BottomTag from '../components/home/BottomTag'

export default function Honor() {
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
    const num = nickname.length
    if (num > 1) {
      nickname = nickname[0]
      return `${nickname.slice(0, 5)}.. 외 ${num - 1}명`
    }

    return `${nickname.slice(0, 10)}..`
  }

  if (errorTotalCommit && errorCommitKing && errorMergePR) {
    return <div>Error fetching data</div>
  }

  return (
    <div className={styles.bottomContainer}>
      <BottomTag
        image={totalCommitImg}
        bottom='총 커밋수'
        loading={loadingTotalCommit}
        title={totalCommit}
      />
      <BottomTag
        image={commitKingImg}
        bottom='저번주 커밋왕'
        loading={loadingCommitKing}
        title={truncateNickname(commitKing)}
      />
      <BottomTag
        image={mergePrImg}
        bottom='Merge / PR'
        loading={loadingMergePR}
        title={`${mergePr?.merge_count} / ${mergePr?.pr_count}`}
      />
    </div>
  )
}
