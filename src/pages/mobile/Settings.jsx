import styles from '../../styles/mobile/Settings.module.css'
import MobileLayout from '../../components/mobile/MobileLayout'
import folder from '../../assets/images/mobile/folder.png'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import LoadingLottie from '../../components/LoadingLottie'
import useFetchData from '../../hooks/useFetchData'
import { SERVER_URL, ORGANIZATION, getSelectedRepo } from '../../utils/static'
import ToastMessage from '../../components/ToastMessage'

export default function SettingsMobile() {
  const [selectedRepo, setSelectedRepo] = useState('')

  const {
    loading: loadingRepos,
    response: reposResponse,
    error: reposError,
  } = useFetchData(`${SERVER_URL}/organizations/${ORGANIZATION}/repositories`)

  const repositories = reposResponse ? reposResponse.data.repos : []

  useEffect(() => {
    setSelectedRepo(getSelectedRepo())
  }, [reposResponse])

  const handleChangeRepo = (event) => {
    const newValue = event.target.value
    setSelectedRepo(newValue)
  }

  const handleClickSaveRepo = () => {
    localStorage.setItem('selected_repo', selectedRepo)
    toast.success('선택한 레포지토리가 저장되었습니다.')
  }

  if (reposError) {
    return <div>Error fetching data</div>
  }

  return (
    <MobileLayout>
      <ToastMessage />
      <div className={styles.mobileContainer}>
        <div className={styles.title}>
          <img src={folder} className={styles.icon} alt='Folder icon' />
          레포지토리 설정
        </div>
        <div className={styles.repoContainer}>
          <div className={styles.subSection}>
            <div className={styles.subBottomSection}>
              <label className={styles.repoLabel}>
                화면에 표시될 레포지토리를 선택해주세요.
              </label>
              <div className={styles.inputGroup}>
                {loadingRepos ? (
                  <LoadingLottie width={'30px'} />
                ) : (
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
                )}
              </div>
            </div>
          </div>
          <button className={styles.saveButton} onClick={handleClickSaveRepo}>
            저장
          </button>
        </div>
      </div>
    </MobileLayout>
  )
}
