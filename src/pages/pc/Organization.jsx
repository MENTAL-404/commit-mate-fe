import styles from '../../styles/Repos.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import { toast } from 'react-toastify'
import ToastMessage from '../../components/ToastMessage'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL } from '../../utils/static'
import useFetchData from '../../hooks/useFetchData'
import LoadingLottie from '../../components/LoadingLottie'

export default function Organization() {
  const navigate = useNavigate()
  const [selectedOrg, setSelectedOrg] = useState(null)

  const { loading, response, error } = useFetchData(API_URL().organization)

  const organizations = useMemo(
    () => (response ? response.data : []),
    [response]
  )

  useEffect(() => {
    if (organizations.length > 0 && !selectedOrg) {
      setSelectedOrg(organizations[0])
    }
  }, [organizations, selectedOrg])

  const handleChangeOrg = (orgId) => {
    const org = organizations.find((o) => o.id === parseInt(orgId))
    setSelectedOrg(org)
  }

  const handleClickSaveOrg = () => {
    localStorage.setItem('selected_org', JSON.stringify(selectedOrg))
    toast.success('선택한 조직이 저장되었습니다.')
    setTimeout(() => {
      navigate('/repos')
    }, 2000)
  }

  if (error) {
    return <div>조직 정보를 가져오는 중 오류가 발생했습니다.</div>
  }

  return (
    <div className={styles.container}>
      <ToastMessage />
      <div className={styles.section}>
        <h1 className={styles.title}>👋🏻 안녕하세요!</h1>
        <h1 className={styles.title}>커밋메이트에 오신 것을 환영합니다.</h1>
        <span>아래에서 작업할 조직을 선택해주세요.</span>
        <div className={styles.reposContainer}>
          <div className={styles.inputGroup}>
            <div className={styles.selectGroup}>
              <label className={styles.inputLabel}>조직</label>
              {loading ? (
                <LoadingLottie width={'30px'} />
              ) : (
                <>
                  <select
                    className={styles.select}
                    value={selectedOrg ? selectedOrg.id : ''}
                    onChange={(e) => handleChangeOrg(e.target.value)}
                  >
                    {organizations.map((org) => (
                      <option value={org.id} key={org.id}>
                        {org.name}
                      </option>
                    ))}
                  </select>
                  <button
                    className={styles.saveButton}
                    onClick={handleClickSaveOrg}
                  >
                    저장
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
