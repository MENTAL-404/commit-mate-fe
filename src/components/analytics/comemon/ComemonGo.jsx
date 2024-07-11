import React from 'react'
import styles from '../../../styles/ComemonGo.module.css'
import Comemons from './Comemons'
import Lottie from 'lottie-react'
import loadingIndicator from '../../../images/loading.json'
import { API_URL } from '../../../utils/static'
import useFetchData from '../../../hooks/useFetchData'

export default function ComemonGo() {
  const { loading, response, error } = useFetchData(API_URL().commit_rank)
  const data = response ? response.data : []

  const truncateNickname = (nickname) => {
    return nickname.length > 8 ? `${nickname.substring(0, 6)}..` : nickname
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Lottie animationData={loadingIndicator} />
      </div>
    )
  }

  if (error) {
    return <div>Error fetching data</div>
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
    </div>
  )
}
