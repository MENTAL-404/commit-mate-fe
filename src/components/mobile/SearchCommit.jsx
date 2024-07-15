import styles from '../../styles/mobile/SearchCommit.module.css'
import close from '../../assets/images/mobile/close.png'
import search from '../../assets/images/mobile/search.png'
import { useState } from 'react'
import { API_URL, getHeader } from '../../utils/static'
import LoadingLottie from '../LoadingLottie'
import blackArrowCircle from '../../assets/images/blackArrowCircle.png'
import whiteArrowCircle from '../../assets/images/whiteArrowCircle.png'
import { Link } from 'react-router-dom'

export default function SearchCommit({ onClose }) {
  const [searchList, setSearchList] = useState([])
  const [word, setWord] = useState('')
  const [loading, setLoading] = useState()

  const handleClickSearch = async () => {
    if (!word.trim()) return
    try {
      setLoading(true)
      const response = await fetch(`${API_URL().commit_search}=${word}`, {
        headers: getHeader(),
        credentials: 'include',
      })

      if (response.ok) {
        const result = await response.json()
        setSearchList(result.data)
        console.log(response.data)
      }
    } catch (error) {
      console.error('Error fetching search results:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClickSearch()
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.topContainer}>
        <div className={styles.search}>
          <img src={search} className={styles.icon} />
          <input
            type='text'
            className={styles.searchInput}
            maxLength={100}
            placeholder='커밋 메세지 검색'
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <img onClick={onClose} src={close} className={styles.close} />
      </div>
      {loading === undefined ? (
        <div className={styles.noResult}>검색어를 입력해주세요.</div>
      ) : loading === true ? (
        <div className={styles.lottieContainer}>
          <LoadingLottie width={'50px'} />
        </div>
      ) : searchList.length > 0 ? (
        <div className={styles.bottomContainer}>
          {searchList.map((search, index) => (
            <SearchResult key={index} data={search} />
          ))}
        </div>
      ) : (
        <div className={styles.noResult}>검색 결과가 없습니다.</div>
      )}
    </div>
  )
}

function SearchResult({ data }) {
  const [isHover, setIsHover] = useState(false)

  return (
    <>
      <Link
        to={data.url}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        onTouchStart={() => setIsHover(true)}
        onTouchEnd={() => setIsHover(false)}
        className={styles.result}
      >
        <div className={styles.profile}>
          <img
            src={data.profile_image}
            className={styles.profileImage}
            alt='Profile'
          />
          <div className={styles.commit}>
            <div className={styles.message}>
              {data.message.slice(0, 40) + '...'}
            </div>
            <div className={styles.commiter}>
              <div className={styles.name}>{data.nickname}</div>
              <div className={styles.date}>{data.date}</div>
            </div>
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
