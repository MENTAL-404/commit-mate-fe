import Layout from '../components/Layout'
import styles from '../styles/Settings.module.css'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ToastMessage from '../components/ToastMessage'
import 'react-toastify/dist/ReactToastify.css'
import {
  SERVER_URL,
  ORGANIZATION,
  AUTH_HEADER,
  getSelectedRepo,
  getSelectedOrgName,
} from '../utils/static'
import React from 'react'

export default function Settings() {
  const [repositories, setRepositories] = useState([])
  const [selectedRepo, setSelectedRepo] = useState('')

  useEffect(() => {
    setSelectedRepo(getSelectedRepo())

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/organizations/${getSelectedOrgName()}/repositories`,
          {
            headers: AUTH_HEADER,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch access token')
        }

        const data = await response.json()
        setRepositories(data.data.repos)
      } catch (error) {
        setRepositories([])
        console.error('Error fetching repositories:', error)
      }
    }

    fetchRepositories()
  }, [])

  const handleChangeRepo = (event) => {
    const newValue = event.target.value
    setSelectedRepo(newValue)
  }

  const handleClickSaveRepo = () => {
    localStorage.setItem('selected_repo', selectedRepo)
    toast.success('선택한 레포지토리가 저장되었습니다,')
  }

  return (
    <Layout>
      <ToastMessage />
      <div className={styles.container}>
        <div className={styles.section}>
          <h1 className={styles.title}>환경설정</h1>
          <div className={styles.subSection}>
            <div className={styles.subTopSection}>
              <span className={styles.subTitle}>레포지토리 설정</span>
              <button
                className={styles.saveButton}
                onClick={handleClickSaveRepo}
              >
                저장
              </button>
            </div>
            <div className={styles.subBottomSection}>
              <label className={styles.label}>
                화면에 표시될 레포지토리를 선택해주세요.
              </label>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>레포지토리</label>
                <select
                  className={styles.select}
                  value={selectedRepo}
                  onChange={handleChangeRepo}
                >
                  {repositories.map((repo) => {
                    return (
                      <option value={repo} key={repo}>
                        {repo}
                      </option>
                    )
                  })}
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
