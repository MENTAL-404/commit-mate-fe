import styles from '../../styles/Shortcut.module.css'
import bookmark from '../../images/bookmak.png'

import {
  SERVER_URL,
  ORGANIZATION,
  AUTH_HEADER,
} from '../../utils/static'
import { useEffect, useState } from 'react'

export default function Shortcut() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchShortcuts = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/shortcuts/organization/${ORGANIZATION}`,
          {
            headers: AUTH_HEADER,
          }
        )
        if (!response.ok) {
          throw new Error('Failed to fetch access token')
        }

        const result = await response.json()
        setData(result.data)
        console.log('북마크', data)
      } catch (error) {
        console.error('Error fetching active data:', error)
      }
    }

    fetchShortcuts()
  }, [data])

  return (
    <div className={styles.container}>
      <div className={styles.linkList}>
        <div className={styles.link}>
          <img src={bookmark} alt='bookmark' className={styles.linkLogo} />
          Github Repository
        </div>
        <div className={`${styles.link} ${styles.noLink}`}>
          추가된 바로가기가 없습니다
        </div>
      </div>
    </div>
  )
}
