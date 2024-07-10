import React, { useEffect, useState } from 'react'
import styles from '../../../styles/ComemonGo.module.css'
import Comemons from './Comemons'
import Lottie from 'lottie-react'
import loadingIndicator from '../../../images/loading.json'

import {
  getSelectedRepo,
  SERVER_URL,
  ORGANIZATION,
  getHeader,
} from '../../../utils/static'

export default function ComemonGo() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/commits/rank`,
          {
            headers: getHeader(),
            credentials: 'include',
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const result = await response.json()
        setData(result.data) // 데이터 형식에 맞게 수정하세요
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  const truncateNickname = (nickname) => {
    return nickname.length > 8 ? `${nickname.substring(0, 6)}..` : nickname
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <div className={styles.emptyBox}></div>
        <img
          src='/images/comemon/logo.png'
          alt='Logo'
          className={styles.logo}
        />
      </div>
      {loading ? (
        <div className={styles.loadingContainer}>
          <Lottie animationData={loadingIndicator} />
        </div>
      ) : (
        <div className={styles.comemonsContainer}>
          {data.map((item, index) => (
            <Comemons
              key={index}
              name={truncateNickname(item.nickname)}
              level={`Lv. ${item.commit_count}`}
              commitCount={item.commit_count}
            />
          ))}
        </div>
      )}
    </div>
  )
}
