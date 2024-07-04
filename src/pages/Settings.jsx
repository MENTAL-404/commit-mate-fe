import Layout from '../components/Layout'
import styles from '../styles/Settings.module.css'

export default function Settings() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.title}>환경설정</div>
          <div className={styles.subSection}>
            <div className={styles.subTopSection}>
              <span className={styles.subTitle}>레포지토리 설정</span>
              <button className={styles.saveButton}>저장</button>
            </div>
            <div className={styles.subBottomSection}>
              <label className={styles.label}>
                화면에 표시할 레포지토리를 선택해주세요.
              </label>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>레포지토리</label>
                <select className={styles.select}>
                  <option value='commit-mate-fe'>commit-mate-fe</option>
                  <option value='commit-mate-be'>commit-mate-be</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.subSection}>
            <div className={styles.subTopSection}>
              <span className={styles.subTitle}>북마크 설정</span>
              <button className={styles.saveButton}>저장</button>
            </div>
            <div className={styles.subBottomSection}>
              <div className={styles.bookmarkGroup}>
                <label className={styles.label}>바로가기 1</label>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>북마크 이름</label>
                  <input
                    className={styles.input}
                    placeholder='추가할 북마크 이름을 입력해주세요.'
                    value='MENTAL-404'
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>북마크 URL</label>
                  <input
                    className={styles.input}
                    placeholder='추가할 북마크 URL을 입력해주세요.'
                    value='https://github.com/orgs/MENTAL-404'
                  />
                </div>
              </div>
              <div className={styles.bookmarkGroup}>
                <label className={styles.label}>바로가기 2</label>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>북마크 이름</label>
                  <input
                    className={styles.input}
                    placeholder='추가할 북마크 이름을 입력해주세요.'
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>북마크 URL</label>
                  <input
                    className={styles.input}
                    placeholder='추가할 북마크 URL을 입력해주세요.'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
