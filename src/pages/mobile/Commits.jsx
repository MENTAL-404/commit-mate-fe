import styles from '../../styles/mobile/Commit.module.css'
import MobileLayout from '../../components/mobile/MobileLayout'
import wordclod from '../../assets/images/mobile/wordcloud.png'
import contribution from '../../assets/images/mobile/contribution.png'
import MyWordcloud from '../../components/analytics/WordCloudMobile'
import CommitLineChart from '../../components/analytics/CommitLineChart'
import React from 'react'

export default function CommitsMobile() {
  return (
    <MobileLayout>
      <div className={styles.mobileContainer}>
        <section className={styles.wordcloudContainer}>
          <div className={styles.title}>
            <img src={wordclod} className={styles.icon} alt='wordclod icon' />
            커밋메세지 - 워드클라우드
          </div>
          <div className={styles.wordCloud}>
            <MyWordcloud />
          </div>
        </section>
        <section className={styles.contributionContainer}>
          <div className={styles.title}>
            <img src={contribution} className={styles.icon} alt='title icon' />
            커밋 기여도
          </div>
          <div className={styles.graph}>
            <CommitLineChart />
          </div>
        </section>
      </div>
    </MobileLayout>
  )
}
