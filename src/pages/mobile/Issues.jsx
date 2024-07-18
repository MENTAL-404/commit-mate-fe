import styles from '../../styles/mobile/Issues.module.css'
import MobileLayout from '../../components/mobile/MobileLayout'
import layer from '../../assets/images/mobile/layer.png'
import pie from '../../assets/images/mobile/pie_chart.png'
import chart from '../../assets/images/mobile/chart.png'
import IssueList from '../../components/issue/IssueList'
import IssuePieChart from '../../components/analytics/IssuePieChart'
import IssueAssigneeGraph from '../../components/analytics/IssueAssigneeGraph'
import React from 'react'

export default function IssuesMobile() {
  return (
    <MobileLayout>
      <div className={styles.mobileContainer}>
        <section className={styles.issueContainer}>
          <div className={styles.title}>
            <img src={layer} className={styles.icon} alt='layer icon' />
            이슈 리스트
          </div>
          <div className={styles.issueListContiner}>
            <IssueList className={styles.issueOpen} type='open' />
            <IssueList className={styles.issueClosed} type='closed' />
          </div>
        </section>
        <section className={styles.issueStatusContainer}>
          <div className={styles.title}>
            <img src={pie} className={styles.icon} alt='pie icon' />
            이슈 상태 통계
          </div>
          <div className={styles.pieChartContainer}>
            <IssuePieChart />
          </div>
        </section>
        <section className={styles.issueStatusContainer}>
          <div className={styles.title}>
            <img src={chart} className={styles.icon} alt='chart icon' />
            담당자별 이슈 현황
          </div>
          <IssueAssigneeGraph />
        </section>
      </div>
    </MobileLayout>
  )
}
