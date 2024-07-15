import React from 'react'
import styles from '../styles/RightSideTopContainer.module.css'
import drop from '../assets//images/drop.png'
import Loading from '../components/LoadingLottie'
import qr from '../assets//images/qr.png'
import useFetchData from '../hooks/useFetchData'
import { getSelectedRepo, API_URL } from '../utils/static'

export default function RightSideTopContainer({ customStyle }) {
  const selectedRepo = getSelectedRepo()
  const { loading, response } = useFetchData(API_URL().organization)

  return (
    <div
      className={`${styles.topContainer} ${customStyle ? styles[customStyle] : ''}`}
    >
      <div className={styles.qrContainer}>
        <img src={qr} alt='qr' className={styles.qr} />
      </div>
      <div className={styles.profileContainer}>
        <div className={styles.innerContainer}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <Loading />
            </div>
          ) : (
            <img
              src={response?.data?.avatar_url}
              alt='profile'
              className={styles.profileImage}
            />
          )}
          <div className={styles.organizationName}>{selectedRepo}</div>
        </div>
        <img src={drop} alt='drop' className={styles.dropImage} />
      </div>
    </div>
  )
}
