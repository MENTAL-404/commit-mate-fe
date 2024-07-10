import styles from '../styles/Repos.module.css'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ToastMessage from '../components/ToastMessage'
import 'react-toastify/dist/ReactToastify.css'
import {
  SERVER_URL,
  ORGANIZATION,
  AUTH_HEADER,
  getSelectedRepo,
} from '../utils/static'

export default function Repos() {
  const [repositories, setRepositories] = useState([])
  const [selectedRepo, setSelectedRepo] = useState('')

  useEffect(() => {
    setSelectedRepo(getSelectedRepo())



    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/organizations/${ORGANIZATION}/repositories`,
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
    // navigate('/repos')
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h1 className={styles.title}>👋🏻 안녕하세요!</h1>
        <h1 className={styles.title}>커밋메이트에 오신 것을 환영합니다.</h1>
        <span>아래에서 작업할 레포지토리를 선택해주세요.</span>
        <div className={styles.reposContainer}>
          <div className={styles.nameGroup}>
            <label className={styles.inputLabel}>조직명</label>
            <div className={styles.name}>
              {ORGANIZATION}
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.selectGroup}>
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
              <button
                className={styles.saveButton}
                onClick={handleClickSaveRepo}
              >
                저장
              </button>
            </div>
          </div>
        </div>
        {/*<div className={styles.subSection}>*/}
        {/*<div className={styles.subTopSection}>*/}
        {/*  /!*<span className={styles.subTitle}>레포지토리 설정</span>*!/*/}

        {/*</div>*/}
        {/*<div className={styles.subBottomSection}>*/}
        {/*  /!*<label className={styles.label}>*!/*/}
        {/*  /!*  화면에 표시될 레포지토리를 선택해주세요.*!/*/}
        {/*  /!*</label>*!/*/}

        {/*</div>*/}
        {/*</div>*/}
      </div>
      <ToastMessage />
    </div>
  )
}
