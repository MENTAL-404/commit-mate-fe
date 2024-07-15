import styles from '../styles/SearchCommit.module.css'
import searchIcon from '../assets//images/search.png'
import { useState, useRef, useEffect } from 'react'
import polygon from '../assets//images/polygon.png'
import blackArrowCircle from '../assets//images/blackArrowCircle.png'
import whiteArrowCircle from '../assets//images/whiteArrowCircle.png'
import { API_URL, getHeader } from '../utils/static'
import Loading from '../components/LoadingLottie'
import { Link } from 'react-router-dom'
import { convertApiUrlToWebUrl } from '../utils/changeCommitUrl'

export default function SearchCommit() {
  const [isClick, setIsClick] = useState(false)
  const [searchList, setSearchList] = useState([])
  const resultContainerRef = useRef(null)
  const [word, setWord] = useState('')
  const [loading, setLoading] = useState(false)

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

  const handleClickSearch = async () => {
    if (!word.trim()) return
    setIsClick(true)
    try {
      setLoading(true)
      const response = await fetch(`${API_URL().commit_search}=${word}`, {
        headers: getHeader(),
        credentials: 'include',
      })

      if (response.ok) {
        const result = await response.json()
        setSearchList(result.data)
      }
    } catch (error) {
      console.error('Error fetching search results:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsClick(true)
      handleClickSearch()
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.search}>
        <input
          type='text'
          className={styles.searchInput}
          maxLength={100}
          placeholder='커밋 메세지 검색'
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div onClick={handleClickSearch} className={styles.searchButton}>
          <img
            src={searchIcon}
            className={styles.searchIcon}
            alt='Search Icon'
          />
        </div>
      </div>
      {isClick && (
        <div className={styles.resultContainer} ref={resultContainerRef}>
          <img src={polygon} className={styles.polygon} alt='' />
          <div className={styles.searchResults}>
            {loading ? (
              <div className={styles.loadingContainer}>
                <Loading />
              </div>
            ) : (
              <div className={styles.innerContainer}>
                {searchList.length > 0 ? (
                  searchList.map((search, index) => (
                    <SearchResult key={index} data={search} />
                  ))
                ) : (
                  <div>검색 결과가 없습니다.</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function SearchResult({ data }) {
  const [isHover, setIsHover] = useState(false)

  return (
    <>
      <Link
        to={convertApiUrlToWebUrl(data.url)}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        className={styles.result}
      >
        <div className={styles.profile}>
          <img
            src={data.profile_image}
            className={styles.profileImage}
            alt='Profile'
          />
        </div>
        <div className={styles.commit}>
          <div className={styles.message}>
            {data.message.slice(0, 40) + '...'}
          </div>
          <div className={styles.commiter}>
            <div className={styles.name}>{data.nickname}</div>
            <div className={styles.date}>{data.date}</div>
          </div>
        </div>
        <img
          src={isHover ? whiteArrowCircle : blackArrowCircle}
          className={styles.arrowIcon}
          alt=''
        />
      </Link>
      <hr className={styles.line} />
    </>
  )
}
