import styles from '../styles/SearchCommit.module.css'
import searchIcon from '../images/search.png'
import { useState, useRef, useEffect } from 'react'
import polygon from '../images/polygon.png'
import hong from '../images/hong.png'
import blackArrowCircle from '../images/blackArrowCircle.png'
import whiteArrowCircle from '../images/whiteArrowCircle.png'

export default function SearchCommit() {
  const [isClick, setIsClick] = useState(false)
  const resultContainerRef = useRef(null)

  const handleClickOutside = (event) => {
    if (
      resultContainerRef.current &&
      !resultContainerRef.current.contains(event.target)
    ) {
      setIsClick(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.main}>
      <div className={styles.search}>
        <input
          type='text'
          className={styles.searchInput}
          maxLength={100}
          placeholder='커밋 메세지 검색'
        />
        <div
          onClick={() => setIsClick(!isClick)}
          className={styles.searchButton}
        >
          <img src={searchIcon} className={styles.searchIcon} />
        </div>
      </div>
      {isClick ? (
        <div className={styles.resultContainer} ref={resultContainerRef}>
          <img src={polygon} className={styles.polygon} />
          <div className={styles.searchResults}>
            <div className={styles.innerContainer}>
              <SearchResult />
              <SearchResult />
              <SearchResult />
              <SearchResult />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function SearchResult() {
  const [isHover, setIsHover] = useState(false)

  return (
    <>
      <div
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        className={styles.result}
      >
        <div className={styles.profile}>
          <img src={hong} className={styles.profileImage} />
        </div>
        <div className={styles.commit}>
          <div className={styles.message}>fix: typo in README.md</div>
          <div className={styles.commiter}>
            <div className={styles.name}>태양 홍</div>
            <div className={styles.date}>Yesterday</div>
          </div>
        </div>
        <img
          src={isHover ? whiteArrowCircle : blackArrowCircle}
          className={styles.arrowIcon}
        />
      </div>
      <div className={styles.line} />
    </>
  )
}
