import Layout from '../components/Layout';
import styles from '../styles/Issues.module.css';

export default function Issues() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.issueListSection}>
          <h2>이슈 리스트</h2>
        </div>
        <div className={styles.issueStatisticsSection}>
          <div className={styles.issueStatisticsItem}>
            <img src="/path/to/icon1.png" alt="Icon 1" />
            <span>📌 이슈 상태 통계</span>
          </div>
          <div className={styles.issueStatisticsItem}>
            <img src="/path/to/icon2.png" alt="Icon 2" />
            <span>📌 담당자별 이슈 현황</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
