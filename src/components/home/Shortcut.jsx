import styles from '../../styles/Shortcut.module.css'
import bookmark from '../../assets/images/bookmak.png'
import { API_URL } from '../../utils/static'
import useFetchData from '../../hooks/useFetchData'
import LoadingLottie from '../LoadingLottie'

export default function Shortcut() {
  const { loading, response, error } = useFetchData(API_URL().shortcut)
  const data = response ? response.data : []

  if (error) {
    return <div>Error fetching shortcuts</div>
  }

  return (
    <div className={styles.container}>
      {loading ? (
        <LoadingLottie width={'30px'} />
      ) : (
        <div className={styles.linkList}>
          {data.length > 0 ? (
            data.map((shortcut) => (
              <a
                target='_blank'
                key={shortcut.id}
                className={styles.link}
                href={shortcut.url}
                rel='noreferrer'
              >
                <img
                  src={bookmark}
                  alt='bookmark'
                  className={styles.linkLogo}
                />
                {shortcut.title}
              </a>
            ))
          ) : (
            <div className={`${styles.link} ${styles.noLink}`}>
              추가된 바로가기가 없습니다
            </div>
          )}
          {data.length < 2 &&
            Array.from({ length: 2 - data.length }).map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className={`${styles.link} ${styles.noShortcut}`}
              >
                추가된 바로가기가 없습니다
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
