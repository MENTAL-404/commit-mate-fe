import styles from '../../styles/Shortcut.module.css'
import bookmark from '../../images/bookmak.png'

import { SERVER_URL, ORGANIZATION, getHeader } from '../../utils/static'
import { useEffect, useState } from 'react'

export default function Shortcut() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchShortcuts = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/shortcuts/organization/${ORGANIZATION}`,
          {
            headers: getHeader(),
            credentials: 'include',
          }
        )
        if (!response.ok) {
          throw new Error('Failed to fetch shortcuts')
        }

        const result = await response.json()
        setData(result.data)
        // console.log('북마크', result.data)
      } catch (error) {
        console.error('Error fetching shortcuts:', error)
      }
    }

    fetchShortcuts()
  }, [])

  const handleLinkClick = (url) => {
    window.open(url, '_blank'); // URL을 새 창에서 열기
  }

  return (
    <div className={styles.container}>
      <div className={styles.linkList}>
        {data.length > 0 ? (
          data.map((shortcut) => (
            <div
              key={shortcut.id}
              className={styles.link}
              onClick={() => handleLinkClick(shortcut.url)}
              style={{cursor: 'pointer'}}
            >
              <img src={bookmark} alt='bookmark' className={styles.linkLogo} />
              {shortcut.title}
            </div>
          ))
        ) : (
          <div className={`${styles.link} ${styles.noLink}`}>
            추가된 바로가기가 없습니다
          </div>
        )}
        {data.length < 2 &&
          Array.from({ length: 2 - data.length }).map((_, index) => (
            <div key={`placeholder-${index}`} className={`${styles.link} ${styles.noShortcut}`}>
              추가된 바로가기가 없습니다
            </div>
          ))
        }
      </div>
    </div>
  )
}