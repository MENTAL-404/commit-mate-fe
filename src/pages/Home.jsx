import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

import wordCloud from '../images/wordCloud.png'
import tag from '../images/tag.png'
import activeChart from '../images/activeChart.png'

import totalCommit from '../images/totalCommit.png'
import commitKing from '../images/commitKing.png'
import mergePr from '../images/mergePr.png'
import message from '../images/message.png'
import clip from '../images/clip.png'
import check from '../images/check.png'
import RightSideTopContainer from '../components/RightSideTopContainer'

export default function Home() {
  return (
    <Layout>
      <RightSideTopContainer customStyle="topContainerInHome"/>
      <div className={styles.topContainer}>
        📌 커밋메이트는 프로젝트 협업 관리 툴로, 깃허브 활동 상황을 실시간으로
        볼 수 있는 대시보드입니다.
      </div>
      <div className={styles.bottomOuterContainer}>
        <div className={styles.wordCloudContainer}>
          <div className={styles.title}>커밋메시지 워드클라우드</div>
          <div className={styles.innerContainer}>
            <img alt='cloud' src={wordCloud} className={styles.wordCloud} />
          </div>
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.activeContainer}>
            <div className={styles.title}>활동차트</div>
            <img
              src={activeChart}
              alt='active chart'
              className={styles.activeChart}
            />
          </div>
          <div className={styles.issueContainer}>
            <div className={styles.title}>깃헙 이슈</div>
            <div className={styles.middleTitle}>
              <img src={tag} alt='tag' className={styles.tag} />
              미해결 이슈
            </div>
            <div className={styles.issueList}>
              <div className={styles.issue}>
                <div className={styles.issueMessage}>
                  Implement sub and jti check
                  <div className={styles.middleBar}></div>
                  <div className={styles.action}>
                    <div className={styles.comment}>
                      0
                      <img
                        src={message}
                        alt='message'
                        className={styles.actionIcon}
                      ></img>
                    </div>
                    <div className={styles.clip}>
                      02
                      <img
                        src={clip}
                        alt='clip'
                        className={styles.actionIcon}
                      ></img>
                    </div>
                    <div className={styles.check}>
                      1 / 3
                      <img
                        src={check}
                        alt='check'
                        className={styles.actionIcon}
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.issue}>
                <div className={styles.issueMessage}>
                  Validate the options passed in to jwt.decode
                  <div className={styles.middleBar}></div>
                  <div className={styles.action}>
                    <div className={styles.comment}>
                      0
                      <img
                        src={message}
                        alt='message'
                        className={styles.actionIcon}
                      ></img>
                    </div>
                    <div className={styles.clip}>
                      02
                      <img
                        src={clip}
                        alt='clip'
                        className={styles.actionIcon}
                      ></img>
                    </div>
                    <div className={styles.check}>
                      1 / 3
                      <img
                        src={check}
                        alt='check'
                        className={styles.actionIcon}
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.bottomInner}>
            <img
              src={totalCommit}
              alt='total commit'
              className={styles.innerImage}
            />
            <div className={styles.bottomText}>
              <div className={styles.textTitle}>134</div>
              <div className={styles.textBottom}>총 커밋수</div>
            </div>
          </div>
          <div className={styles.bottomInner}>
            <img
              src={commitKing}
              alt='commitKing'
              className={styles.innerImage}
            />
            <div className={styles.bottomText}>
              <div className={styles.textTitle}>Erica</div>
              <div className={styles.textBottom}>저번주 커밋왕</div>
            </div>
          </div>
          <div className={styles.bottomInner}>
            <img src={mergePr} alt='mergePr' className={styles.innerImage} />
            <div className={styles.bottomText}>
              <div className={styles.textTitle}>03 / 10</div>
              <div className={styles.textBottom}>Merge / PR</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
