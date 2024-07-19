import styles from '../../styles/mobile/Home.module.css'
import MobileLayout from '../../components/mobile/MobileLayout'
import comemonLogo from '../../assets/images/comemon/logo.png'
import ComemonGo from '../../components/analytics/comemon/ComemonGo'
import chart from '../../assets/images/mobile/chart.png'
import ActiveBarChart from '../../components/analytics/ActiveBarChart'
import layer from '../../assets/images/mobile/layer.png'
import IssueList from '../../components/issue/IssueList'
import Honor from '../../components/Honor'
import React from 'react'

export default function HomeMobile() {
  return (
    <MobileLayout>
      <div className={styles.mobileContainer}>
        <section className={styles.commemon}>
          <img
            src={comemonLogo}
            className={styles.comemonLogo}
            alt='comemonLogo'
          />
          <ComemonGo />
        </section>
        <section className={styles.ActiveChartContainer}>
          <div className={styles.title}>
            <img src={chart} className={styles.icon} alt='chart icon' />
            활동차트
          </div>
          <div className={styles.chartContainer}>
            <ActiveBarChart />
          </div>
        </section>
        <section className={styles.issueContainer}>
          <div className={styles.title}>
            <img src={layer} className={styles.icon} alt='layer icon' />
            오픈된 이슈
          </div>
          <div className={styles.issueContiner}>
            <IssueList className={styles.issue} type='open' alt='open icon' />
          </div>
        </section>
        <section className={styles.honorContainer}>
          <div className={styles.title}>
            <img src={layer} className={styles.icon} alt='layer icon' />
            명예의 전당
          </div>
          <Honor />
        </section>
      </div>
    </MobileLayout>
  )
}
