import styles from '../styles/Repos.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import { toast } from 'react-toastify'
import ToastMessage from '../components/ToastMessage'
import 'react-toastify/dist/ReactToastify.css'
import { ORGANIZATION, getSelectedRepo, API_URL } from '../utils/static'
import useFetchData from '../hooks/useFetchData'

export default function Repos() {
  const navigate = useNavigate()
  const [selectedRepo, setSelectedRepo] = useState('')

  const { loading, response, error } = useFetchData(API_URL().repositories)

  const repositories = useMemo(
    () => (response ? response.data.repos : []),
    [response]
  )

  useEffect(() => {
    setSelectedRepo(getSelectedRepo())
  }, [])

  useEffect(() => {
    if (repositories.length > 0 && !selectedRepo) {
      setSelectedRepo(repositories[0])
    }
  }, [repositories, selectedRepo])

  const handleChangeRepo = (repo) => {
    setSelectedRepo(repo)
  }

  const handleClickSaveRepo = () => {
    localStorage.setItem('selected_repo', selectedRepo)
    toast.success('선택한 레포지토리가 저장되었습니다,')
    setTimeout(() => {
      navigate('/home')
    }, 2000)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching repositories</div>
  }

  return (
    <div className={styles.container}>
      <ToastMessage />
      <div className={styles.section}>
        <h1 className={styles.title}>👋🏻 안녕하세요!</h1>
        <h1 className={styles.title}>커밋메이트에 오신 것을 환영합니다.</h1>
        <span>아래에서 작업할 레포지토리를 선택해주세요.</span>
        <div className={styles.reposContainer}>
          <div className={styles.nameGroup}>
            <label className={styles.inputLabel}>조직명</label>
            <div className={styles.name}>{ORGANIZATION}</div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.selectGroup}>
              <label className={styles.inputLabel}>레포지토리</label>
              <select
                className={styles.select}
                value={selectedRepo}
                onChange={(e) => handleChangeRepo(e.target.value)}
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
      </div>
    </div>
  )
}
