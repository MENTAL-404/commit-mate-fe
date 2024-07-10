import React, { useEffect, useState } from 'react'
import styles from '../styles/RightSideTopContainer.module.css'
import noti from '../images/noti.png'
import drop from '../images/drop.png'
import Lottie from 'lottie-react'
import loadingIndicator from '../images/loading 5.json'

import { getSelectedRepo, SERVER_URL, getHeader } from '../utils/static'

export default function RightSideTopContainer({ customStyle }) {
  const [avatar, setAvatar] = useState()
  const selectedRepo = getSelectedRepo()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const avatar_url = localStorage.getItem('avatar_url')
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/organizations`, {
          credentials: 'include',
          headers: getHeader(),
        })
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = await response.json()
        setAvatar(result.data?.avatar_url)
        localStorage.setItem('avatar_url', result.data?.avatar_url)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setLoading(false)
    }
    if (!avatar_url) {
      setLoading(true)
      fetchData()
    } else {
      setAvatar(avatar_url)
    }
  }, [])

  return (
    <>
      <div
        className={`${styles.topContainer} ${customStyle ? styles[customStyle] : ''}`}
      >
        <div className={styles.notiContainer}>
          <img src={noti} alt='notification' className={styles.notiIcon} />
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.innerContainer}>
            {loading ? (
              <div className={styles.loadingContainer}>
                <Lottie animationData={loadingIndicator} />
              </div>
            ) : (
              <>
                <img
                  src={avatar}
                  alt='profile'
                  className={styles.profileImage}
                />
              </>
            )}
            <div className={styles.organizationName}>{selectedRepo}</div>
          </div>
          <img src={drop} alt='drop' className={styles.dropImage} />
        </div>
      </div>
    </>
  )
}
